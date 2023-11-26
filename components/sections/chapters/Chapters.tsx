"use client";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import Chapter from "./Chapter";
import CreateChapter from "./CreateChapter";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { getChapters } from "@/utils/actions/chapters";
import { useQuery } from "react-query";
import useSupabase from "@/utils/hooks/useSupabase";

type Props = {};

const Chapters = (props: Props) => {
  const supabase = useSupabase();
  const {
    data: chapters,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["chapters"],
    queryFn: () => getChapters(supabase),
  });
  // const chapters = await getChapters(supabase);
  if (isError) {
    return null;
  }

  return (
    <section className="m-5">
      <h1 className="text-2xl font-medium">Chapters</h1>
      <ScrollArea className="w-full">
        {/* <div className="w-full overflow-x-scroll"> */}
        <div className="flex gap-5 w-max">
          <CreateChapter />
          {isLoading
            ? // <Chapter.Skeleton />
              [...Array(5)].map((_) => <Chapter.Skeleton key={_} />)
            : chapters?.map((chapter) => <Chapter chapter={chapter} />)}
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      {/* </div> */}
    </section>
  );
};

export default Chapters;
