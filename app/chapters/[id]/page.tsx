import {
  getChapterDetails,
  getChapterThumbnail,
} from "@/utils/actions/chapters";
import { createClient } from "@/utils/supabase/server";
import { format } from "date-fns";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

type Props = {};

const AddChapter = async ({ params }: { params: { id?: string } }) => {
  const supabase = createClient();
  if (!params.id) notFound();
  const thumbnail = await getChapterThumbnail(supabase, params.id);
  const chapter = await getChapterDetails(supabase, params.id);

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

      <div className="flex flex-col">
        {format(new Date(), "hh:mm:ss")}{" "}
        <audio className="mb-5" src="" controls></audio>
        {format(new Date(), "hh:mm:ss")}{" "}
        <audio className="mb-5" src="" controls></audio>
        {format(new Date(), "hh:mm:ss")}{" "}
        <audio className="mb-5" src="" controls></audio>
        {format(new Date(), "hh:mm:ss")}{" "}
        <audio className="mb-5" src="" controls></audio>
      </div>
    </div>
  );
};

export default AddChapter;
