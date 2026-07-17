"use client";

import InputField from "@/components/global/form-field/input-field";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import {
  AuthFormHeader,
  AuthSecurityNote,
  authFieldClassName,
} from "@/features/auth/components/auth-form-elements";
import { useResetPasswordMutation } from "@/features/auth/queries/auth.mutations";
import type { IResetPayload } from "@/features/auth/validators/reset.validator";
import { resetZodSchema } from "@/features/auth/validators/reset.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound, LoaderCircle, LockKeyhole, Mail, RefreshCw, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

export default function ResetPasswordForm() {
  const params = useSearchParams();
  const prefillEmail = params.get("email") || "";
  const mutation = useResetPasswordMutation();
  const form = useForm<IResetPayload>({
    mode: "onTouched",
    resolver: zodResolver(resetZodSchema),
    defaultValues: { email: prefillEmail, otp: "", newPassword: "", confirmPassword: "" },
  });

  async function onSubmit(values: IResetPayload) {
    try {
      await mutation.mutateAsync({ email: values.email, otp: values.otp, newPassword: values.newPassword });
    } catch {
      // Mutation callbacks own user-facing error handling.
    }
  }

  return (
    <div>
      <AuthFormHeader
        icon={RefreshCw}
        eyebrow="Secure reset"
        title="Choose a new password."
        description="Use the one-time code from your email, then create a password you have not used before."
      />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <FieldGroup className="gap-4">
            <InputField
              className={authFieldClassName}
              name="email"
              label="Account email"
              placeholder="you@example.com"
              type="email"
              startIcon={Mail}
              autoComplete="email"
              requiredMark
            />
            <InputField
              className={`${authFieldClassName} [&_[data-slot=input-group]]:h-14`}
              inputClassName="text-center font-mono text-lg font-bold"
              name="otp"
              label="One-time code"
              placeholder="000000"
              startIcon={ShieldCheck}
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              requiredMark
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <InputField
                className={authFieldClassName}
                name="newPassword"
                label="New password"
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
          </FieldGroup>

          <Button type="submit" size="lg" disabled={form.formState.isSubmitting} className="mt-6 h-12 w-full rounded-lg text-sm font-bold">
            {form.formState.isSubmitting ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : <KeyRound className="size-4" aria-hidden="true" />}
            {form.formState.isSubmitting ? "Updating password…" : "Update password"}
          </Button>
        </form>
      </FormProvider>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Need another code? <Link href="/forgot-password" className="font-bold text-primary hover:underline">Request a new one</Link>
      </p>

      <AuthSecurityNote>
        A successful reset signs out old sessions and returns you to secure sign-in.
      </AuthSecurityNote>
    </div>
  );
}
