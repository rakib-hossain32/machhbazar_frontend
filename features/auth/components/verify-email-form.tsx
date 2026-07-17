"use client";

import InputField from "@/components/global/form-field/input-field";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import {
  AuthFormHeader,
  AuthSecurityNote,
  authFieldClassName,
} from "@/features/auth/components/auth-form-elements";
import { useResendOTPMutation, useVerifyEmailMutation } from "@/features/auth/queries/auth.mutations";
import { verifyZodSchema } from "@/features/auth/validators/verify.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, LoaderCircle, Mail, MailCheck, RotateCw, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

type VerifyValues = { email: string; otp: string };

export default function VerifyEmailForm() {
  const mutation = useVerifyEmailMutation();
  const resendMutation = useResendOTPMutation();
  const params = useSearchParams();
  const prefillEmail = params.get("email") || "";
  const form = useForm<VerifyValues>({
    mode: "onTouched",
    resolver: zodResolver(verifyZodSchema),
    defaultValues: { email: prefillEmail, otp: "" },
  });

  async function onSubmit(values: VerifyValues) {
    try {
      await mutation.mutateAsync(values);
    } catch {
      // Mutation callbacks own user-facing error handling.
    }
  }

  async function resend() {
    const email = form.getValues("email") || prefillEmail;
    if (!email) {
      toast.error("Enter your email before requesting another code.");
      return;
    }
    try {
      await resendMutation.mutateAsync({ email });
    } catch {
      // Mutation callbacks own user-facing error handling.
    }
  }

  return (
    <div>
      <AuthFormHeader
        icon={MailCheck}
        eyebrow="Email verification"
        title="Confirm it’s really you."
        description="Enter the one-time code we sent to activate your account and protect future orders."
      />

      {prefillEmail ? (
        <div className="mb-6 flex items-center gap-3 rounded-lg border border-primary/18 bg-primary-soft p-4">
          <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground"><Mail className="size-4" /></span>
          <div className="min-w-0">
            <p className="text-[10px] font-bold text-muted-foreground uppercase">Code sent to</p>
            <p className="truncate text-sm font-bold text-ink">{prefillEmail}</p>
          </div>
          <CheckCircle2 className="ml-auto size-5 shrink-0 text-primary" aria-hidden="true" />
        </div>
      ) : null}

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <FieldGroup className="gap-4">
            {!prefillEmail ? (
              <InputField
                className={authFieldClassName}
                name="email"
                label="Account email"
                type="email"
                placeholder="you@example.com"
                startIcon={Mail}
                autoComplete="email"
                requiredMark
              />
            ) : null}
            <InputField
              className={`${authFieldClassName} [&_[data-slot=input-group]]:h-16`}
              inputClassName="text-center font-mono text-xl font-bold"
              name="otp"
              label="Six-digit verification code"
              placeholder="000000"
              startIcon={ShieldCheck}
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              requiredMark
            />
          </FieldGroup>

          <Button type="submit" size="lg" disabled={form.formState.isSubmitting} className="mt-6 h-12 w-full rounded-lg text-sm font-bold">
            {form.formState.isSubmitting ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : <CheckCircle2 className="size-4" aria-hidden="true" />}
            {form.formState.isSubmitting ? "Verifying email…" : "Verify and continue"}
          </Button>

          <Button type="button" variant="outline" size="lg" onClick={resend} disabled={resendMutation.isPending} className="mt-3 h-12 w-full rounded-lg bg-surface text-sm font-bold">
            <RotateCw className={`size-4 ${resendMutation.isPending ? "animate-spin" : ""}`} aria-hidden="true" />
            {resendMutation.isPending ? "Sending another code…" : "Resend verification code"}
          </Button>
        </form>
      </FormProvider>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already verified? <Link href="/login" className="font-bold text-primary hover:underline">Sign in</Link>
      </p>

      <AuthSecurityNote>
        Verification connects this email to your private account; it is never shown on public trace pages.
      </AuthSecurityNote>
    </div>
  );
}
