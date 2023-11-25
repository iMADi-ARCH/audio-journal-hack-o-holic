"use client";
import useHideOnPaths from "@/utils/hooks/useHideOnPaths";
import { GridIcon, HeadphonesIcon, MenuIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";

type Props = {};

const LeftBar = (props: Props) => {
  const [open, setOpen] = useState(true);

  const { visible } = useHideOnPaths(["login"]);
  if (!visible) return null;

  return (
    <>
      {open && (
        <div className="w-full max-w-xs bg-background border-r">
          <Link href={"/"}>
            <ListItem icon={<GridIcon />}>Feed</ListItem>
          </Link>
          <Link href={"/friends"}>
            <ListItem icon={<UsersIcon />}>Your Friends</ListItem>
          </Link>
          <Link href={"/"}>
            <ListItem icon={<HeadphonesIcon />}>Your Stories</ListItem>
          </Link>
        </div>
      )}
    </>
  );
};

const ListItem = ({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div className="px-5 py-3 text-foreground/75 border-b gap-4 flex text-sm items-center font-bold hover:text-foreground transition-colors">
      <div className="">{icon}</div>
      {children}
    </div>
  );
};

export default LeftBar;
