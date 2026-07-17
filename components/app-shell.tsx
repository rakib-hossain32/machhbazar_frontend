import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import type { AppUser } from "@/components/nav-user";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { sidebar } from "@/lib/constant/dashboard";
import { cn } from "@/lib/utils";

type AppShellProps = {
  children: React.ReactNode;
  role: keyof typeof sidebar;
  user: AppUser;
};

export function AppShell({ children, role, user }: AppShellProps) {
  return (
    <SidebarProvider>
      <AppSidebar role={role} user={user} />
      <SidebarInset>
        <AppHeader role={role} />
        <div
          className={cn(
            "flex w-full min-w-0 flex-1 flex-col p-4 md:p-5 xl:p-6",
          )}
        >
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
