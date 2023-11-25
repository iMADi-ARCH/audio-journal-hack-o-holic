"use client";
import useSupabase from "@/utils/hooks/useSupabase";
import React, { ReactNode, useEffect } from "react";
import { useQueryClient } from "react-query";

type Props = {
  children?: ReactNode;
};

const RealtimeUpdates = ({ children }: Props) => {
  const supabase = useSupabase();
  const queryClient = useQueryClient();

  useEffect(() => {
    // Listen to inserts
    const friendsSub = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "friends" },
        () => {
          queryClient.invalidateQueries({ queryKey: ["friends"] });
        }
      )
      .subscribe();

    const friendRequestsSub = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "friend_requests" },
        () => {
          queryClient.invalidateQueries({ queryKey: ["friends", "requests"] });
        }
      )
      .subscribe();
    return () => {
      friendsSub.unsubscribe();
      friendRequestsSub.unsubscribe();
    };
  }, []);

  return children;
};

export default RealtimeUpdates;
