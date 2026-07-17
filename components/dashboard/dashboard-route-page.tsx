type DashboardRoutePageProps = {
  title: string;
};

export function DashboardRoutePage({ title }: DashboardRoutePageProps) {
  return <h1 className="text-2xl font-semibold">{title}</h1>;
}
