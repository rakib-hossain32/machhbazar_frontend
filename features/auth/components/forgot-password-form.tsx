"use client";

import InputField from "@/components/global/form-field/input-field";
import { Button } from "@/components/ui/button";
import {
  AuthFormHeader,
  AuthSecurityNote,
  authFieldClassName,
} from "@/features/auth/components/auth-form-elements";
import { useForgotPasswordMutation } from "@/features/auth/queries/auth.mutations";
import { forgotZodSchema } from "@/features/auth/validators/forgot.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Clock3, KeyRound, LoaderCircle, Mail, Send } from "lucide-react";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";

type ForgotValues = { email: string };

export default function ForgotPasswordForm() {
  const mutation = useForgotPasswordMutation();
  const form = useForm<ForgotValues>({
    mode: "onTouched",
    resolver: zodResolver(forgotZodSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: ForgotValues) {
    try {
      await mutation.mutateAsync(values);
    } catch {
      // Mutation callbacks own user-facing error handling.
    }
  }

  return (
    <div>
      <AuthFormHeader
        icon={KeyRound}
        eyebrow="Account recovery"
        title="Let’s get you back in."
        description="Enter the email connected to your account. We will send a one-time code to reset your password."
      />

      <div className="mb-6 flex items-start gap-3 rounded-lg border border-primary/18 bg-primary-soft p-4 text-xs leading-5 text-muted-foreground">
        <Clock3 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
        <p>The code normally arrives within a minute and can only be used once.</p>
      </div>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
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

          <Button type="submit" size="lg" disabled={form.formState.isSubmitting} className="mt-6 h-12 w-full rounded-lg text-sm font-bold">
            {form.formState.isSubmitting ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : <Send className="size-4" aria-hidden="true" />}
            {form.formState.isSubmitting ? "Sending code…" : "Send reset code"}
          </Button>
        </form>
      </FormProvider>

      <Link href="/login" className="group mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary">
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" /> Back to sign in
      </Link>

      <AuthSecurityNote>
        For your privacy, the recovery screen shows the same response whether or not an email is registered.
      </AuthSecurityNote>
    </div>
  );
}
