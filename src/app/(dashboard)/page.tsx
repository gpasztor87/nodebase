import { requireAuth } from "@/features/auth/lib/utils";

const DashboardPage = async () => {
  await requireAuth();

  return;
};
export default DashboardPage;
