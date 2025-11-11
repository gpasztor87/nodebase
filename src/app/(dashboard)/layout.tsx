import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { requireAuth } from "@/features/auth/lib/utils";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  await requireAuth();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-accent/20">
        <AppHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
