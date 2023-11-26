"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { deleteChapter } from "@/utils/actions/chapters";
import useSupabase from "@/utils/hooks/useSupabase";
import useUser from "@/utils/hooks/useUser";
import { useRouter } from "next/navigation";
import React from "react";
import { useMutation } from "react-query";

type Props = {
  ownerId: string;
  chapterId: string;
};

const DeleteChapterButton = ({ ownerId, chapterId }: Props) => {
  const { user } = useUser();
  if (!user || user.id !== ownerId) return null;
  const supabase = useSupabase();
  const router = useRouter();
  const { toast } = useToast();
  const { mutate, isLoading } = useMutation({
    mutationFn: () => deleteChapter(supabase, chapterId),
    onError: (error) => {
      toast({
        title: "Cannot delete chapter",
        description: (error as Error).message,
      });
    },
    onSuccess: () => {
      toast({
        title: "Chapter Deleted successfully",
      });
      router.push("/");
    },
  });
  return (
    <Button
      disabled={isLoading}
      variant={"destructive"}
      onClick={() => mutate()}
    >
      Delete Chapter
    </Button>
  );
};

export default DeleteChapterButton;
