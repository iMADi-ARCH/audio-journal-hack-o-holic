"use client";
import { UserItem } from "@/components/specific/user-item";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import {
  getFriendRequests,
  getFriends,
  removeFriend,
} from "@/utils/actions/user";
import useUser from "@/utils/hooks/useUser";
import { createClient } from "@/utils/supabase/client";
import { cn } from "@/utils/ui-utils";
import { DeleteIcon, TrashIcon } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

type Props = {};

const FriendsPage = (props: Props) => {
  const supabase = createClient();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const friendsQuery = useQuery({
    queryKey: ["friends"],
    queryFn: () => getFriends(supabase),
    onError: (err: Error) => toast({ title: err.message }),
  });

  const friendRequestsQuery = useQuery({
    queryKey: ["friends", "requests"],
    queryFn: () => getFriendRequests(supabase),
    onError: (err: Error) => toast({ title: err.message }),
  });

  const deleteFriendMutation = useMutation({
    mutationFn: (fid: string) => removeFriend(supabase, fid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  return (
    <div className="p-5 flex">
      <div className="flex-1">
        <h1 className="text-2xl font-medium">Your Friends</h1>
        {friendsQuery.data?.length === 0 && "You have no friends :("}
        {friendsQuery.data?.map((friend) => (
          <div
            className={cn(
              `flex items-center justify-between group transition-opacity`,
              { "opacity-50": deleteFriendMutation.isLoading }
            )}
          >
            <UserItem key={friend.id} type="none" user={friend} />
            <Button
              variant={"destructive"}
              className="gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => deleteFriendMutation.mutate(friend.id)}
              disabled={deleteFriendMutation.isLoading}
            >
              <TrashIcon /> Remove friend
            </Button>
          </div>
        ))}
      </div>

      <div className="w-full flex-1">
        <h1 className="text-2xl font-medium">Friend Requests</h1>
        <div className="flex flex-col gap-2">
          {friendRequestsQuery.isLoading &&
            [...Array(3)].map((_, i) => (
              <Skeleton key={i} className="w-full h-16" />
            ))}
          {friendRequestsQuery.data?.length === 0 &&
            "No pending Friend Requests"}
          {friendRequestsQuery.data?.map(
            (req) =>
              req.users && (
                <UserItem key={req.id} type="accept" user={req.users} />
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
