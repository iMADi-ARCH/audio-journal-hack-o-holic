import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { signOut } from "@/utils/actions/auth";
import { getUserDetails, updateUserDetails } from "@/utils/actions/user";
import useSupabase from "@/utils/hooks/useSupabase";
import { UserIcon } from "lucide-react";
import React from "react";
import { useQuery } from "react-query";
import EditDetail from "./EditDetail";

type Props = {};

const ProfileContent = (props: Props) => {
  const supabase = useSupabase();
  const {
    data: userDetails,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", "details"],
    queryFn: () => getUserDetails(supabase),
  });
  if (isLoading)
    return (
      <>
        <Skeleton className="w-32 h-32 rounded-full" />
        <Skeleton className="w-64 h-5 rounded-full" />
        <div className="flex gap-2 text-base">
          <Skeleton className="w-24 h-5" />
          <Skeleton className="w-24 h-5" />
        </div>
        <Skeleton className="w-64 h-32" />
      </>
    );
  return (
    <>
      <Avatar className="w-32 h-32">
        <AvatarImage src="" />
        <AvatarFallback>
          <UserIcon size={64} />
        </AvatarFallback>
      </Avatar>
      <div className="">
        <EditDetail
          defaultValue={userDetails?.full_name || "Anonymous User"}
          className="text-2xl font-medium"
          updateAction={(newValue) =>
            updateUserDetails(supabase, { full_name: newValue })
          }
        />
        <div className="flex gap-2 text-base mb-5">
          <span className="">10k followers</span>|
          <span className="">2.8k following</span>
        </div>
        <EditDetail
          defaultValue={userDetails?.bio || "Your bio lives here..."}
          updateAction={(newValue) =>
            updateUserDetails(supabase, { bio: newValue })
          }
        />
      </div>
      <form action={signOut}>
        <Button className="w-fit self-end" size={"sm"} variant={"destructive"}>
          Sign Out
        </Button>
      </form>
    </>
  );
};

export default ProfileContent;
