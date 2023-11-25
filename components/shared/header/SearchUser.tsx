"use client";
import { UserItem } from "@/components/specific/user-item";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { searchUserByEmail } from "@/utils/actions/user";
import useSupabase from "@/utils/hooks/useSupabase";
import { Loader2Icon, UserPlusIcon } from "lucide-react";
import React from "react";
import { useMutation, useQuery } from "react-query";

type Props = {};

const SearchUser = (props: Props) => {
  const supabase = useSupabase();

  const {
    mutate,
    data: user,
    isLoading,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: (email: string) => searchUserByEmail(supabase, email),
  });

  // const {} = useQuery({queryKey: ["friends"], queryFn: getFrien})

  return (
    <Dialog>
      <DialogTrigger>
        <Button size={"icon"} variant={"ghost"} aria-label="Add Friends">
          <UserPlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Friend</DialogTitle>
          <DialogDescription>
            Send a friend request to your friend
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const fdata = new FormData(e.currentTarget);
            const email = fdata.get("email") as string;
            mutate(email);
          }}
        >
          <Label>Enter email</Label>
          <Input name="email" type="email" placeholder="" />
        </form>
        {isSuccess &&
          (<UserItem user={user} /> || "No user found with that email")}
        {isLoading && <Loader2Icon className="animate-spin" />}
      </DialogContent>
    </Dialog>
  );
};

export default SearchUser;
