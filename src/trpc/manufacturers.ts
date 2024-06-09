import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { router, publicProcedure } from "./trpc";
import { getPayloadClient } from "../get-payload";

export const manufacturersRouter = router({
  getManufacturers: publicProcedure.query(async () => {
    const payload = await getPayloadClient();
    try {
      const { docs: manufacturers } = await payload.find({
        collection: "manufacturers",
        where: {
          
        }
      });
      return manufacturers;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  }),
});
