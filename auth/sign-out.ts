"use server";

import { signOut as sOut } from "@/auth/auth";

export const signOut = async () => {
  await sOut();
};
