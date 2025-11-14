import type { NodeTypes } from "@xyflow/react";

import { NodeType } from "@/generated/prisma/enums";

import { HttpRequestNode } from "@/features/nodes/components/http-request/node";
import { InitialNode } from "@/features/nodes/components/initial/node";
import { ManualTriggerNode } from "@/features/nodes/components/manual-trigger/node";

export const nodeComponents = {
  [NodeType.INITIAL]: InitialNode,
  [NodeType.HTTP_REQUEST]: HttpRequestNode,
  [NodeType.MANUAL_TRIGGER]: ManualTriggerNode,
} as const satisfies NodeTypes;

export type RegisteredNodeTypes = keyof typeof nodeComponents;
