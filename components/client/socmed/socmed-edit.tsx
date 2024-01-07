"use client";

import * as z from "zod";
import axios from "axios";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Socmed } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/components/assets/toast/use-toast";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AlertModal } from "@/components/assets/modals/alert-modal";
import { IconUpload } from "@/components/ui/uploads/icon-upload";

import { SocmedType } from "./client";
import { twMerge } from "tailwind-merge";

const formSchema = z.object({
  siteName: z.string().min(1),
  siteUrl: z
    .string()
    .min(13)
    .refine((data) => data.startsWith("https://"), {
      message: 'link must start with "https://"',
    }),
  imageUrl: z.string().min(0).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export type SocmedEditType = {
  data: SocmedType;
  initialData: Socmed | null;

  setOpenId: (value: React.SetStateAction<string | null>) => void;
};

const SocmedEdit: React.FC<SocmedEditType> = ({ data, initialData, setOpenId }) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      siteName: data.siteName,
      siteUrl: data.siteUrl,
      imageUrl: data.imageUrl,
    },
  });

  const onDelete = async () => {
    try {
      setLoading(true);
      toast({
        title: `${data.siteName} deleted.`,
        icon: "loading",
        duration: 999999,
      });
      await axios.delete(`/api/client/${params.protectId}/socmed/${data.id}`);
      router.refresh();
    } catch (error: any) {
      toast({
        title: "Uh oh! Something went wrong.",
        icon: "error",
      });
    } finally {
      setOpen(false);
      setLoading(false);
      router.refresh();
      toast({
        title: `Deleted successfully.`,
        icon: "success",
        duration: 1500,
      });
    }
  };

  const onSubmit = async () => {
    try {
      const formData = form.getValues();
      setLoading(true);
      toast({
        title: data ? `Saving ${data.siteName}...` : "Saving...",
        icon: "loading",
        duration: 999999,
      });
      await axios.patch(`/api/client/${params.protectId}/socmed/${data.id}`, formData);
      router.refresh();
    } catch (error: any) {
      toast({
        title: "Uh oh! Something went wrong.",
        icon: "error",
      });
    } finally {
      setLoading(false);
      setOpenId(null);
      form.reset();
      toast({
        title: data ? `${data.siteName} updated.` : "Socmed created.",
        icon: "success",
        duration: 1500,
      });
    }
  };

  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} />

      <Form {...form}>
        <div className="w-full flex flex-col md:grid md:grid-flow-row gap-5">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel></FormLabel>
                <FormControl>
                  <IconUpload
                    name="imageUrl"
                    loading={loading}
                    value={field.value ? field.value : data.imageUrl}
                    onChange={(image) => field.onChange(image)}
                    classNames={{
                      root: "w-[68px] h-[68px] mt-0 [--padding:0px] p-0",
                      wrapper: `p-2 ${
                        data.imageUrl ? "border-[1px] border-default border-solid" : "border border-dashed"
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

          <div className="w-full flex items-center justify-between gap-5 overflow-x-auto md:mt-4 scroll_ [--scroll-sz:0px]">
            <Button
              disabled={loading}
              onClick={() => setOpenId(null)}
              className="ml-auto bg-black dark:bg-white text-white dark:text-black border-[1px] border-transparent"
            >
              Cancel
            </Button>

            <Button
              disabled={loading}
              variant="red"
              onClick={() => setOpen(true)}
              className="border-[1px] border-transparent"
            >
              Delete
            </Button>

            <Button
              disabled={loading}
              onClick={form.handleSubmit(onSubmit)}
              className={twMerge(
                "flex w-[80px] min-w-[80px] !my-0 border-[1px] border-transparent",
                loading && "load_",
              )}
              type="button"
              variant="green"
            >
              Save
            </Button>
          </div>
        </div>
      </Form>
    </>
  );
};

export default SocmedEdit;
