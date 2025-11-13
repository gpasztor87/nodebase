"use client";

import * as React from "react";

import { type Node, type NodeProps, useReactFlow } from "@xyflow/react";
import { GlobeIcon } from "lucide-react";

import { BaseExecutionNode } from "../base-execution-node";
import { type FormType, HttpRequestDialog } from "./dialog";

type HttpRequestNodeData = {
  endpoint?: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: string;
  [key: string]: unknown;
};

type HttpRequestNodeType = Node<HttpRequestNodeData>;

export const HttpRequestNode = React.memo(
  (props: NodeProps<HttpRequestNodeType>) => {
    const [dialogOpen, setDialogOpen] = React.useState(false);

    const { setNodes } = useReactFlow();

    const nodeStatus = "initial";

    const nodeData = props.data;
    const description = nodeData.endpoint
      ? `${nodeData.method || "DELETE"}: ${nodeData.endpoint}`
      : "Not configured";

    const handleOpenSettings = () => setDialogOpen(true);

    const handleSubmit = (values: FormType) => {
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === props.id) {
            return {
              ...node,
              data: {
                ...node.data,
                endpoint: values.endpoint,
                method: values.method,
                body: values.body,
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
          // TODO  initialValues for all of these
          defaultEndpoint={nodeData.endpoint}
          defaultMethod={nodeData.method}
          defaultBody={nodeData.body}
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
