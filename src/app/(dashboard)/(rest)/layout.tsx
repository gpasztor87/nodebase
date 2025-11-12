import { AppHeader } from "@/components/layout/app-header";

const WorkflowsLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AppHeader />
      <main className="flex-1">{children}</main>
    </>
  );
};

export default WorkflowsLayout;
