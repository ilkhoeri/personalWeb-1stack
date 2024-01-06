// import { $Enums, User } from "@prisma/client";
import { UserRole } from "@prisma/client";

export type ElaboratedUser = {
  role: UserRole;
  isOAuth: boolean;
  isTwoFactorEnabled: boolean;
};

export type ExtendedCldUploadWidget = {
  maxFiles?: number;
  maxFileSize?: number;
  sources?:
    | (
        | "camera"
        | "dropbox"
        | "facebook"
        | "gettyimages"
        | "google_drive"
        | "image_search"
        | "instagram"
        | "istock"
        | "local"
        | "shutterstock"
        | "unsplash"
        | "url"
      )[]
    | undefined;
};
