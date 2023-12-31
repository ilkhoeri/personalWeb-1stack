"use client";

import * as React from "react";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { useToast } from "@/components/assets/toast/use-toast";
import { InputPassword } from "@/components/ui/input-password";
import { RequirementPsw } from "@/components/auth/requirements";
import { SignUpSchema } from "@/schemas/auth";
import { signup } from "@/auth/sign-up";
import { Attention } from "../ui/attention";
import { twMerge } from "tailwind-merge";

const SignUpForm: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [popoverOpened, setPopoverOpened] = React.useState(false);
  const [value, setValue] = React.useState("");

  const [error, setError] = React.useState<string | undefined>("");
  const [success, setSuccess] = React.useState<string | undefined>("");
  const [isPending, startTransition] = React.useTransition();

  type SignUpFormValues = z.infer<typeof SignUpSchema>;

  const signupForm = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: SignUpFormValues) => {
    setError("");
    setSuccess("");
    toast({ title: "Wait a moment...", icon: "loading" });

    startTransition(() => {
      signup(values)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
            toast({ title: error as string, icon: "error" });
          }

          if (data?.success) {
            signupForm.reset();
            router.refresh();
            setSuccess(data.success);
            toast({ title: success as string, icon: "success" });
          }
        })
        .catch(() => {
          setError("Uh Oh! Something went wrong!");
        });
    });
  };

  return (
    <Form {...signupForm}>
      <form onSubmit={signupForm.handleSubmit(onSubmit)} className="space-y-8 w-full max-w-3xl grid items-center">
        <Attention tendence="success" message={success} />
        <Attention tendence="error" message={error} />

        <FormField
          control={signupForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input disabled={isPending} autoComplete="name" placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={signupForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  autoComplete="email"
                  autoCapitalize="none"
                  type="email"
                  placeholder="Email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={signupForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <div className="w-full relative">
                <FormControl
                  onFocusCapture={() => setPopoverOpened(true)}
                  onBlurCapture={() => setPopoverOpened(false)}
                >
                  <InputPassword
                    disabled={isPending}
                    placeholder="Enter Password"
                    value={field.value ?? ""}
                    onChange={(psw) => {
                      field.onChange(psw);
                      setValue(psw.currentTarget.value);
                    }}
                  />
                </FormControl>
                {popoverOpened && RequirementPsw(value)}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={signupForm.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl aria-disabled={isPending}>
                <InputPassword disabled={isPending} placeholder="Confirm Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={isPending}
          className={twMerge("flex w-full !mt-6", isPending && "load_")}
          type="submit"
          variant="green"
        >
          Create an account
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
