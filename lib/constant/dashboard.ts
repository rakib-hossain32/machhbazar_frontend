import type {
  DashboardSidebarMenuGroup,
  IconMapKey,
} from "@/components/dashboard/dashboard-sidebar";

const item = (
  title: string,
  url: string,
  icon: IconMapKey,
  exact = false,
) => ({ title, url, icon, exact });

export const SELLER: DashboardSidebarMenuGroup[] = [
  {
    label: "Seller",
    items: [
      item("Overview", "/dashboard/seller", "LayoutDashboard", true),
      item("Onboarding", "/dashboard/seller/onboarding", "UserCheck"),
      item("Products", "/dashboard/seller/products", "Fish"),
      item("Lots", "/dashboard/seller/lots", "Boxes"),
      item("Inventory", "/dashboard/seller/inventory", "Warehouse"),
    ],
  },
  {
    label: "Operations",
    items: [
      item("Orders", "/dashboard/seller/orders", "ShoppingCart"),
      item("Disputes", "/dashboard/seller/disputes", "MessageSquareWarning"),
    ],
  },
  {
    label: "Finance",
    items: [
      item("Analytics", "/dashboard/seller/analytics", "BarChart3"),
      item("Payouts", "/dashboard/seller/payouts", "Wallet"),
      item("Settings", "/dashboard/seller/settings", "Settings"),
    ],
  },
];

export const ADMIN: DashboardSidebarMenuGroup[] = [
  {
    label: "Overview",
    items: [
      item("Dashboard", "/dashboard/admin", "LayoutDashboard", true),
      item(
        "Seller Applications",
        "/dashboard/admin/seller-applications",
        "UserCheck",
      ),
    ],
  },
  {
    label: "Marketplace",
    items: [
      item("Sellers", "/dashboard/admin/sellers", "Store"),
      item("Users", "/dashboard/admin/users", "Users"),
      item("Products", "/dashboard/admin/products", "Fish"),
      item("Lots", "/dashboard/admin/lots", "Boxes"),
      item("Orders", "/dashboard/admin/orders", "ShoppingCart"),
    ],
  },
  {
    label: "Operations",
    items: [
      item("Disputes", "/dashboard/admin/disputes", "MessageSquareWarning"),
      item("Refunds", "/dashboard/admin/refunds", "RotateCcw"),
      item("Payouts", "/dashboard/admin/payouts", "Wallet"),
      item("Catalog", "/dashboard/admin/catalog", "Tag"),
      item("Delivery", "/dashboard/admin/delivery", "Truck"),
      item("Promotions", "/dashboard/admin/promotions", "Megaphone"),
    ],
  },
  {
    label: "Governance",
    items: [
      item("Configuration", "/dashboard/admin/configuration", "SlidersHorizontal"),
      item("Audit Logs", "/dashboard/admin/audit-logs", "ScrollText"),
      item("Reports", "/dashboard/admin/reports", "FileClock"),
    ],
  },
];

export const sidebar = {
  ADMIN,
  SELLER,
};

export type DashboardRole = keyof typeof sidebar;
