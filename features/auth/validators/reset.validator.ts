import { z } from "zod";

export const resetZodSchema = z
  .object({
    email: z.string().email("Enter a valid email address"),
    otp: z.string().min(1, "One-time code is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Confirm your new password"),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type IResetPayload = z.infer<typeof resetZodSchema>;
