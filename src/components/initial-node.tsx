import * as React from "react";

import type { NodeProps } from "@xyflow/react";
import { PlusIcon } from "lucide-react";

import { NodeSelector } from "@/components/node-selector";
import { PlaceholderNode } from "@/components/react-flow/placeholder-node";
import { WorkflowNode } from "@/components/workflow-node";

export const InitialNode = React.memo((props: NodeProps) => {
  const [selectorOpen, setSelectorOpen] = React.useState(false);

  return (
    <NodeSelector open={selectorOpen} onOpenChange={setSelectorOpen}>
      <WorkflowNode showToolbar={false}>
        <PlaceholderNode {...props} onClick={() => setSelectorOpen(true)}>
          <div className="cursor-pointer flex items-center justify-center">
            <PlusIcon className="size-4" />
          </div>
        </PlaceholderNode>
      </WorkflowNode>
    </NodeSelector>
  );
});

InitialNode.displayName = "InitialNode";
