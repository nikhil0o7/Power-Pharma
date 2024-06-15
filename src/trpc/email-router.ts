import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { router, publicProcedure } from "./trpc";
import { getPayloadClient } from "../get-payload";

export const emailRouter = router({
  getManufacturers: publicProcedure.query(async () => {
    try {
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  }),
});
