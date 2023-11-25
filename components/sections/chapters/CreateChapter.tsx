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
import { createChapter } from "@/utils/actions/chapters";
import useSupabase from "@/utils/hooks/useSupabase";
import { PlusIcon } from "lucide-react";
import React from "react";

type Props = {};

const CreateChapter = (props: Props) => {
  const supabase = useSupabase();
  return (
    <Dialog>
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
          action={(fdata) => createChapter(supabase, fdata)}
        >
          <Label>Title</Label>
          <Input type="text" name="title" />
          <Label>Description</Label>
          <Input type="text" name="desc" />
          <Label>Thumbnail</Label>
          <Input type="file" name="thumbnail" />
          <Button>Save</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChapter;
