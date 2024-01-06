import { redirect } from "next/navigation";

import db from "@/lib/db";
import { auth } from "@/auth/auth";
import Container from "@/components/ui/container";
import HeadNav from "@/components/assets/headnav/headnav";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { adminId: string };
}) {
  const session = await auth();

  if (!session) {
    redirect("/auth/sign-in");
  }

  const adminRole = await db.user.findFirst({
    where: {
      id: params.adminId,
      // userId,
    },
  });

  if (!adminRole) {
    redirect("/");
  }

  return (
    <>
      <HeadNav />
      {/* <Aside /> */}
      <Container el={"main"} className="w-full flex items-center justify-center [&_form]:[transition:all_0.5s_ease]">
        {children}
      </Container>
      {/* <Footer initialData={store} /> */}
    </>
  );
}
