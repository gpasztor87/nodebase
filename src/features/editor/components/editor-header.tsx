"use client";

import Link from "next/link";

import { useEffect, useRef, useState } from "react";

import { useAtomValue } from "jotai";
import { SaveIcon } from "lucide-react";

import { AppHeader } from "@/components/layout/app-header";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  useSuspenseWorkflow,
  useUpdateWorkflow,
  useUpdateWorkflowName,
} from "@/features/workflows/hooks/use-workflows";

import { editorAtom } from "../store/atoms";

export const EditorSaveButton = ({ workflowId }: { workflowId: string }) => {
  const editor = useAtomValue(editorAtom);
  const saveWorkflow = useUpdateWorkflow();

  const handleSave = () => {
    if (!editor) return;

    const nodes = editor.getNodes();
    const edges = editor.getEdges();

    saveWorkflow.mutate({
      id: workflowId,
      nodes,
      edges,
    });
  };

  return (
    <div className="ml-auto">
      <Button size="sm" onClick={handleSave} disabled={saveWorkflow.isPending}>
        <SaveIcon className="size-4" />
        Save
      </Button>
    </div>
  );
};

const EditorNameInput = ({ workflowId }: { workflowId: string }) => {
  const { data: workflow } = useSuspenseWorkflow(workflowId);
  const updateWorkflow = useUpdateWorkflowName();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(workflow.name);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (workflow.name) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setName(workflow.name);
    }
  }, [workflow.name]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const handleSave = async () => {
    if (name === workflow.name) {
      setEditing(false);
      return;
    }

    try {
      await updateWorkflow.mutateAsync({
        id: workflow.id,
        name,
      });
    } catch {
      setName(workflow.name);
    } finally {
      setEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setName(workflow.name);
      setEditing(false);
    }
  };

  if (editing) {
    return (
      <Input
        ref={inputRef}
        value={name}
        onBlur={handleSave}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={handleKeyDown}
        className="h-7 w-auto px-2"
        disabled={updateWorkflow.isPending}
      />
    );
  }

  return (
    <BreadcrumbItem
      onClick={() => setEditing(true)}
      className="cursor-pointer hover:text-foreground transition-colors"
    >
      {workflow.name}
    </BreadcrumbItem>
  );
};

export const EditorBreadcrumbs = ({ workflowId }: { workflowId: string }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/workflows" prefetch>
              Workflows
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <EditorNameInput workflowId={workflowId} />
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export const EditorHeader = ({ workflowId }: { workflowId: string }) => {
  return (
    <AppHeader>
      <div className="flex flex-row items-center justify-between gap-x-4 w-full">
        <EditorBreadcrumbs workflowId={workflowId} />
        <EditorSaveButton workflowId={workflowId} />
      </div>
    </AppHeader>
  );
};
