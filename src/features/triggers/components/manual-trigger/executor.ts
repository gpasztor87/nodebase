import { NodeExecutor } from "@/features/executions/types";

type ManualTriggerData = Record<string, unknown>;

export const manualTriggerExecutor: NodeExecutor<ManualTriggerData> = async ({
  context,
  step,
}) => {
  // TODO: Publist "loading" state for manual trigger

  const result = await step.run("manual-trigger", async () => context);

  // TODO: Publist "success" state for manual trigger

  return result;
};
