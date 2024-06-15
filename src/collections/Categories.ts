import { CollectionConfig } from "payload/types";

export const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "category",
    description: "manufacturer",
  },

  fields: [
    // {
    //   name: "user",
    //   type: "relationship",
    //   relationTo: "users",
    //   required: true,
    //   hasMany: false,
    //   admin: {
    //     condition: () => false,
    //   },
    // },
    {
      name: "category",
      label: "Category Name",
      type: "text",
      required: true,
    },
    {
      name: "details",
      type: "richText",
      label: "Category details",
    },
  ],
};
