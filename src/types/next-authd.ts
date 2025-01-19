import NextAuth, { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    username?: string;
  }

  interface Session {
    user: User & {
      username: string;
    };
    token: {
      username: string;
    };
  }
}
