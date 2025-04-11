"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { EllipsisVertical, Loader2 } from "lucide-react";
import { useState } from "react";

type statsOption = "1m" | "3m" | "6m" | "1y" | "lifetime";

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    verifiedVendors: number;
    pendingVerifications: number;
    totalEarnings: number;
    platformEarnings: number;
  };
}

const AdminOverviewStats = () => {
  const [active, setActive] = useState<statsOption>("1m");

  const { data, isLoading, isError, error } = useQuery<ApiResponse>({
    queryKey: ["overview"],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/superadmin/getVendorVerificationCounts`
      ).then((res) => res.json()),
  });

  let content;
  if (isLoading) {
    content = (
      <div className="min-h-[400px] w-full flex justify-center items-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  } else if (isError) {
    content = (
      <div className="min-h-[400px] w-full flex justify-center items-center">
        <p className="text-red-500">{error.message}</p>
      </div>
    );
  } else if (data) {
    content = (
      <div className="mt-[56px] rounded-[16px] bg-[#F8F5F2] px-6 md:px-[40px] py-8 md:py-[33px]">
        <div className="grid grid-cols-1 gap-[16px] md:grid-cols-4">
          <div className="rounded-[10px] border border-[#E8DFD6] py-4 pl-4 pr-[6px] md:col-span-1">
            <p className="flex items-center justify-between text-sm font-normal leading-[16px] text-[#6B7280]">
              Total Earnings{" "}
              <EllipsisVertical className="h-[24px] w-[24px] cursor-pointer" />
            </p>
            <p className="pt-[16px] text-2xl font-medium leading-[29px] text-[#1F2937] md:text-3xl md:leading-[36px]">
              ${data.data.totalEarnings}
            </p>
          </div>
          <div className="rounded-[10px] border border-[#E8DFD6] py-4 pl-4 pr-[6px] md:col-span-1">
            <p className="flex items-center justify-between text-sm font-normal leading-[16px] text-[#6B7280]">
              Platform Earnings
              <EllipsisVertical className="h-[24px] w-[24px] cursor-pointer" />
            </p>
            <p className="pt-[16px] text-2xl font-medium leading-[29px] text-[#1F2937] md:text-3xl md:leading-[36px]">
              ${data.data.platformEarnings}
            </p>
          </div>
          <div className="rounded-[10px] border border-[#E8DFD6] py-4 pl-4 pr-[6px] md:col-span-1">
            <p className="flex items-center justify-between text-sm font-normal leading-[16px] text-[#6B7280]">
              Verified Vendors
              <EllipsisVertical className="h-[24px] w-[24px] cursor-pointer" />
            </p>
            <p className="pt-[16px] text-2xl font-medium leading-[29px] text-[#1F2937] md:text-3xl md:leading-[36px]">
              {data.data.verifiedVendors}
            </p>
          </div>
          <div className="rounded-[10px] border border-[#E8DFD6] py-4 pl-4 pr-[6px] md:col-span-1">
            <p className="flex items-center justify-between text-sm font-normal leading-[16px] text-[#6B7280]">
              Pending Verifications{" "}
              <EllipsisVertical className="h-[24px] w-[24px] cursor-pointer" />
            </p>
            <p className="pt-[16px] text-2xl font-medium leading-[29px] text-[#1F2937] md:text-3xl md:leading-[36px]">
              {data.data.pendingVerifications}
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="mt-[40px]">
      <div className="flex w-full justify-end">
        <Tabs
          defaultValue={active}
          onValueChange={(tab) => setActive(tab as statsOption)}
        >
          <TabsList>
            <TabsTrigger value="1m">
              <span className="hidden md:block">1 months</span>
              <span className="md:hidden">1m</span>
            </TabsTrigger>
            <TabsTrigger value="3m">
              <span className="hidden md:block">3 months</span>
              <span className="md:hidden">3m</span>
            </TabsTrigger>
            <TabsTrigger value="6m">
              <span className="hidden md:block">6 months</span>
              <span className="md:hidden">6m</span>
            </TabsTrigger>
            <TabsTrigger value="1y">
              <span className="hidden md:block">1 Year</span>
              <span className="md:hidden">1y</span>
            </TabsTrigger>
            <TabsTrigger value="lifetime">
              <span className="hidden md:block">Lifetime</span>
              <span className="md:hidden">LifeT</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* first part  */}
      {content}
    </div>
  );
};

export default AdminOverviewStats;
