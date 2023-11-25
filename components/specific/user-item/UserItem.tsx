"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { acceptFriendRequest, sendFriendRequest } from "@/utils/actions/user";
import useSupabase from "@/utils/hooks/useSupabase";
import { UsersRow } from "@/utils/types/database";
import { CheckIcon, UserIcon, UserPlusIcon } from "lucide-react";
import { useMutation, useQueryClient } from "react-query";

const UserItem = ({
  user,
  type = "send",
}: {
  user: UsersRow;
  type?: "accept" | "send" | "none";
}) => {
  const supabase = useSupabase();
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, isSuccess } = useMutation({
    mutationFn: () =>
      type === "send"
        ? sendFriendRequest(supabase, user.id)
        : type === "accept"
        ? acceptFriendRequest(supabase, user.id)
        : new Promise((_) => null),
    onSuccess: () => {
      if (type === "send") {
        queryClient.invalidateQueries({ queryKey: ["friends", "requests"] });
      } else if (type === "accept") {
        queryClient.invalidateQueries({ queryKey: ["friends"] });
      }
    },
  });

  return (
    <div className="flex items-center gap-5">
      <Avatar className="w-16 h-16">
        <AvatarImage />
        <AvatarFallback>
          <UserIcon />
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-1 flex-col items-start leading-none gap-0">
        <p className="font-medium">{user.full_name}</p>
        <span className="text-xs">{user.email}</span>
      </div>
      {type !== "none" && (
        <Button
          onClick={() => mutate()}
          disabled={isLoading || isSuccess}
          variant={"ghost"}
          className="gap-3"
        >
          {type === "send" ? (
            isSuccess ? (
              <>
                <CheckIcon /> Request Sent
              </>
            ) : (
              <>
                <UserPlusIcon /> Send Request
              </>
            )
          ) : isSuccess ? null : (
            <>
              <UserPlusIcon /> Accept Request
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export default UserItem;
