import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getChapterThumbnail } from "@/utils/actions/chapters";
import { createClient } from "@/utils/supabase/server";
import { ChaptersRow, UsersRow } from "@/utils/types/database";
import { PlayIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  chapter: ChaptersRow & { users: UsersRow | null };
};

const Chapter = async ({ chapter }: Props) => {
  const supabase = createClient();
  const thumbnail = await getChapterThumbnail(supabase, chapter.id.toString());
  return (
    <Link href={`/chapters/${chapter.user_id}/${chapter.id}`}>
      <Card className="w-64 h-96 relative overflow-hidden z-0">
        <Image
          width={256}
          height={256}
          className="absolute left-0 top-0 w-full h-full object-cover -z-10"
          src={thumbnail}
          alt={chapter.title || "Unknown"}
        />
        <CardContent className="z-10 p-0 bg-gradient-to-t from-background to-transparent absolute bottom-0 left-0 right-0">
          <CardHeader className="gap-0 space-y-0">
            <CardTitle className="text-base">{chapter.title}</CardTitle>
            <CardDescription>{chapter.desc}</CardDescription>
            <span className="text-sm flex items-center gap-2">
              <Avatar className="w-4 h-4">
                <AvatarFallback>
                  <UserIcon />
                </AvatarFallback>
              </Avatar>{" "}
              {chapter.users?.full_name}
            </span>
          </CardHeader>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Chapter;
