import MyProfile from "@/features/auth/components/my-profile";
import { getSession } from "@/features/auth/services/auth.service";
import { redirect } from "next/navigation";

export default async function MyProfilePage() {
  const user = await getSession();

  if (user?.role === "USER") {
    redirect("/my-profile");
  }

  return <MyProfile />;
}
