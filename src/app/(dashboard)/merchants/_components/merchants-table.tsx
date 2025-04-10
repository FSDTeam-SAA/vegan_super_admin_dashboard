"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import ErrorState from "@/components/ui/error-state";
import VeganPagination from "@/components/ui/vegan-pagination";
import VeganSelector from "@/components/ui/vegan-selector";
import { countries } from "@/data/countries";
import { DropDownItem } from "@/types";
import { MerchantProfile, MerchantProfileResponse } from "@/types/merchant";
import { useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { merchantColumns } from "./merchant-column";

const MerchantTables = () => {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const countriesList = countries.map((country, i) => ({
    id: i + 1,
    name: country.label,
    value: country.value,
  })) as DropDownItem[];

  const states = countries
    .find((c) => c.value === country)
    ?.states?.map((state, i) => ({
      id: i + 1,
      name: state.label,
      value: state.value,
    })) as DropDownItem[];

  const cities = countries
    .find((c) => c.value === country)
    ?.states?.find((s) => s.value === state)
    ?.cites?.map((city, i) => ({
      id: i + 1,
      name: city.label,
      value: city.value,
    })) as DropDownItem[];

  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useQuery<MerchantProfileResponse>({
    queryKey: ["merchants", country, state, city, currentPage],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/superadmin/getAllMerchants?country=${country}&state=${state}&city=${city}&page=${currentPage}&limit=1`
      ).then((res) => res.json()),
  });

  let content;

  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isError) {
    content = <ErrorState message={error.message} />;
  } else if (response) {
    content = (
      <div>
        <div className="flex items-center gap-5">
          <div>
            <VeganSelector
              list={countriesList}
              onValueChange={(value) => setCountry(value)}
              selectedValue={country}
              placeholder="Select Country"
            />
          </div>

          {country && (
            <div className="flex items-center gap-2">
              <VeganSelector
                list={states}
                onValueChange={(value) => setState(value)}
                selectedValue={state}
                placeholder="Select State"
              />
            </div>
          )}
          {state && (
            <div className="flex items-center gap-2">
              <VeganSelector
                list={cities}
                onValueChange={(value) => setCity(value)}
                selectedValue={city}
                placeholder="Select City"
              />
            </div>
          )}

          <Button
            variant="outline"
            onClick={() => {
              setCountry("");
              setState("");
              setCity("");
            }}
          >
            Reset
          </Button>
        </div>
        <TableContainer data={response.data ?? []} columns={merchantColumns} />

        <div className="mt-5 flex items-center justify-center">
          <VeganPagination
            currentPage={currentPage}
            totalPages={response.meta.totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    );
  }

  return content;
};

export default MerchantTables;

interface Props {
  data: MerchantProfile[]; // Replace 'any' with the actual type of your data
  columns: ColumnDef<MerchantProfile>[]; // Replace 'any' with the actual type of your columns
}

const TableContainer = ({ data, columns }: Props) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div>
      <div className="flex justify-between items-center py-4">
        {/* <DataTableViewOptions table={table} /> */}
      </div>
      <DataTable columns={columns} table={table} />
      {/* {data?.length > 10 && (
          <div className="mt-4">
            <DataTablePagination table={table} />
          </div>
        )} */}
    </div>
  );
};
