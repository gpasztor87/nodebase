import { NonRetriableError } from "inngest";
import ky, { type Options as KyOptions } from "ky";

import { NodeExecutor } from "@/features/executions/types";

import { httpRequestChannel } from "@/inngest/channels/http-request";

type HttpRequestData = {
  variableName?: string;
  endpoint?: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: string;
};

export const httpRequestExecutor: NodeExecutor<HttpRequestData> = async ({
  data,
  nodeId,
  context,
  step,
  publish,
}) => {
  await publish(
    httpRequestChannel().status({
      nodeId,
      status: "loading",
    }),
  );

  const result = await step.run("http-request", async () => {
    if (!data.endpoint) {
      await publish(
        httpRequestChannel().status({
          nodeId,
          status: "error",
        }),
      );

      throw new NonRetriableError("Http Request node: No endpoint configured.");
    }

    if (!data.variableName) {
      await publish(
        httpRequestChannel().status({
          nodeId,
          status: "error",
        }),
      );

      throw new NonRetriableError(
        "Http Request node: Variable name not configured.",
      );
    }

    if (!data.method) {
      await publish(
        httpRequestChannel().status({
          nodeId,
          status: "error",
        }),
      );

      throw new NonRetriableError("Http Request node: Method not configured.");
    }

    const endpoint = data.endpoint;
    const method = data.method;

    const options: KyOptions = { method };

    if (["POST", "PATCH", "PUT"].includes(method)) {
      options.body = data.body;
      options.headers = {
        "Content-Type": "application/json",
      };
    }

    const response = await ky(endpoint, options).catch(async () => {
      await publish(
        httpRequestChannel().status({
          nodeId,
          status: "error",
        }),
      );

      throw new NonRetriableError("Http Request failed.");
    });

    const contentType = response.headers.get("content-type");
    const responseData = contentType?.includes("application/json")
      ? await response.json()
      : await response.text();

    return {
      ...context,
      [data.variableName]: {
        httpResponse: {
          status: response.status,
          statusText: response.statusText,
          data: responseData,
        },
      },
    };
  });

  await publish(
    httpRequestChannel().status({
      nodeId,
      status: "success",
    }),
  );

  return result;
};
