import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth/auth";
import Container from "@/components/ui/container";
import HeadNav from "@/components/assets/headnav/headnav";
import { currentRole } from "@/lib/current";
import { UserRole } from "@prisma/client";
import Header from "@/components/ui/header";
import { SidebarNavClient } from "@/components/assets/sidenav/sidebar-nav-client";

export default async function ProtectedLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { protectId: string };
}) {
  const session = await auth();
  const role = await currentRole();

  if (!session) {
    redirect("/auth/sign-in");
  }

  if (role === UserRole.USER) {
    notFound();
  }

  return (
    <>
      <HeadNav />
      <Container
        el={"main"}
        className="w-full flex flex-nowrap flex-col justify-center space-y-6 p-4 md:p-8 md:pt-6 pb-16 [&_form]:[transition:all_0.5s_ease]"
      >
        <Header title="Settings" description="Manage your account settings and set info public preferences." />
        <hr />

        <div className="w-full flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <SidebarNavClient />
          <div className="flex-1 lg:max-w-3xl">{children}</div>
        </div>
      </Container>
    </>
  );
}
