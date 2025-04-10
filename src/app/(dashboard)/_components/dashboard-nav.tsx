"use client";
import { logOut } from "@/actions/login";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useTransition } from "react";

export default function DashboardNavbar() {
  return (
    <div className="flex h-[80px] items-center justify-end gap-3 border-b border-white/80 p-4 pr-[60px]">
      <ProfileBar />
    </div>
  );
}

const ProfileBar = () => {
  const [isPending, startTransition] = useTransition();
  const onLogout = () => {
    startTransition(() => {
      logOut()
        .then(() => {})
        .catch((error) => {
          console.error("Logout failed:", error);
        });
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border-0 outline-0 ring-0">
        <Image
          src="https://res.cloudinary.com/dw5wizivl/image/upload/v1739003577/dmcbpem50y1ydjcxne0p.png"
          alt="logo"
          width={40}
          height={40}
          className="cursor-pointer rounded-full"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuItem
          onClick={() => window.open("http://localhost:3000", "_blank")}
          className="cursor-pointer"
        >
          Visit Website
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer w-full"
          onClick={onLogout}
          disabled={isPending}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
