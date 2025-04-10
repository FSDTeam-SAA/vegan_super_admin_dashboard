"use client";

import { OrganizationProfile } from "@/types/organization";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

export const organizationColumn: ColumnDef<OrganizationProfile>[] = [
  {
    header: "Business Name",
    cell: ({ row }) => {
      return (
        <div className="text-start">
          <h4 className="text-sm font-medium leading-[16px] text-[#1F2937]">
            {row.original.organizationName}
          </h4>
          <h4 className="pt-[8px] text-xs font-normal leading-[14px] text-[#6B7280]">
            Merchant
          </h4>
        </div>
      );
    },
  },
  {
    header: "Onboarding Date ",
    cell: ({ row }) => {
      return (
        <div className="flex justify-start gap-[2px]">
          <span className="text-sm font-normal leading-[16px] text-[#1F2937]">
            {moment(row.original.createdAt).format("MMM D, YYYY")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "state",
    header: "State",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    header: "Status",
    cell: ({ row }) => {
      return (
        <div className="flex justify-start gap-[2px]">
          <span
            className={`rounded-[20px] px-2 py-1 text-xs font-normal leading-[14px] ${
              row.original.isVerified === "approved"
                ? "bg-[#F0FDF4] text-[#16A34A]"
                : row.original.isVerified === "pending"
                ? "bg-[#FEFCE8] text-[#CA8A04]"
                : "bg-[#FEF2F2] text-[#DC2626]"
            }`}
          >
            {row.original.isVerified}
          </span>
        </div>
      );
    },
  },
];
