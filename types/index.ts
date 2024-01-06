// import { $Enums, User } from "@prisma/client";
import { UserRole } from "@prisma/client";

export type ElaboratedUser = {
  role: UserRole;
  isOAuth: boolean;
  isTwoFactorEnabled: boolean;
};



import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & ElaboratedUserNew;


 export interface Session {
    user: ExtendedUser;
  }

export type ElaboratedUserNew = {
  role: UserRole;
  name?: string | undefined;
  image?: string | undefined;
  email?: string | undefined;
  isTwoFactorEnabled?: boolean | undefined;
  isOAuth: boolean;
  password?: string | undefined;
  newPassword?: string | undefined;
};

/*
Type 'User & ElaboratedUser' is not assignable to type ''.
      Types of property 'name' are incompatible.
        Type 'string | null | undefined' is not assignable to type 'string | undefined'.
          Type 'null' is not assignable to type 'string | undefined'.ts(2322)
*/
