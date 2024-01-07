import { DataTable } from "@/components/assets/table/data-table";
import { ParamsColumn, paramsColumns } from "@/components/client/params/columns";
import db from "@/lib/db";
import { Metadata } from "next";
type PageProps = {
  params: { protectId: string };
};

export const metadata: Metadata = {
  title: "Params",
  description: "Add new params - frontend",
};

export default async function Page({ params }: PageProps) {
  // add-params
  const paramsData = await db.params.findMany({
    where: {
      userId: params.protectId,
    },
    include: {
      sections: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedParams: ParamsColumn[] = paramsData.map((item) => ({
    id: item.id,
    slug: item.slug,
    heading: item.heading,
    sections: item.sections.length > 0 ? item.sections[0].node : "",
    markHead: item.markHead,
    notes: item.notes,
    createdAt: item.createdAt.toLocaleString("id-ID", {
      day: "2-digit",
      year: "numeric",
      month: "short",
    }),
    isNew: item.isNew,
  }));

  return (
    <DataTable
      searchKey="slug"
      columns={paramsColumns}
      data={formattedParams}
      addNew={{ toPath: "/settings/params/new" }}
      classNames={{ table: "[--max-w-secondary:300px]" }}
    />
  );
}
