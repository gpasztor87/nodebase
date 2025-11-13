"use client";

import * as React from "react";

import { PlusIcon } from "lucide-react";

import { NodeSelector } from "@/components/node-selector";
import { Button } from "@/components/ui/button";

export const AddNodeButton = React.memo(() => {
  const [selectorOpen, setSelectorOpen] = React.useState(false);

  return (
    <NodeSelector open={selectorOpen} onOpenChange={setSelectorOpen}>
      <Button
        size="icon"
        variant="outline"
        className="bg-background"
        onClick={() => {}}
      >
        <PlusIcon />
      </Button>
    </NodeSelector>
  );
});

AddNodeButton.displayName = "AddNodeButton";
