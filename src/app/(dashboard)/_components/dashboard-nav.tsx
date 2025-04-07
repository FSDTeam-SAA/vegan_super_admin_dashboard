"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export default function DashboardNavbar() {
  return (
    <div className="flex h-[80px] items-center justify-end gap-3 border-b border-white/80 p-4 pr-[60px]">
      <ProfileBar />
    </div>
  );
}

const ProfileBar = () => {
  const onLogout = () => {};
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
        <DropdownMenuItem onClick={onLogout} className="cursor-pointer">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
