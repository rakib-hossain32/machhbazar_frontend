"use client";

import InputField from "@/components/global/form-field/input-field";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import {
  AuthDivider,
  AuthFormHeader,
  AuthSecurityNote,
  authFieldClassName,
} from "@/features/auth/components/auth-form-elements";
import { useLoginMutation } from "@/features/auth/queries/auth.mutations";
import type { ILoginPayload } from "@/features/auth/validators/login.validator";
import { loginZodSchema } from "@/features/auth/validators/login.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, LockKeyhole, LogIn, Mail } from "lucide-react";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import SocialLoginButtons from "./social-login-buttons";

export default function LoginForm({ searchParams }: { searchParams?: { redirect?: string } }) {
  const mutation = useLoginMutation();
  const redirectPath = searchParams?.redirect || "";

  const form = useForm<ILoginPayload & { redirectPath?: string }>({
    mode: "onTouched",
    resolver: zodResolver(loginZodSchema),
    defaultValues: { email: "", password: "", redirectPath },
  });

  async function onSubmit(values: ILoginPayload & { redirectPath?: string }) {
    try {
      await mutation.mutateAsync({
        email: values.email,
        password: values.password,
        redirectPath: values.redirectPath,
      });
    } catch {
      // Mutation callbacks own user-facing error handling.
    }
  }

  return (
    <div>
      <AuthFormHeader
        icon={LogIn}
        eyebrow="Customer account"
        title="Welcome back."
        description="Sign in to continue to your orders, saved catches, and verified seller network."
      />

      <FormProvider {...form}>
        <form id="login-form" onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <FieldGroup>
            <InputField
              className={authFieldClassName}
              name="email"
              label="Email address"
              placeholder="you@example.com"
              type="email"
              startIcon={Mail}
              autoComplete="email"
              requiredMark
            />
            <InputField
              className={authFieldClassName}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
              startIcon={LockKeyhole}
              autoComplete="current-password"
              requiredMark
            />
          </FieldGroup>

          <div className="mt-3 flex justify-end">
            <Link href="/forgot-password" className="text-xs font-bold text-primary hover:underline hover:underline-offset-4">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" size="lg" disabled={form.formState.isSubmitting} className="mt-6 h-12 w-full rounded-lg text-sm font-bold">
            {form.formState.isSubmitting ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : <LogIn className="size-4" aria-hidden="true" />}
            {form.formState.isSubmitting ? "Signing in…" : "Sign in securely"}
          </Button>

          <AuthDivider />
          <SocialLoginButtons />
        </form>
      </FormProvider>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        New to Machh Bazar?{" "}
        <Link href="/register" className="font-bold text-primary hover:underline hover:underline-offset-4">Create an account</Link>
      </p>

      <AuthSecurityNote>
        We never ask for your password outside this secure sign-in page.
      </AuthSecurityNote>
    </div>
  );
}
