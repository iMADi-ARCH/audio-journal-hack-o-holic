"use client";
import Link from "next/link";
import React from "react";
import { Input } from "../../ui/input";
import {
  BellIcon,
  Loader2Icon,
  SearchIcon,
  UserIcon,
  UserPlusIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import useUser from "@/utils/hooks/useUser";
import { Button } from "@/components/ui/button";
import useHideOnPaths from "@/utils/hooks/useHideOnPaths";
import { ProfileDialog } from "@/components/specific/profile-dialog";
import SearchUser from "./SearchUser";

type Props = {};

const Header = (props: Props) => {
  const { visible } = useHideOnPaths(["login"]);
  if (!visible) return null;

  const { user, isLoading, isError } = useUser();

  return (
    <header className="w-full py-3 border-b">
      <nav className="max-w-screen-2xl px-5 mx-auto flex items-center w-full justify-between gap-10">
        <h1 className="font-bold">Audio Journal</h1>
        {/* <div className="max-w-md w-full flex items-center gap-3 relative">
          <SearchIcon className="text-muted-foreground absolute left-3" />
          <Input className="flex-1 pl-10" type="search" placeholder="Search" />
        </div> */}
        {isLoading ? (
          <div className="text-muted-foreground w-28 flex justify-end">
            <Loader2Icon className="animate-spin" />
          </div>
        ) : user ? (
          <div className="flex gap-3 items-center">
            <SearchUser />
            <Link href={"/"}>
              <BellIcon aria-label="View Notifications" />
            </Link>
            <ProfileDialog />
          </div>
        ) : (
          <div className="flex gap-3 items-center">
            <Link href={"/login"}>
              <Button variant={"secondary"}>Sign In</Button>
            </Link>
            <Link href={"/login"}>
              <Button>Sign Up</Button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
