import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import Chapter from "./Chapter";
import CreateChapter from "./CreateChapter";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { createClient } from "@/utils/supabase/server";
import { getChapters } from "@/utils/actions/chapters";

type Props = {};

const Chapters = async (props: Props) => {
  const supabase = createClient();
  const chapters = await getChapters(supabase);
  return (
    <section className="m-5">
      <h1 className="text-2xl font-medium">Chapters</h1>
      <ScrollArea className="w-full">
        {/* <div className="w-full overflow-x-scroll"> */}
        <div className="flex gap-5 w-max">
          <CreateChapter />
          {chapters.map((chapter) => (
            <Chapter chapter={chapter} />
          ))}
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      {/* </div> */}
    </section>
  );
};

export default Chapters;
