import { auth } from "@/auth/auth";
import SettingsUserForm from "@/components/auth/settings-user-form";
import db from "@/lib/db";

export const metadata = {
  title: "Settings",
  description: "Advanced Settings your public profile.",
};

export default async function SettingsPage() {
  const user = await auth();

  const userId = await db.user.findFirst({
    where:{
      // id: userId?.user?.id
    }
  })

  return (
    <div className="w-full flex items-center flex-col">
      <SettingsUserForm user={user} />
      {/* {user ? Object.values(user) : null} */}
    </div>
  );
}
