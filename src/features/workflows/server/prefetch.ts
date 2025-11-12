import { inferInput } from "@trpc/tanstack-react-query";

import { prefetch, trpc } from "@/trpc/server";

type Input = inferInput<typeof trpc.workflows.list>;

export const prefetchWorkflows = (params: Input) => {
  return prefetch(trpc.workflows.list.queryOptions(params));
};

export const prefetchWorkflow = (id: string) => {
  return prefetch(trpc.workflows.get.queryOptions({ id }));
};
