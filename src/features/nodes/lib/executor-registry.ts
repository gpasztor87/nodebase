import { NodeType } from "@/generated/prisma/enums";

import { httpRequestExecutor } from "@/features/nodes/components/http-request/executor";
import { manualTriggerExecutor } from "@/features/nodes/components/manual-trigger/executor";
import { type NodeExecutor } from "@/features/nodes/types";

export const executorRegistry: Record<NodeType, NodeExecutor> = {
  [NodeType.MANUAL_TRIGGER]: manualTriggerExecutor,
  [NodeType.INITIAL]: manualTriggerExecutor,
  [NodeType.HTTP_REQUEST]: httpRequestExecutor,
};

export const getExecutor = (type: NodeType): NodeExecutor => {
  const executor = executorRegistry[type];

  if (!executor) {
    throw new Error(`No executor found for node type: ${type}`);
  }

  return executor;
};
