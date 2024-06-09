import { z } from "zod";

export const QueryValidator = z.object({
  category: z.string().optional(),
  sort: z.enum(["asc", "desc"]).optional(),
  limit: z.number().optional(),
});

export const MfgQueryValidator = z.object({
  product_category: z.any().optional(),
  // mfg_name: z.string().optional(),
  manufacturer: z.any().optional(),
  sort: z.enum(["asc", "desc"]).optional(),
  limit: z.number().optional(),
});

export type TQueryValidator = z.infer<typeof QueryValidator>;
export type TMfgQueryValidator = z.infer<typeof MfgQueryValidator>;
