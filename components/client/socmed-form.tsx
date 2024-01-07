"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Socmed } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/components/assets/toast/use-toast";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { IconUpload } from "@/components/ui/uploads/icon-upload";
import { SocmedSchema } from "@/schemas/client";
import { twMerge } from "tailwind-merge";

type FormValues = z.infer<typeof SocmedSchema>;

export interface FormProps {
  initialData: Socmed | null;
}

interface FormStateProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

export const SocmedForm: React.FC<FormProps & FormStateProps> = ({ initialData, setOpen, open }) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const toastMessage = initialData ? `${initialData.siteName} updated.` : "Socmed created.";
  const action = initialData ? "Save" : "Add";

  const form = useForm<FormValues>({
    resolver: zodResolver(SocmedSchema),
    defaultValues: initialData || {
      siteName: "",
      siteUrl: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      toast({
        title: initialData ? `Saving ${initialData.siteName}...` : "Saving...",
        icon: "loading",
        duration: 999999,
      });
      if (initialData) {
        await axios.patch(`/api/client/${params.protectId}/socmed/${params.socmedId}`, data);
      } else {
        await axios.post(`/api/client/${params.protectId}/socmed`, data);
      }
      router.refresh();
      params.socmedId && router.push(`/${params.protectId}/settings/social-media`);
    } catch (error: any) {
      toast({
        title: "Uh oh! Something went wrong.",
        icon: "error",
      });
    } finally {
      setLoading(false);
      setOpen(false);
      form.reset();
      router.refresh();
      toast({
        title: initialData ? `${initialData.siteName} updated.` : "Socmed created.",
        icon: "success",
        duration: 1500,
      });
    }
  };

  return (
    open && (
      <Form {...form}>
        <form
          tabIndex={-1}
          aria-hidden="true"
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[calc(100%_+_22px)] -ml-[11px] px-4 py-6 space-y-8 gap-5 bg-background rounded-md border"
        >
          <div className="grid grid-flow-row gap-5 relative ">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormControl>
                    <IconUpload
                      name="imageUrl"
                      loading={loading}
                      value={field.value ? field.value : ""}
                      onChange={(url) => field.onChange(url)}
                      classNames={{
                        root: "w-[68px] h-[68px] mt-0 [--padding:0px] p-0",
                        wrapper: `p-2 ${
                          field.value ? "border-[1px] border-default border-solid" : "border border-dashed"
                        }`,
                        inner: "p-0 w-[90%] h-[90%]",
                        image: "bg-background",
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-8 gap-5">
              <FormField
                control={form.control}
                name="siteName"
                render={({ field }) => (
                  <FormItem className="md:col-span-3">
                    <FormLabel></FormLabel>
                    <FormControl>
                      <Input aria-disabled={loading} placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="siteUrl"
                render={({ field }) => (
                  <FormItem className="md:col-span-5">
                    <FormLabel></FormLabel>
                    <FormControl>
                      <Input aria-disabled={loading} placeholder="https://" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full flex items-center gap-5">
              <Button
                disabled={loading}
                onClick={() => setOpen(false)}
                className="ml-auto w-[82px] min-w-[82px] bg-black dark:bg-white text-white dark:text-black border-[1px] border-transparent"
              >
                Cancel
              </Button>

              <Button
                disabled={loading}
                className={twMerge("flex w-[82px] min-w-[82px] border-[1px] border-transparent", loading && "load_")}
                type="submit"
                variant="green"
              >
                {action}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    )
  );
};
