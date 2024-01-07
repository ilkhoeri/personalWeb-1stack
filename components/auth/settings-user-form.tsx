"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";
import { useSession } from "next-auth/react";

import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Attention } from "@/components/ui/attention";
import ImageUploadProfile from "@/components/ui/uploads/image-upload-profile";
import ImageUploadProfileModal from "@/components/ui/uploads/image-upload-profile-modal";

import { Form, FormField, FormControl, FormItem, FormLabel, FormDescription, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { settings } from "@/auth/settings";
import { UserRole } from "@prisma/client";
import { SettingsSchema } from "@/schemas/auth";

import { useRouter } from "next/navigation";
import { Session } from "next-auth/types";
import { twMerge } from "tailwind-merge";

const SettingsUserForm: React.FC<{ user: Session | null }> = ({ user }) => {
  const router = useRouter();

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  type SettingsFormValues = z.infer<typeof SettingsSchema>;

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.user.name || undefined,
      email: user?.user.email || undefined,
      image: user?.user.image || undefined,
      password: undefined,
      newPassword: undefined,
      role: user?.user.role || "USER",
      isTwoFactorEnabled: user?.user.isTwoFactorEnabled || false,
    },
  });

  const onSubmit = (values: SettingsFormValues) => {
    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }

          if (data.success) {
            update();
            setOpen(false);
            router.refresh();
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  return (
    <Form {...form}>
      <form
        className="w-full space-y-6 [&_label]:hidden [&_label]:[visibility:hidden]"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Attention tendence="success" message={success} />
        <Attention tendence="error" message={error} />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem aria-disabled={isPending}>
              <FormControl aria-disabled={isPending}>
                <ImageUploadProfile
                  name="image"
                  button="edit"
                  disabled={isPending}
                  value={field.value ?? ""}
                  onChange={(url) => field.onChange(url)}
                  openModal={() => setOpen(true)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ImageUploadProfileModal
          isOpen={open}
          loading={isPending}
          onClose={() => {
            setOpen(false);
          }}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input autoComplete="name" placeholder="Name" disabled={isPending} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {user?.user.isOAuth === false && (
          <>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input autoComplete="email" placeholder="Email" type="email" disabled={isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password" disabled={isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input placeholder="New Password" type="password" disabled={isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select name="role" disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                  <SelectItem value={UserRole.USER}>User</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {user?.user.isOAuth === false && (
          <FormField
            control={form.control}
            name="isTwoFactorEnabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Two Factor Authentication</FormLabel>
                  <FormDescription>Enable two factor authentication for your account</FormDescription>
                </div>
                <FormControl>
                  <Switch
                    name="isTwoFactorEnabled"
                    disabled={isPending}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        )}

        <Button disabled={isPending} className={twMerge(isPending && "load_")} type="submit">
          Save
        </Button>
      </form>
    </Form>
  );
};

export default SettingsUserForm;
