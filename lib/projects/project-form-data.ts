import type { Prisma } from "@prisma/client";
import { z } from "zod";

const ProjectInputSchema = z.object({
  projectName: z.string().trim().min(1).max(160),
  projectTagline: z.string().trim().max(240).nullable().optional(),
  projectType: z.enum(["RESIDENTIAL", "COMMERCIAL", "INDUSTRIAL", "INSTITUTIONAL", "INFRASTRUCTURE", "MIXED_USE"]),
  clientName: z.string().trim().max(160).nullable().optional(),
  contractorName: z.string().trim().max(160).nullable().optional(),
  architectName: z.string().trim().max(160).nullable().optional(),
  location: z.string().trim().min(1).max(180),
  startDate: z.date().nullable().optional(),
  completionDate: z.date().nullable().optional(),
  estimatedCost: z.number().nonnegative().nullable().optional(),
  status: z.enum(["ACTIVE", "COMPLETED"]),
  overview: z.string().trim().min(1),
  objectives: z.array(z.string().trim().min(1)).default([]),
  keyFeatures: z.array(z.object({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
  })).default([]),
  technologiesUsed: z.array(z.string().trim().min(1)).default([]),
  youtubeLinks: z.array(z.string().trim().min(1)).default([]),
  instagramLinks: z.array(z.string().trim().min(1)).default([]),
});

function nullableText(formData, key) {
  const value = String(formData.get(key) || "").trim();
  return value || null;
}

function nullableDate(formData, key) {
  const raw = String(formData.get(key) || "").trim();
  if (!raw) return null;
  const value = new Date(raw);
  return Number.isNaN(value.getTime()) ? "INVALID_DATE" : value;
}

function nullableNumber(formData, key) {
  const raw = String(formData.get(key) || "").trim();
  if (!raw) return null;
  const value = Number(raw);
  return Number.isFinite(value) ? value : "INVALID_NUMBER";
}

function jsonArray(formData, key) {
  const raw = formData.get(key);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(String(raw));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return "INVALID_JSON";
  }
}

export function parseProjectFormData(formData) {
  const raw = {
    projectName: String(formData.get("projectName") || ""),
    projectTagline: nullableText(formData, "projectTagline"),
    projectType: String(formData.get("projectType") || ""),
    clientName: nullableText(formData, "clientName"),
    contractorName: nullableText(formData, "contractorName"),
    architectName: nullableText(formData, "architectName"),
    location: String(formData.get("location") || ""),
    startDate: nullableDate(formData, "startDate"),
    completionDate: nullableDate(formData, "completionDate"),
    estimatedCost: nullableNumber(formData, "estimatedCost"),
    status: String(formData.get("status") || ""),
    overview: String(formData.get("overview") || ""),
    objectives: jsonArray(formData, "objectives"),
    keyFeatures: jsonArray(formData, "keyFeatures"),
    technologiesUsed: jsonArray(formData, "technologiesUsed"),
    youtubeLinks: jsonArray(formData, "youtubeLinks"),
    instagramLinks: jsonArray(formData, "instagramLinks"),
  };

  if (Object.values(raw).includes("INVALID_JSON") || Object.values(raw).includes("INVALID_DATE") || Object.values(raw).includes("INVALID_NUMBER")) {
    return { success: false, error: "Invalid project field format." };
  }

  const parsed = ProjectInputSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || "Invalid project details." };
  }
  // Zod has validated these required fields. The legacy tsconfig disables strict null checks.
  const data = parsed.data as Omit<Prisma.ProjectsCreateInput, "imageGallery">;
  return { success: true, data };
}
