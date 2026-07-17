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
import { useRegisterMutation } from "@/features/auth/queries/auth.mutations";
import type { IRegisterPayload } from "@/features/auth/validators/register.validator";
import { registerZodSchema } from "@/features/auth/validators/register.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, LockKeyhole, Mail, UserPlus, UserRound } from "lucide-react";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import SocialLoginButtons from "./social-login-buttons";

export default function RegisterForm() {
  const mutation = useRegisterMutation();
  const form = useForm<IRegisterPayload>({
    mode: "onTouched",
    resolver: zodResolver(registerZodSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false,
    },
  });

  async function onSubmit(values: IRegisterPayload) {
    try {
      await mutation.mutateAsync({ name: values.name, email: values.email, password: values.password });
    } catch {
      // Mutation callbacks own user-facing error handling.
    }
  }

  return (
    <div>
      <AuthFormHeader
        icon={UserPlus}
        eyebrow="New customer"
        title="Start with a trusted catch."
        description="Create your account to save fish, track traceable orders, and buy from verified sellers."
      />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <FieldGroup className="gap-4">
            <InputField
              className={authFieldClassName}
              name="name"
              label="Full name"
              placeholder="Your full name"
              startIcon={UserRound}
              autoComplete="name"
              requiredMark
            />
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
            <div className="grid gap-4 sm:grid-cols-2">
              <InputField
                className={authFieldClassName}
                name="password"
                label="Password"
                placeholder="Minimum 8 characters"
                type="password"
                startIcon={LockKeyhole}
                autoComplete="new-password"
                requiredMark
              />
              <InputField
                className={authFieldClassName}
                name="confirmPassword"
                label="Confirm password"
                placeholder="Repeat password"
                type="password"
                startIcon={LockKeyhole}
                autoComplete="new-password"
                requiredMark
              />
            </div>
            <InputField
              name="termsAccepted"
              type="checkbox"
              className="mt-1 [&_[data-slot=field-label]]:items-start [&_[data-slot=field-label]]:text-xs [&_[data-slot=field-label]]:leading-5"
              label={
                <span>
                  I agree to the <Link href="/policies/terms" className="font-bold text-primary hover:underline">Terms</Link> and <Link href="/policies/privacy" className="font-bold text-primary hover:underline">Privacy Policy</Link>.
                </span>
              }
            />
          </FieldGroup>

          <Button type="submit" size="lg" disabled={form.formState.isSubmitting} className="mt-6 h-12 w-full rounded-lg text-sm font-bold">
            {form.formState.isSubmitting ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : <UserPlus className="size-4" aria-hidden="true" />}
            {form.formState.isSubmitting ? "Creating account…" : "Create secure account"}
          </Button>

          <AuthDivider />
          <SocialLoginButtons />
        </form>
      </FormProvider>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-bold text-primary hover:underline hover:underline-offset-4">Sign in</Link>
      </p>

      <AuthSecurityNote>
        Your account keeps private order details separate from public catch trace records.
      </AuthSecurityNote>
    </div>
  );
}
