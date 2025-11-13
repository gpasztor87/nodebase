"use client";

import z from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const formSchema = z.object({
  endpoint: z.url({ message: "Please enter a valid URL" }),
  method: z.enum(["GET", "POST", "PATCH", "PUT", "DELETE"]),
  body: z.string().optional(),
});

type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  defaultEndpoint?: string;
  defaultMethod?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  defaultBody?: string;
};

export const HttpRequestDialog = ({ open, onOpenChange }: DialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>HTTP Request</DialogTitle>
          <DialogDescription>
            Configure settings for the HTTP Request node.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
