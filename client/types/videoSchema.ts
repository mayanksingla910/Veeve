
import { z } from "zod";

export const videoPostSchema = z.object({
  title: z.string().max(100, "Title cannot exceed 100 characters").optional(),
  description: z.string().max(1000, "Description cannot exceed 1000 characters").optional(),
  tags: z.string().max(200, "Tags cannot exceed 200 characters").optional(),
  videoFile: z
    .any()
    .refine((file) => file instanceof File, "A video file is required")
    .refine((file) => file?.size <= 500 * 1024 * 1024, "Max file size is 500MB"),
});

export type VideoPostFormValues = z.infer<typeof videoPostSchema>;