import { passwordSchema } from "@/lib/auth-secure/password-policy";
import * as z from "zod";

export const indianStates = [
  "Andhra Pradesh",
  "Karnataka",
  "Kerala",
  "Maharashtra",
  "Tamil Nadu",
  "Telangana",
] as const;

export const ConsultationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid Indian phone number"), // Valid 10-digit Indian mobile
  state: z.enum(indianStates, {
    errorMap: () => ({ message: "Invalid Indian state" }),
  }),
  details: z.string().optional(),
});

export const TestimonialSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1).optional(),
  image: z
    .string()
    .url("Image must be a valid URL")
    .optional()
    .or(z.literal("")), // allow empty string if you sometimes pass "" instead of undefined
  quote: z.string().min(1, "Quote is required"),
  isArchived: z.boolean().optional(),
});
export const SolutionsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  isArchived: z.boolean().optional(),
  image: z.array(
      z.union([
        // Case 1: Uploaded file
        z.instanceof(File),
  
        // Case 2: Saved image object
        z.object({
          url: z.string().url(),
          fileId: z.string(),
        }),
      ])
    ).optional(),
});

export const ResetPasswordSchema = z.object({
  password: passwordSchema,
});

export const ChangePasswordSchema = z
  .object({
    oldPassword: z.string().min(8, "Old password is required"),
    newPassword: passwordSchema,
    confirmPassword: z.string({ required_error: "Confirm password is required" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const ForgotPasswordSchema = z.object({
  email: z.string().email({
    message: "invalid email address",
  }),
});

export const LoginSchema = z.object({
  email: z.string().trim().min(1, "Email is required.").email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required.").min(8, "Password must be at least 8 characters."),
});
