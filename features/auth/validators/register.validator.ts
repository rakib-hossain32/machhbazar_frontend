import { z } from "zod";

export const registerZodSchema = z
  .object({
    name: z.string().trim().min(2, "Enter your full name"),
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Confirm your password"),
    termsAccepted: z.boolean().refine((value) => value, {
      message: "You must accept the terms to continue",
    }),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type IRegisterPayload = z.infer<typeof registerZodSchema>;
