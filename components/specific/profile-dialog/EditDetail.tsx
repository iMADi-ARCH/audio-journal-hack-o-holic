"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/ui-utils";
import { CheckIcon, PencilIcon } from "lucide-react";
import React, { HTMLProps, useState, useTransition } from "react";

interface Props extends HTMLProps<HTMLDivElement> {
  defaultValue: string;
  updateAction: (newValue: string) => Promise<void>;
  InputElement?: HTMLTextAreaElement | HTMLInputElement | typeof Input;
}

const EditDetail = ({
  defaultValue,
  updateAction,
  InputElement,
  className,
  ...props
}: Props) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const [isPending, startTransition] = useTransition();

  if (editing) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          startTransition(async () => {
            await updateAction(value);
            setEditing(false);
          });
        }}
        className="flex items-center"
      >
        <Input
          value={value}
          className="flex-1"
          onChange={(e) => setValue(e.currentTarget.value)}
        />
        <Button variant={"ghost"} size={"icon"}>
          <CheckIcon />
        </Button>
      </form>
    );
  }
  return (
    <div
      className={cn("relative flex items-center group gap-4", className)}
      {...props}
    >
      <h1 className="flex-1">{value}</h1>
      <Button
        className="group-hover:opacity-100 opacity-0 transition-opacity"
        onClick={() => setEditing(true)}
        variant={"ghost"}
        size={"icon"}
      >
        <PencilIcon />
      </Button>
    </div>
  );
};

export default EditDetail;
