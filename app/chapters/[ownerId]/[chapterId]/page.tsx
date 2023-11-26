import { RecordButton } from "@/components/specific/audio-recorder";
import {
  getChapterDetails,
  getChapterThumbnail,
} from "@/utils/actions/chapters";
import { createClient } from "@/utils/supabase/server";
import { format } from "date-fns";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import AudioList from "./AudioList";

type Props = { params?: { ownerId?: string; chapterId?: string } };

const ChapterPage = async ({ params }: Props) => {
  const supabase = createClient();
  if (!params || !params.chapterId || !params.ownerId) return notFound();
  const thumbnail = await getChapterThumbnail(supabase, params.chapterId);
  const chapter = await getChapterDetails(supabase, params.chapterId);

  return (
    <div className="">
      <Image
        className="w-full h-64 object-cover"
        src={thumbnail}
        width={512}
        height={512}
        alt={chapter.title || "No alt"}
      />
      <div className="p-10">
        <h1 className="text-3xl font-bold capitalize">{chapter.title}</h1>
        <p>{chapter.desc}</p>
        <p>
          Story of date {format(new Date(chapter.created_at), "dd/mm/yyyy")}
        </p>
      </div>

      <AudioList ownerId={params.ownerId} chapterId={params.chapterId} />
      <RecordButton ownerId={params.ownerId} chapterId={params.chapterId} />
    </div>
  );
};

export default ChapterPage;
