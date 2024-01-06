import NextAuth, { type DefaultSession } from "next-auth";
import type { ElaboratedUser } from "./index";

export type ExtendedUser = DefaultSession["user"] & ElaboratedUser;

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
