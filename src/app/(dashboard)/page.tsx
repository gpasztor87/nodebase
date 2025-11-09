import Image from "next/image";
import { requireAuth } from "@/features/auth/lib/utils";

const Page = async () => {
  await requireAuth();

  return <h2>Workflows</h2>;
};

export default Page;
