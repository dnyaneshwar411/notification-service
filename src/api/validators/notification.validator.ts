import z from "zod";
import { objectIdSchema } from "./common";

export const retrieveNotificationsValidation = z.object({
  query: z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    sortBy: z.string().optional(),
    category: z.enum(["system", "promotional"]).optional(),
    status: z.enum(["created", "received", "read", "deleted"]).optional(),
  }),
});

export const createNotificationValidation = z.object({
  body: z.object({
    recipient: objectIdSchema,
    actor: objectIdSchema.optional(),
    entity: objectIdSchema.optional(),
    entityModel: z.enum(["Order", "POST", "Comment"]).optional(),
    category: z.enum(["system", "promotional"]).default("system"),
    status: z
      .enum(["created", "received", "read", "deleted"])
      .default("created"),
    statusTimeLine: z.record(z.string(), z.coerce.date()).optional(),
    groupKey: z.string().optional(),
    subject: z.string().trim().min(1, "Subject is required"),
    message: z.string().trim().min(1, "Message is required"),
  }),
});

export const retrieveNotificationByIdValidation = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});

export const updateNotificationValidation = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
  body: z
    .object({
      status: z.enum(["created", "received", "read", "deleted"]),
    })
    .strict(),
});

export const deleteNotificationValidation = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});
