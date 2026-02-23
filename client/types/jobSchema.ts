import { z } from "zod";

// types/job.ts
export interface Job {
  id: string;
  company: string;
  logo: string;
  location: string;
  postedAt: string;
  description: string;
  isSaved?: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────

export const JOB_TYPES = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
] as const;

export const LOCATION_TYPES = [
  { value: "remote", label: "Remote" },
  { value: "onsite", label: "On-site" },
  { value: "hybrid", label: "Hybrid" },
] as const;

export const COUNTRIES = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "in", label: "India" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "other", label: "Other" },
] as const;

export const EXPERIENCE_LEVELS = [
  { value: "entry", label: "Entry level (0–2 years)" },
  { value: "mid", label: "Mid level (2–5 years)" },
  { value: "senior", label: "Senior (5–8 years)" },
  { value: "lead", label: "Lead / Principal (8+ years)" },
  { value: "any", label: "Any experience level" },
] as const;

export const CURRENCIES = [
  { value: "USD", label: "USD — US Dollar" },
  { value: "GBP", label: "GBP — British Pound" },
  { value: "EUR", label: "EUR — Euro" },
  { value: "CAD", label: "CAD — Canadian Dollar" },
  { value: "AUD", label: "AUD — Australian Dollar" },
  { value: "INR", label: "INR — Indian Rupee" },
] as const;

// ─── Derived types ────────────────────────────────────────────────────────────

// Extract the value union from each const array so you can use them in types
type JobTypeValue = (typeof JOB_TYPES)[number]["value"];
type LocationTypeValue = (typeof LOCATION_TYPES)[number]["value"];
type CountryValue = (typeof COUNTRIES)[number]["value"];
type ExperienceValue = (typeof EXPERIENCE_LEVELS)[number]["value"];
type CurrencyValue = (typeof CURRENCIES)[number]["value"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const jobTypeValues = JOB_TYPES.map((t) => t.value) as [
  JobTypeValue,
  ...JobTypeValue[],
];
const locationTypeValues = LOCATION_TYPES.map((t) => t.value) as [
  LocationTypeValue,
  ...LocationTypeValue[],
];
const countryValues = COUNTRIES.map((c) => c.value) as [
  CountryValue,
  ...CountryValue[],
];
const experienceValues = EXPERIENCE_LEVELS.map((l) => l.value) as [
  ExperienceValue,
  ...ExperienceValue[],
];
const currencyValues = CURRENCIES.map((c) => c.value) as [
  CurrencyValue,
  ...CurrencyValue[],
];

const needsLocation = (type: string) => type === "onsite" || type === "hybrid";

// ─── Schema ───────────────────────────────────────────────────────────────────

export const baseFormSchema = z
  .object({
    // Step 1 — Basics
    jobRole: z
      .string()
      .min(3, "Job role must be at least 3 characters")
      .max(50, "Job role must be under 50 characters"),

    jobSummary: z
      .string()
      .min(10, "Summary must be at least 10 characters")
      .max(200, "Summary must be under 200 characters"),

    jobType: z.enum(jobTypeValues, {
      message: "Please select a job type",
    }),

    locationType: z.enum(locationTypeValues, {
      message: "Please select a work arrangement",
    }),

    // These start as optional strings — conditional
    // required logic is applied in .superRefine() below
    country: z.string().optional(),
    region: z.string().optional(),

    // Step 2 — Requirements
    editTypes: z.array(z.string().min(1)).min(0).default([]), // optional — no minimum

    softwares: z.array(z.string().min(1)).min(0).default([]), // optional — no minimum

    // Step 3 — Compensation
    experienceLevel: z.enum(experienceValues, {
      message: "Please select an experience level",
    }),

    currency: z.enum(currencyValues).default("INR"),

    salaryMin: z
      .string()
      .optional()
      .refine((val) => !val || (!isNaN(Number(val)) && Number(val) >= 0), {
        message: "Salary must be a positive number",
      }),

    salaryMax: z
      .string()
      .optional()
      .refine((val) => !val || (!isNaN(Number(val)) && Number(val) >= 0), {
        message: "Salary must be a positive number",
      }),

    // Step 4 — Description
    jobDescription: z
      .string()
      .min(50, "Description must be at least 50 characters")
      .max(5000, "Description must be under 5000 characters"),
  })

  // ── Cross-field validation ──────────────────────────────────────────────────
  export const jobFormSchema = baseFormSchema.superRefine((data, ctx) => {
    // Country + region required when onsite or hybrid
    if (needsLocation(data.locationType)) {
      if (!data.country) {
        ctx.addIssue({
          code: "custom",
          path: ["country"],
          message: "Country is required for on-site and hybrid roles",
        });
      }
      if (!data.region || data.region.trim().length < 2) {
        ctx.addIssue({
          code: "custom",
          path: ["region"],
          message: "State or region is required for on-site and hybrid roles",
        });
      }
    }

    // Salary range cross-validation — max must be >= min
    const min = Number(data.salaryMin);
    const max = Number(data.salaryMax);
    if (data.salaryMin && data.salaryMax && max < min) {
      ctx.addIssue({
        code: "custom",
        path: ["salaryMax"],
        message: "Maximum salary must be greater than minimum",
      });
    }
  });

export type JobFormData = z.infer<typeof jobFormSchema>;

// ─── Per-step schemas for incremental validation ──────────────────────────────
// Use these to validate only the current step before allowing "Continue"

export const step1Schema = baseFormSchema
  .pick({
    jobRole: true,
    jobSummary: true,
    jobType: true,
    locationType: true,
    country: true,
    region: true,
  })
  .superRefine((data, ctx) => {
    if (needsLocation(data.locationType)) {
      if (!data.country) {
        ctx.addIssue({
          code: "custom",
          path: ["country"],
          message: "Country is required for on-site and hybrid roles",
        });
      }
      if (!data.region || data.region.trim().length < 2) {
        ctx.addIssue({
          code: "custom",
          path: ["region"],
          message: "State or region is required for on-site and hybrid roles",
        });
      }
    }
  });

export const step2Schema = baseFormSchema.pick({
  editTypes: true,
  softwares: true,
});

export const step3Schema = baseFormSchema
  .pick({
    experienceLevel: true,
    currency: true,
    salaryMin: true,
    salaryMax: true,
  })
  .superRefine((data, ctx) => {
    const min = Number(data.salaryMin);
    const max = Number(data.salaryMax);
    if (data.salaryMin && data.salaryMax && max < min) {
      ctx.addIssue({
        code: "custom",
        path: ["salaryMax"],
        message: "Maximum salary must be greater than minimum",
      });
    }
  });

export const step4Schema = baseFormSchema.pick({
  jobDescription: true,
});

export const stepSchemas = [
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
] as const;
