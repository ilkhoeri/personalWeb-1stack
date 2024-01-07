"use client";

import * as React from "react";
import * as z from "zod";

import Link from "next/link";
import { useSearchParams, useRouter, useParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { useToast } from "@/components/assets/toast/use-toast";
import { InputPassword } from "@/components/ui/input-password";
import { RequirementPsw } from "@/components/auth/requirements";
import { SignInSchema } from "@/schemas/auth";
import { signin } from "@/auth/sign-in";
import { Attention } from "../ui/attention";
import { twMerge } from "tailwind-merge";

// const signinSchema = z.object({
//   email: z.string().min(7),
//   password: passwordSchema(passwordMessage),
// });

const SignInForm: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  const callbackUrl = searchParams.get("callbackUrl");
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use with different provider!" : "";

  const [loading, setLoading] = React.useState(false);
  const [popoverOpened, setPopoverOpened] = React.useState(false);
  const [value, setValue] = React.useState("");

  const [showTwoFactor, setShowTwoFactor] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>("");
  const [success, setSuccess] = React.useState<string | undefined>("");
  const [isPending, startTransition] = React.useTransition();

  type SignInFormValues = z.infer<typeof SignInSchema>;

  const signinForm = useForm<SignInFormValues>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: SignInFormValues) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      setLoading(true);
      toast({ title: "Wait a moment...", icon: "loading" });
      signin(values, callbackUrl)
        .then((data) => {
          setLoading(false);

          if (data?.error) {
            // signinForm.reset();
            setError(data.error);
            toast({ title: error || undefined, description: urlError || undefined, icon: "error" });
          }

          if (data?.success) {
            signinForm.reset();
            setSuccess(data.success);
            toast({ title: "Sign in success!", icon: "success" });
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError("Uh Oh! Something went wrong!"));
    });
  };

  return (
    <Form {...signinForm}>
      <form onSubmit={signinForm.handleSubmit(onSubmit)} className="space-y-8 w-full max-w-3xl grid items-center">
        <Attention tendence="success" message={success} />
        <Attention tendence="error" message={error || urlError} />

        {showTwoFactor ? (
          <FormField
            control={signinForm.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Two Factor Code</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} placeholder="⁕⁕⁕⁕⁕⁕⁕⁕" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <React.Fragment>
            <FormField
              control={signinForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
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
              control={signinForm.control}
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
                        disabled={loading}
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

            <Link
              tabIndex={-1}
              aria-label="Forgot password?"
              title="Forgot password?"
              href="/auth/reset"
              className="py-1 px-2 text-[14px] text-color font-medium leading-none max-w-max select-none focus-visible:outline-0 hover:underline"
            >
              Forgot password?
            </Link>
          </React.Fragment>
        )}

        <Button
          disabled={isPending}
          className={twMerge("flex w-full !mt-6", isPending && "load_")}
          type="submit"
          variant="green"
        >
          {showTwoFactor ? "Confirm" : "Login"}
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
