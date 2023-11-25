import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { UserIcon } from "lucide-react";
import { Button } from "../../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { signOut } from "@/utils/actions/auth";
import ProfileContent from "./ProfileContent";

type Props = {};

const ProfileDialog = (props: Props) => {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <button>
            <Avatar>
              <AvatarImage src={""} />
              <AvatarFallback>
                <UserIcon aria-label="your profile" />
              </AvatarFallback>
            </Avatar>
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="flex flex-col gap-5 p-5 w-full max-w-xs"
          align="end"
          sideOffset={12}
        >
          <ProfileContent />
        </PopoverContent>
      </Popover>
    </>
  );
};

export default ProfileDialog;
