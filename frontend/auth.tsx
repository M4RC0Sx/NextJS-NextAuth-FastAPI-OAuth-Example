import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth";

import GitHub from "next-auth/providers/github";

/**
 * Extend the NextAuth session with the accessToken and provider
 * to avoid typescript errors
 */
declare module "next-auth" {
    interface Session {
        accessToken: string | undefined;
        provider: string | undefined;
    }
}

/**
 * Extend the NextAuth JWT with the accessToken and provider
 * to avoid typescript errors
 */
declare module "next-auth/jwt" {
    interface JWT {
        accessToken: string | undefined;
        provider: string | undefined;
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    // Configure one or more authentication providers
    providers: [GitHub],

    // Callbacks to extend the session and JWT with the accessToken and provider
    // The accessToken is returned by the provider and is used in the backend to
    // authenticate the user
    callbacks: {
        async jwt({ token, account, profile }) {
            if (account) {
                token.accessToken = account.access_token;
                token.provider = account.provider;
            }
            return token;
        },
        async session({ session, token }) {
            token;
            session.accessToken = token.accessToken;
            session.provider = token.provider;
            return session;
        },
    },
});
