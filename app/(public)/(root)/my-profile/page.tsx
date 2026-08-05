import { CustomerAccountPage } from "@/components/account/customer-account-page";
import { getCustomerOrderSummary } from "@/features/account/services/customer-order.service";
import type { CustomerOrderSummary } from "@/features/account/types/customer-order";
import { getSession } from "@/features/auth/services/auth.service";
import type { IUserResponse } from "@/features/auth/types/auth.type";
import { redirect } from "next/navigation";

const roleDashboardRoutes: Record<string, string> = {
  ADMIN: "/dashboard/admin",
  SELLER: "/dashboard/seller",
};

const customerRoles = new Set(["CUSTOMER"]);

export default async function PublicMyProfilePage() {
  const user = await getSession();

  if (!user) {
    redirect("/login?redirect=%2Fmy-profile");
  }

  if (!customerRoles.has(user.role)) {
    redirect(roleDashboardRoutes[user.role] ?? "/dashboard");
  }

  let ordersAvailable = true;
  let orderSummary: CustomerOrderSummary = { orders: [], total: 0 };

  try {
    orderSummary = await getCustomerOrderSummary();
  } catch {
    ordersAvailable = false;
  }

  return (
    <CustomerAccountPage
      user={user as IUserResponse}
      orderSummary={orderSummary}
      ordersAvailable={ordersAvailable}
    />
  );
}
