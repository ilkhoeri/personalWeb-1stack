"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useState } from "react";
// import { useRouter } from 'next/navigation';

import { Modal } from "@/components/assets/modals/modal";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Button } from "@/components/ui/button";
import { SettingsUserSchema } from "@/schemas";

export const StoreModal = () => {
  const storeModal = useStoreModal();
  // const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof SettingsUserSchema>>({
    resolver: zodResolver(SettingsUserSchema),
    defaultValues: {
      name: "",
      image: "",
      birth: new Date(),
      email: "",
      phone: "",
      bio: "",
      resume: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SettingsUserSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/stores", values);
      window.location.assign(`/${response.data.id}`);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      disabled={loading}
      title="Create store"
      description="Add a new store to manage products and categories."
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
      classNames={{ title: "text-[#47b7f8]" }}
      icon={
        <svg width="64" height="64" className="text-[#47b7f8]">
          <use href="icons-cloud.svg#deploy-request-xl" />
        </svg>
      }
    >
      <div className="space-y-4 py-2 pb-4">
        <div className="space-y-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="Name store" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button disabled={loading} variant="outline" onClick={storeModal.onClose}>
                  Cancel
                </Button>
                <Button disabled={loading} type="submit" className="w-[96px] min-w-[96px]" variant="green">
                  {loading ? "Load..." : "Continue"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
