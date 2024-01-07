import { APIAdmin } from "@/components/assets/api-assets/api-admin";
import { APICalls } from "@/components/assets/api-assets/api-calls";
import { DataTable } from "@/components/assets/table/data-table";
import AddressForm from "@/components/client/address-form";
import { ParamsColumn, paramsColumns } from "@/components/client/params/columns";
import { SocMedClient, SocmedType } from "@/components/client/socmed/client";
import Separator from "@/components/ui/separator";
import db from "@/lib/db";
import { capitalizeWords } from "@/utils";
import { notFound } from "next/navigation";

enum profileId {
  address,
  "list-api",
  "add-params",
  "social-media",
}

type PageProps = {
  params: { protectId: string; profileId: profileId };
};

export async function generateMetadata({ params }: PageProps) {
  return {
    title: capitalizeWords(String(params.profileId)).slice(0, 45),
    openGraph: {
      title: params.profileId,
      description: params.profileId,
    },
  };
}

export default async function Page({ params }: PageProps) {
  if (!(params.profileId in profileId)) {
    notFound();
  }

  // address
  const addressForm = await db.address.findFirst({
    where: {
      userId: params.protectId,
    },
  });

  // social-media
  const socmeds = await db.socmed.findMany({
    where: {
      userId: params.protectId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const dataSocMed: SocmedType[] = socmeds.map((item) => ({
    id: item.id,
    siteName: item.siteName,
    siteUrl: item.siteUrl,
    imageUrl: item.imageUrl,
  }));
  const socmedForm = await db.socmed.findUnique({
    where: {
      id: String(params.protectId),
    },
  });

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
    <>
      {String(params.profileId) === "address" && <AddressForm initialData={addressForm} />}

      {String(params.profileId) === "social-media" && <SocMedClient data={dataSocMed} initialData={socmedForm} />}

      {String(params.profileId) === "add-params" && (
        <DataTable
          searchKey="slug"
          columns={paramsColumns}
          data={formattedParams}
          addNew={{ toPath: "/settings/profile/add-params/new" }}
          classNames={{ table: "[--max-w-secondary:300px]" }}
        />
      )}

      {String(params.profileId) === "list-api" && (
        <>
          <APIAdmin classNames={{ alert: "lg:w-[calc(100%_+_150px)]" }} />

          <Separator className="!mt-14 !mb-9 lg:w-[calc(100%_+_150px)]" />
          <APICalls entityName="address" entityIdName="addressId" classNames={{ alert: "lg:w-[calc(100%_+_150px)]" }} />

          <Separator className="!mt-14 !mb-9 lg:w-[calc(100%_+_150px)]" />
          <APICalls entityName="socmed" entityIdName="socmedId" classNames={{ alert: "lg:w-[calc(100%_+_150px)]" }} />

          <Separator className="!mt-14 !mb-9 lg:w-[calc(100%_+_150px)]" />
          <APICalls entityName="params" entityIdName="paramsId" classNames={{ alert: "lg:w-[calc(100%_+_150px)]" }} />
        </>
      )}
    </>
  );
}
