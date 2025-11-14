"use client";

import * as React from "react";

import { type Node, type NodeProps, useReactFlow } from "@xyflow/react";
import { GlobeIcon } from "lucide-react";

import { HttpRequestChannelName } from "@/inngest/channels/http-request";

import { useNodeStatus } from "../../hooks/use-node-status";
import { BaseExecutionNode } from "../base-execution-node";
import { fetchHttpRequestRealtimeToken } from "./actions";
import { HttpRequestDialog, type HttpRequestFormValues } from "./dialog";

type HttpRequestNodeData = {
  variableName?: string;
  endpoint?: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: string;
};

type HttpRequestNodeType = Node<HttpRequestNodeData>;

export const HttpRequestNode = React.memo(
  (props: NodeProps<HttpRequestNodeType>) => {
    const [dialogOpen, setDialogOpen] = React.useState(false);

    const { setNodes } = useReactFlow();

    const nodeStatus = useNodeStatus({
      nodeId: props.id,
      channel: HttpRequestChannelName,
      topic: "status",
      refreshToken: fetchHttpRequestRealtimeToken,
    });

    const nodeData = props.data;
    const description = nodeData.endpoint
      ? `${nodeData.method || "DELETE"}: ${nodeData.endpoint}`
      : "Not configured";

    const handleOpenSettings = () => setDialogOpen(true);

    const handleSubmit = (values: HttpRequestFormValues) => {
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === props.id) {
            return {
              ...node,
              data: {
                ...node.data,
                ...values,
              },
            };
          }

          return node;
        }),
      );
    };

    return (
      <>
        <HttpRequestDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSubmit={handleSubmit}
          defaultValues={nodeData}
        />
        <BaseExecutionNode
          {...props}
          id={props.id}
          name="HTTP Request"
          description={description}
          icon={GlobeIcon}
          status={nodeStatus}
          onSettings={handleOpenSettings}
          onDoubleClick={handleOpenSettings}
        />
      </>
    );
  },
);

HttpRequestNode.displayName = "HttpRequestNode";
