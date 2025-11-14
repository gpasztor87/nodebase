import * as React from "react";

import { type NodeProps } from "@xyflow/react";
import { MousePointerIcon } from "lucide-react";

import { useNodeStatus } from "@/features/executions/hooks/use-node-status";

import { ManualTriggerChannelName } from "@/inngest/channels/manual-trigger";

import { BaseTriggerNode } from "../base-trigger-node";
import { fetchManualTriggerRealtimeToken } from "./actions";
import { ManualTriggerDialog } from "./dialog";

export const ManualTriggerNode = React.memo((props: NodeProps) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const nodeStatus = useNodeStatus({
    nodeId: props.id,
    channel: ManualTriggerChannelName,
    topic: "status",
    refreshToken: fetchManualTriggerRealtimeToken,
  });

  const handleOpenSettings = () => setDialogOpen(true);

  return (
    <>
      <ManualTriggerDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      <BaseTriggerNode
        {...props}
        icon={MousePointerIcon}
        name="Trigger manually"
        description="When clicking 'Execute workflow'"
        status={nodeStatus}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  );
});

ManualTriggerNode.displayName = "ManualTriggerNode";
