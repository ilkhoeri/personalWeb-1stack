"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Address } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import { Input, inputVariants } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { twMerge } from "tailwind-merge";
import { useToast } from "@/components/assets/toast/use-toast";
import { attr } from "@/utils";
import { AddressSchema } from "@/schemas/client";

type AddressFormValues = z.infer<typeof AddressSchema>;

export type AddressType = Omit<Address, "createdAt" | "updatedAt">;

export type AddressFormType = { initialData: Address | null };

const AddressForm: React.FC<AddressFormType> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const [country, setCountry] = useState(initialData?.country || "");
  const [region, setRegion] = useState(initialData?.province || "");

  const action = initialData ? "Save" : "Create";

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(AddressSchema),
    defaultValues: initialData || {
      village: "",
      subdistrict: "",
      district: "",
      province: "",
      zipcode: "",
      country: "",
    },
  });

  const onSubmit = async (data: AddressFormValues) => {
    try {
      setLoading(true);
      toast({ title: "Wait a moment...", icon: "loading" });
      if (initialData) {
        await axios.patch(`/api/client/${params.protectId}/address/${initialData?.id}`, data);
      } else if (!initialData) {
        await axios.post(`/api/client/${params.protectId}/address`, data);
      }

      router.refresh();
    } catch (error: any) {
      toast({ title: "Uh oh! Something went wrong.", icon: "error" });
    } finally {
      setLoading(false);
      toast({ title: initialData ? "Address updated." : "Address created.", icon: "success" });
    }
  };

  attr.autoComplete = "off";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid space-y-8 w-full">
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="country">Country</FormLabel>
              <FormControl>
                <CountryDropdown
                  id="country"
                  name="country"
                  disabled={loading}
                  value={country}
                  onChange={(val) => {
                    field.onChange(val);
                    setCountry(val);
                  }}
                  classes={twMerge(
                    inputVariants(),
                    country ? "text-default" : "text-muted-foreground",
                    "cursor-pointer [&_option]:text-[16px] [&_option]:text-default first:[&_option]:text-muted-foreground scroll_",
                  )}
                  {...attr}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="province"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="province">Region / Province</FormLabel>
              <FormControl>
                <RegionDropdown
                  id="province"
                  name="province"
                  disabled={loading}
                  disableWhenEmpty={true}
                  country={country}
                  value={region}
                  onChange={(val) => {
                    field.onChange(val);
                    setRegion(val);
                  }}
                  classes={twMerge(
                    inputVariants(),
                    region ? "text-default" : "text-muted-foreground",
                    "cursor-pointer [&_option]:text-[16px] [&_option]:text-default first:[&_option]:text-muted-foreground scroll_",
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="zipcode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zipcode</FormLabel>
              <FormControl>
                <Input type="number" maxLength={5} disabled={loading} placeholder="Zipcode" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="district"
          render={({ field }) => (
            <FormItem>
              <FormLabel>District</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder="District"
                  {...field}
                  // value={district}
                  // onChange={(val) => {
                  //   field.onChange(val);
                  //   setDistrict(district);
                  // }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subdistrict"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sub District</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder="Sub District"
                  {...field}
                  // value={subdistrict}
                  // onChange={(val) => {
                  //   field.onChange(val);
                  //   setSubdistrict(subdistrict);
                  // }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="village"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Village</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder="Village"
                  {...field}
                  // value={village}
                  // onChange={(val) => {
                  //   field.onChange(val);
                  //   setVillage(village);
                  // }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={loading}
          className={twMerge("flex w-[80px] min-w-[80px]", loading && "load_")}
          type="submit"
          variant="green"
        >
          {action}
        </Button>
      </form>
    </Form>
  );
};

export default AddressForm;
