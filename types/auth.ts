// import { $Enums, User } from "@prisma/client";
import { UserRole } from "@prisma/client";

export type ElaboratedUser = {
  role: UserRole;
  isOAuth: boolean;
  isTwoFactorEnabled: boolean;
};
