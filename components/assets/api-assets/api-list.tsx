"use client";

import { ApiAlert, type ClassAlertType } from "./api-alert";
import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";

interface ApiListProps extends ClassAlertType {
  entityName: string;
  entityIdName: string;
}

export const ApiList: React.FC<ApiListProps> = ({ entityName, entityIdName, classNames }) => {
  const params = useParams();
  const origin = useOrigin();

  const baseUrl = `${origin}/api/client/${params.protectId}`;

  return (
    <>
      <ApiAlert title="GET" variant="public" classNames={classNames} description={`${baseUrl}/${entityName}`} />

      <ApiAlert
        title="GET ID"
        variant="public"
        classNames={classNames}
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />

      <ApiAlert title="POST" variant="admin" classNames={classNames} description={`${baseUrl}/${entityName}`} />

      <ApiAlert
        title="PATCH"
        variant="admin"
        classNames={classNames}
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />

      <ApiAlert
        title="DELETE"
        variant="admin"
        classNames={classNames}
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
    </>
  );
};
