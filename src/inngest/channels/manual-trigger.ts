import { channel, topic } from "@inngest/realtime";

export const ManualTriggerChannelName = "manual-trigger-execution";

export const manualTriggerChannel = channel(ManualTriggerChannelName).addTopic(
  topic("status").type<{
    nodeId: string;
    status: "loading" | "success" | "error";
  }>(),
);
