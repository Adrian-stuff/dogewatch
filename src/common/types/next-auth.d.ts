import NextAuth from "next-auth";
import { User, Session } from "next-auth/core/types";
import { JWT } from "next-auth/jwt";
declare module "next-auth/jwt" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    accessTokenExpires: number;
    accessToken: string;
    refreshToken: string;

    error: string;
    user?: User;
  }
}

declare module "next-auth" {
  interface Session {
    accessToken: string;
    refreshToken: string;
    error: string;
  }

  interface Account {
    expires_in: number;
  }
}
