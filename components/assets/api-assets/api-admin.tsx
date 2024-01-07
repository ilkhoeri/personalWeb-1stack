"use client";

import { useParams } from "next/navigation";
import { ApiAlert, type ClassAlertType } from "./api-alert";
import { useOrigin } from "@/hooks/use-origin";

type APIAdminProps = ClassAlertType & {};

export const APIAdmin: React.FC<APIAdminProps> = ({ classNames }) => {
  const params = useParams();
  const origin = useOrigin();

  return (
    <ApiAlert
      classNames={classNames}
      title="NEXT_PUBLIC_API_URL"
      variant="public"
      description={`NEXT_PUBLIC_API_URL=${origin}/api/client/${params.protectId}`}
    />
  );
};
