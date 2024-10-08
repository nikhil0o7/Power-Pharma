import { z } from "zod";
import { getPayloadClient } from "../get-payload";
import {
  MfgQueryValidator,
  QueryValidator,
} from "../lib/validators/query-validator";
import { authRouter } from "./auth-router";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  auth: authRouter,
  manufacturers: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(1000),
        id: z.string().nullish(),
      })
    )
    .query(async () => {
      const payload = await getPayloadClient();
      const { docs: manufacturers } = await payload.find({
        collection: "manufacturers",
      });
      return manufacturers;
    }),
  categories: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(1000),
        id: z.string().nullish(),
      })
    )
    .query(async () => {
      const payload = await getPayloadClient();
      const { docs: categories } = await payload.find({
        collection: "categories",
      });
      return categories;
    }),
  products: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(1000),
      })
    )
    .query(async () => {
      const payload = await getPayloadClient();
      const { docs: products } = await payload.find({
        collection: "products",
      });
      return products;
    }),
  getInfiniteProducts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(1000),
        cursor: z.number().nullish(),
        query: QueryValidator,
      })
    )
    .query(async ({ input }) => {
      const { query, cursor } = input;
      const { sort, limit, ...queryOpts } = query;
      const payload = await getPayloadClient();
      const parsedQueryOpts: Record<string, { equals: string }> = {};

      Object.entries(queryOpts).forEach(([key, value]) => {
        parsedQueryOpts[key] = {
          equals: value,
        };
      });

      const page = cursor || 1;

      const {
        docs: items,
        hasNextPage,
        nextPage,
      } = await payload.find({
        collection: "products",
        where: {
          approvedForSale: {
            equals: "approved",
          },
          ...parsedQueryOpts,
        },
        sort,
        depth: 1,
        limit,
        page,
      });
      return { items, nextPage: hasNextPage ? nextPage : null };
    }),
    getInfiniteMfgProducts: publicProcedure
      .input(
        z.object({
          limit: z.number().min(1).max(1000),
          cursor: z.number().nullish(),
          manufacturer: z.any().nullish(),
          product_category: z.any().nullish(),
          query: MfgQueryValidator,
        })
      )
      .query(async ({ input }) => {
        const { query, cursor } = input;
        const { sort, limit, manufacturer, product_category, ...queryOpts } = query;
        const payload = await getPayloadClient();
        
        const parsedQueryOpts: Record<string, { equals: string }> = {
          ...(manufacturer ? { 'manufacturer.mfg_name': { equals: manufacturer } } : {}),
          ...(product_category ? { 'product_category.category': { equals: product_category } } : {}),
          // Add dynamic query options
          ...Object.entries(queryOpts).reduce((acc, [key, value]) => {
            //@ts-ignore
            acc[key] = { equals: value };
            return acc;
          }, {})
        };

        const page = cursor || 1;

        const {
          docs: items,
          hasNextPage,
          nextPage,
        } = await payload.find({
          collection: "products",
          where: {
            approvedForSale: {
              equals: "approved",
            },
            ...parsedQueryOpts,
          },
          sort,
          depth: 1,
          limit,
          page,
        });

        return { items, nextPage: hasNextPage ? nextPage : null };
      }),
  // getInfiniteMfgProducts: publicProcedure
  //   .input(
  //     z.object({
  //       limit: z.number().min(1).max(1000),
  //       cursor: z.number().nullish(),
  //       manufacturer: z.any().nullish(),
  //       product_category: z.any().nullish(),
  //       query: MfgQueryValidator,
  //     })
  //   )
  //   .query(async ({ input }) => {
  //     const { query, cursor } = input;
  //     const { sort, limit, product_category, manufacturer } = query;
  //     const payload = await getPayloadClient();
  //     const parsedQueryOpts: Record<string, { equals: string }> = {};

  //     const page = cursor || 1;
  //     const filters = {
  //       ...(manufacturer ? { manufacturer: { equals: manufacturer } } : {}),
  //       ...(product_category ? { product_category: { equals: product_category } } : {}),
  //     };
  //     const {
  //       docs: items,
  //       hasNextPage,
  //       nextPage,
  //     } = await payload.find({
  //       collection: "products",
  //       sort,
  //       depth: 1,
  //       limit,
  //       page,
  //       where: filters
  //     });
  //     return { items, nextPage: hasNextPage ? nextPage : null };
  //   }),
});

export type AppRouter = typeof appRouter;
