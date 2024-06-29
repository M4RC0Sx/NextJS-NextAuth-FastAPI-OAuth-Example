# NextJS-NextAuth-FastAPI-OAuth-Example

This is an example project that shows how to connect a frontend made with NextJS14 (app router) with a backend in FastAPI, using an OAuth authentication with GitHub as provider.


## Tech stack:
- Python 3.12.4 with FastAPI for the backend. 
- Poetry as Python dependency manager.
- Ruff as Python formatter.
- NodeJS 20.15.0 for the frontend.
- NPM as Node dependency manager.
- ESLint + Prettier (eslint-config-prettier) for linting and code formatting.
- NextAuth (AuthJS) for auth management in the frontend.

## DISCLAIMER
- There is no information persistence of any kind.
- This project is not production-ready.
- The frontend is the ugliest thing you're going to see today. I haven't styled any component.
- This project is only a proof of concept, so it does not meet all the standards of good development practices.
- A monorepo structure has been used to speed up the access to the files and to have everything in the same place. In a real project, having backend and frontend in the same repository is not usually the most convenient...

## TO-DO list
- Implement user persistence in the API.
- Add more providers.
- Consider a possible caching or token checking in the backend to avoid the rate-limit of the providers in case of too many requests. Could do a custom implementation of Python's LRU cache, adding timeout: (https://docs.python.org/3/library/functools.html#functools.lru_cache)
- Structure the FastAPI project correctly.

## How does it work?
1. On the frontend, NextAuth controls the authentication flow with providers. In this case, GitHub.
2. Once authenticated, it generates a session and includes in this session the provider used and the access token returned by the API of this provider.
3. When a request is sent to the backend from the frontend, this provider and its API access token are included in the header.
4. In the backend, a request is made to the API of the corresponding provider to check that the token is valid.

## How to run the project?
1. Clone the repository.
```bash
git clone https://github.com/M4RC0Sx/NextJS-NextAuth-FastAPI-OAuth-Example.git
```

2. Install the Python dependencies with Poetry. It is recommended to have PyEnv installed for managing multiple Python versions.
```bash
cd backend
pyenv local 3.12.4
poetry install
```

3. Start the backend, it will be available at http://localhost:8000.
```bash
poetry run uvicorn main:app --reload
```

4. Access the frontend directory and install the Node dependencies. It is recommended to use NVM for managing multiple versions of Node.
```bash
cd ..
cd frontend
nvm install --lts
nvm use --lts
npm install
```

5. Create an OAuth application in the GitHub Developer Settings portal (when creating the app on the GitHub portal, use this URL as the authorization callback URL: http://localhost:3000/api/auth/callback/github) and populate an .env.local file with these fields:
```
AUTH_SECRET=RANDOM_SECRET_USED_BY_NEXTAUTH
AUTH_GITHUB_ID=YOUR_GITHUB_OAUTH_APP_ID
AUTH_GITHUB_SECRET=YOUR_GITHUB_OAUTH_APP_SECRET

```

6. Start the frontend. It will be available at https://localhost:3000.
```bash
cd ..
cd frontend
nvm install --lts
nvm use --lts
npm install
```

7. Access the frontend (http://localhost:3000) and click the button to log in with GitHub. Once logged in, a button will appear to launch a sample API request.