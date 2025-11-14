import { channel, topic } from "@inngest/realtime";

export const HttpRequestChannelName = "http-request-execution";

export const httpRequestChannel = channel(HttpRequestChannelName).addTopic(
  topic("status").type<{
    nodeId: string;
    status: "loading" | "success" | "error";
  }>(),
);
