"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import SkeletonWrapper from "@/components/ui/skeleton-wrapper";
import { NavigationItem } from "@/data/dashboard";
interface Props {
  lists: NavigationItem[];
}

export default function Sidebar({ lists }: Props) {
  const pathname = usePathname();

  const NavigationContent = () => (
    <nav className="min-w-[272px] flex-1 px-4">
      {lists.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.id}
            href={item.path}
            className={`my-4 mb-1 flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
              pathname === item.path
                ? "bg-white/100 text-[#1D3557]"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Icon className="h-5 w-5" />
            <span className="font-inter text-sm font-medium leading-[20.3px]">
              {item.linkText}
            </span>
          </Link>
        );
      })}
      <hr className="mt-6 bg-[#F0F2F5]" />
    </nav>
  );

  const UserProfile = () => {
    return (
      <SkeletonWrapper isLoading={false}>
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={"/placeholder-avatar.jpg"} alt="Alison Eyo" />
              <AvatarFallback>AE</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-white">Demo Name</p>
              <p className="text-xs text-gray-400">test@gmail.com</p>
            </div>
          </div>
        </div>
      </SkeletonWrapper>
    );
  };

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <div className="fixed left-0 top-0 hidden h-screen min-w-[272px] flex-col overflow-y-auto bg-[#1D3557] text-white md:flex">
      <div className="py-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="https://res.cloudinary.com/dgnustmny/image/upload/v1739002910/logo_white_tne296.png"
            alt="Vegan Collective"
            width={56}
            height={56}
          />
          <span className="text-lg font-semibold">VEGAN COLLECTIVE</span>
        </Link>
      </div>
      <NavigationContent />

      <UserProfile />
    </div>
  );

  return (
    <>
      <DesktopSidebar />
    </>
  );
}
