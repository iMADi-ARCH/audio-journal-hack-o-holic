"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getChapterThumbnail } from "@/utils/actions/chapters";
import useSupabase from "@/utils/hooks/useSupabase";
import { ChaptersRow, UsersRow } from "@/utils/types/database";
import { ImageIcon, PlayIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";

type Props = {
  chapter: ChaptersRow & { users: UsersRow | null };
};

const Chapter = ({ chapter }: Props) => {
  const supabase = useSupabase();
  const { data: thumbnail, status } = useQuery({
    queryKey: ["chapters", chapter.user_id, chapter.id],
    queryFn: () => getChapterThumbnail(supabase, chapter.id.toString()),
  });
  return (
    <Link href={`/chapters/${chapter.user_id}/${chapter.id}`}>
      <Card className="w-64 h-96 relative overflow-hidden z-0">
        {(() => {
          switch (status) {
            case "error":
            case "loading":
              return (
                <div className="absolute left-0 top-0 w-full h-full -z-10 flex items-center justify-center">
                  <ImageIcon />
                </div>
              );
            case "idle":
            case "success":
              return (
                <Image
                  width={256}
                  height={256}
                  className="absolute left-0 top-0 w-full h-full object-cover -z-10"
                  src={thumbnail || ""}
                  alt={chapter.title || "Unknown"}
                />
              );
          }
          return null;
        })()}
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

Chapter.Skeleton = () => {
  return (
    <Card className="w-64 h-96 relative">
      <CardContent className="z-10 p-0 bg-gradient-to-t from-background to-transparent absolute bottom-0 left-0 right-0">
        <CardHeader className="flex flex-col gap-1">
          <Skeleton className="h-5" />
          <Skeleton className="h-3" />
          <Skeleton className="h-3 w-1/2" />
          <span className="text-sm flex items-center gap-2">
            <Avatar className="w-4 h-4">
              <AvatarFallback>
                <UserIcon />
              </AvatarFallback>
            </Avatar>
            <Skeleton className="h-3 flex-1" />
          </span>
        </CardHeader>
      </CardContent>
    </Card>
  );
};

export default Chapter;
