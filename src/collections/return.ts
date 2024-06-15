import { trpc } from "../trpc/client";

export const fetchCategories = (manufacturerId: any) => {
  // Replace this URL with the actual API endpoint in your setup
  const response = trpc.manufacturers.useQuery({
    limit: 100,
    // manufacturerID: manufacturerId,
  });
  return response.data || [];
};
