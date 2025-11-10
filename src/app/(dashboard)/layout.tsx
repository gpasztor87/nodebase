import { getQueryClient, HydrateClient, trpc } from "@/trpc/server";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { requireAuth } from "@/features/auth/lib/utils";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  await requireAuth();

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.getCurrentUser.queryOptions());

  return (
    <SidebarProvider>
      <HydrateClient>
        <AppSidebar />
      </HydrateClient>
      <SidebarInset className="bg-accent/20">{children}</SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
