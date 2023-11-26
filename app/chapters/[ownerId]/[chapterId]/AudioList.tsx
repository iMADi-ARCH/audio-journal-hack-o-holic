"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { getAudioURLs } from "@/utils/actions/chapters";
import useSupabase from "@/utils/hooks/useSupabase";
import useUser from "@/utils/hooks/useUser";
import { format } from "date-fns";
import { usePathname } from "next/navigation";
import React from "react";
import { useQuery } from "react-query";

type Props = {
  ownerId: string;
  chapterId: string;
};

const AudioList = ({ chapterId, ownerId }: Props) => {
  const supabase = useSupabase();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [chapterId, "audio"],
    queryFn: () => getAudioURLs(supabase, ownerId, chapterId),
  });
  const { toast } = useToast();
  if (isError) {
    toast({ title: "Failed to fetch audio", description: error as string });
    return null;
  }

  return (
    <div className="flex flex-col gap-4 px-10">
      {isLoading &&
        [...Array(5)].map((_) => <Skeleton key={_} className="w-96 h-24" />)}
      {data?.map((d) => (
        <div className="flex items-center" key={d.time.toString()}>
          <span className="flex-1">{format(d.time, "hh:mm b")}</span>
          <audio className="flex-1" src={d.url} controls />
        </div>
      ))}
    </div>
  );
};

export default AudioList;
