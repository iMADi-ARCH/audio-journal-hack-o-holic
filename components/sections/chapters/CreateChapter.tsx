"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { createChapter } from "@/utils/actions/chapters";
import useSupabase from "@/utils/hooks/useSupabase";
import { PlusIcon } from "lucide-react";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { useMutation } from "react-query";

type Props = {};

const CreateChapter = (props: Props) => {
  const supabase = useSupabase();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ fdata }: { fdata: FormData }) =>
      createChapter(supabase, fdata),
    onError: (error) => {
      console.log(error);

      toast({
        title: "Error creating chapter",
        description: (error as Error).message,
      });
    },
    onSuccess: (data, variables) => {
      toast({
        title: "Successfully created chapter",
        description: variables.fdata.get("title") as string,
      });
      setOpen(false);
      redirect(`chapters/${data[0].id}`);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button>
          <Card className="w-64 h-96 ">
            <CardContent className="flex flex-col items-center justify-center h-full w-full">
              <PlusIcon />
              Create Chapter
            </CardContent>
          </Card>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Capture a chapter of your life</DialogTitle>
        </DialogHeader>
        <form
          className="flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            mutate({ fdata: new FormData(e.currentTarget) });
          }}
        >
          <Label>Title</Label>
          <Input type="text" name="title" />
          <Label>Description</Label>
          <Input type="text" name="desc" />
          <Label>Thumbnail</Label>
          <Input type="file" name="thumbnail" />
          <Button disabled={isLoading}>Save</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChapter;
