import MyProfile from "@/features/auth/components/my-profile";
import { getSession } from "@/features/auth/services/auth.service";
import { redirect } from "next/navigation";

const roleDashboardRoutes: Record<string, string> = {
  ADMIN: "/dashboard/admin",
  CUSTOMER: "/dashboard/account",
  INSPECTOR: "/dashboard/inspector",
  RIDER: "/dashboard/rider",
  SELLER: "/dashboard/seller",
};

export default async function PublicMyProfilePage() {
  const user = await getSession();

  if (!user) {
    redirect("/login?redirect=%2Fmy-profile");
  }

  if (user.role !== "USER") {
    redirect(roleDashboardRoutes[user.role] ?? "/dashboard");
  }

  return (
    <section className="mx-auto w-full max-w-7xl">
      <MyProfile />
    </section>
  );
}
