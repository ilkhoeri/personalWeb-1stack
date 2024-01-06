"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { verification } from "@/auth/verification";
import { Attention } from "../ui/attention";

export const VerificationForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    verification(token)
      .then((data) => {
        if (data?.error) {
          setError(data.error);
        }

        if (data?.success) {
          router.push("/auth/sign-in");
          router.refresh();
          setSuccess(data.success);
        }
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, success, error, router]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <>
      {!success && !error && <p className="w-full h-12 text-center">Load...</p>}
      <Attention tendence="success" message={success} />
      {!success && <Attention tendence="error" message={error} />}
    </>
  );
};
