import { z } from "zod";
export const passwordSchema = z.string().min(12, "Password must be at least 12 characters.").max(128).refine(v => /[a-z]/.test(v), "Add a lowercase letter.").refine(v => /[A-Z]/.test(v), "Add an uppercase letter.").refine(v => /\d/.test(v), "Add a number.").refine(v => /[^A-Za-z0-9]/.test(v), "Add a symbol.");
