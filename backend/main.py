from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.security import OAuth2PasswordBearer
import requests
from requests.exceptions import RequestException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow requests from localhost:3000 (frontend) - CORS
origins = [
    "http://localhost",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


# Verify the token with GitHub API
# Each provider should have its own function
# CAUTION! Providers API may have different rate limits (GH is 5000 req/hour per user)
# You should cache the user data to avoid hitting the rate limit or checking the token expiration
def verify_github_token(token: str):
    response = requests.get(
        "https://api.github.com/user", headers={"Authorization": f"Bearer {token}"}
    )
    response.raise_for_status()
    print(response.json())  # User data returned by GH API
    print(response.headers)  # Rate limit and stuff returned by GH API
    return response.json()


def get_current_user(request: Request, token: str = Depends(oauth2_scheme)):
    provider = request.headers.get("X-Provider")
    if not provider:
        raise HTTPException(status_code=400, detail="Provider not specified")

    try:
        # When using multiple providers, add more functions like this
        # Instead of returning the raw user JSON, we should use a User model
        # and query our database with the ID to return a common object for all providers
        if provider == "github":
            user = verify_github_token(token)
        else:
            raise HTTPException(status_code=400, detail="Invalid provider")
    except RequestException:
        raise HTTPException(status_code=401, detail="Invalid token")

    return user


@app.get("/api/user")
async def read_user(current_user: dict = Depends(get_current_user)):
    print(current_user)  # Current authenticated user
    return current_user


@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(status_code=exc.status_code, content={"detail": exc.detail})
