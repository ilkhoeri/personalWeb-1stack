"use client";

import { useState } from "react";
import { Socmed } from "@prisma/client";
import Image from "next/image";
import { LuBan } from "react-icons/lu";
import { Action } from "./action";
import { twMerge } from "tailwind-merge";
import { SocmedType } from "./client";

import { Input } from "@/components/ui/input";
import SocmedEdit from "./socmed-edit";

export type SocmedListProps = {
  data: SocmedType[];
  initialData: Socmed | null;
};

export const SocmedList: React.FC<SocmedListProps> = ({ data, initialData }) => {
  const [openId, setOpenId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleToggleEdit = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredData = data.filter((item) => item.siteName.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <div className={twMerge("flex items-center pt-4 pb-4")}>
        <Input
          id="search-socmed"
          name="search-socmed"
          placeholder="Search"
          autoComplete="off"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm bg-transparent"
        />
      </div>
      <div>
        {filteredData.map((data, index) => (
          <div
            key={index}
            className={twMerge(
              "relative w-full flex flex-col",
              openId === data.id
                ? "bg-background rounded-md border w-[calc(100%_+_22px)] -ml-[11px] p-[11px] pb-[17px]"
                : "",
            )}
          >
            <div
              className={twMerge(
                "first:[&_div]:mt-4 md:space-y-4 gap-5",
                openId === data.id ? "ml-auto flex" : "grid md:grid-cols-8",
              )}
            >
              {openId === data.id ? null : (
                <>
                  <div
                    className={twMerge(
                      "w-[36px] h-[36px] flex items-center justify-center relative bg-background hover:bg-muted p-0.5 select-none box-border rounded-full transition-colors duration-300  overflow-hidden",
                      data.imageUrl ? "border-[1px] border-default border-solid" : "border border-dashed",
                    )}
                  >
                    {data.imageUrl ? (
                      <Image
                        height={36}
                        width={36}
                        alt={data.siteName}
                        src={data.imageUrl}
                        className={`h-[90%] w-[90%] rounded-full !text-white flex items-center justify-center object-cover object-center`}
                      />
                    ) : (
                      <LuBan className="text-border w-full h-full min-w-[28px] min-h-[28px]" />
                    )}
                  </div>

                  <div className="md:col-span-2 py-1 px-3 bg-background rounded-md h-9 text-sm flex items-center border !select-text">
                    {data.siteName}
                  </div>
                  <div className="md:col-span-4 py-1 px-3 bg-background rounded-md h-9 text-sm flex items-center border !select-text">
                    {data.siteUrl}
                  </div>
                </>
              )}

              <Action
                data={data}
                setOnEdit={() => handleToggleEdit(data.id)}
                onEdit={openId === data.id}
                classNames={{
                  trigger: openId ? "" : "max-md:absolute max-md:right-[1px] max-md:top-3 max-md:z-10",
                }}
              />
            </div>
            {openId === data.id && (
              <SocmedEdit data={data} initialData={initialData} setOpenId={() => setOpenId(null)} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
