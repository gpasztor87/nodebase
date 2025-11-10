import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
  const trpc = useTRPC();

  return useSuspenseQuery(trpc.getCurrentUser.queryOptions());
};
