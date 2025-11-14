import { inferInput } from "@trpc/tanstack-react-query";

import { prefetch, trpc } from "@/trpc/server";

type Input = inferInput<typeof trpc.executions.list>;

export const prefetchExecutions = (params: Input) => {
  return prefetch(trpc.executions.list.queryOptions(params));
};

export const prefetchExecution = (id: string) => {
  return prefetch(trpc.executions.get.queryOptions({ id }));
};
