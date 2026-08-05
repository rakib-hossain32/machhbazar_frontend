export type UserRole =
  | "ADMIN"
  | "CUSTOMER"
  | "SELLER";

export type RouteOwner =
  | "ADMIN"
  | "CUSTOMER"
  | "SELLER"
  | "COMMON"
  | "DISABLED";

export type NormalizedUserRole = UserRole;

export const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
];

export const isAuthRoute = (pathname: string) =>
  authRoutes.includes(pathname);

const dashboardOwners: Array<{ owner: RouteOwner; pattern: RegExp }> = [
  { owner: "ADMIN", pattern: /^\/dashboard\/admin(?:\/.*)?$/ },
  { owner: "SELLER", pattern: /^\/dashboard\/seller(?:\/.*)?$/ },
  { owner: "COMMON", pattern: /^\/dashboard(?:\/my-profile)?\/?$/ },
  { owner: "DISABLED", pattern: /^\/dashboard(?:\/.*)?$/ },
];

export const normalizeUserRole = (role?: string | null): NormalizedUserRole => {
  if (
    role === "ADMIN" ||
    role === "CUSTOMER" ||
    role === "SELLER"
  ) {
    return role;
  }

  return "CUSTOMER";
};

export const getRouteOwner = (pathname: string): RouteOwner | null =>
  dashboardOwners.find(({ pattern }) => pattern.test(pathname))?.owner ?? null;

export const getDefaultDashboardRoute = (role: UserRole | string) => {
  const normalizedRole = normalizeUserRole(role);

  const routes: Record<NormalizedUserRole, string> = {
    ADMIN: "/dashboard/admin",
    CUSTOMER: "/my-profile",
    SELLER: "/dashboard/seller",
  };

  return routes[normalizedRole];
};

export const isValidRedirectForRole = (
  redirectPath: string,
  role: UserRole,
) => {
  const routeOwner = getRouteOwner(redirectPath);

  if (routeOwner === null || routeOwner === "COMMON") return true;
  if (routeOwner === "DISABLED") return false;

  return routeOwner === normalizeUserRole(role);
};
