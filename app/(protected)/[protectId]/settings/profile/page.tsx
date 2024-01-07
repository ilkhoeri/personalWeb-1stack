import { auth } from "@/auth/auth";
import { Metadata } from "next";
import SettingsUserForm from "@/components/auth/settings-user-form";
import db from "@/lib/db";

type PageProps = {
  params: { profileId: string };
};

export async function generateMetadata(): Promise<Metadata> {
  const user = await auth();

  return {
    title: user?.user.name ? user?.user.name.slice(0, 45) : "NotFound!",
    openGraph: {
      title: user?.user.name || "NotFound!",
      description: user?.user.name || "NotFound!",
      url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}`,
      images: [
        {
          url: (user?.user.image as string) || "",
          width: 800,
          height: 800,
        },
      ],
      locale: "id-ID",
      type: "website",
    },
  };
}

export default async function ProfilePage() {
  const user = await auth();

  const userId = await db.user.findFirst({
    where: {
      // id: userId?.user?.id
    },
  });

  return <SettingsUserForm user={user} />;
}
