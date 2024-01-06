// import { $Enums, User } from "@prisma/client";
import { UserRole } from "@prisma/client";

export type ElaboratedUser = {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
};
