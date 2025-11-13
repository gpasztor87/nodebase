import * as React from "react";

import { type NodeProps } from "@xyflow/react";
import { MousePointerIcon } from "lucide-react";

import { BaseTriggerNode } from "../components/base-trigger-node";

export const ManualTriggerNode = React.memo((props: NodeProps) => {
  return (
    <>
      <BaseTriggerNode
        {...props}
        icon={MousePointerIcon}
        name="When clicking 'Execute workflow'"
      />
    </>
  );
});

ManualTriggerNode.displayName = "ManualTriggerNode";
