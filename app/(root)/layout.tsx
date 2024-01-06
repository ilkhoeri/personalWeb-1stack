import { redirect, notFound } from "next/navigation";
import db from "@/lib/db";
import { auth } from "@/auth/auth";
import { currentUser } from "@/lib/current";

export default async function SetupLayout({ children }: { children: React.ReactNode }) {
  // const session = await auth();
  const session = await currentUser();

  if (!session) {
    redirect("/auth/sign-in");
  }

  const user = await db.user.findFirst({
    where: {
      id: session.id,
    },
  });

  if (user) {
    redirect(`/${user.id}`);
  }

  if (session.role === "USER") {
    notFound();
  }

  return <>{children}</>;
}
