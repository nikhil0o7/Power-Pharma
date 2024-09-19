import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { Access, CollectionConfig } from "payload/types";
import { Product, User } from "../payload-types";
import { PRODUCT_CATEGORIES } from "../config";

const isAdminOrHasAccess =
  (): Access =>
  //@ts-ignore
  ({ req: { user: _user } }) => {
    const user = _user as User | undefined;

    if (!user) return false;
    if (user.role === "admin") return true;
    if (user.role === "user") return false;
  };

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
  },
  // access: {
  //   read: isAdminOrHasAccess(),
  //   update: isAdminOrHasAccess(),
  //   delete: isAdminOrHasAccess(),
  // },

  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "text",
      label: "Product details",
    },
    {
      name: "detailed_description",
      type: "text",
      label: "Extra details",
    },
    {
      name: "manufacturer",
      label: "Manufacturer",
      type: "relationship",
      relationTo: "manufacturers",
      required: true,
      hasMany: false,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "product_category",
      label: "Category",
      type: "relationship",
      relationTo: "categories",
      required: true,
      hasMany: false,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "price",
      label: "Price",
      min: 0,
      max: 1000,
      type: "number",
      required: true,
    },
    // {
    //   name: "category",
    //   label: "Category",
    //   type: "select",
    //   options: PRODUCT_CATEGORIES.map(({ label, value }) => ({ label, value })),
    //   required: false,
    // },
    // {
    //   name: "product_files",
    //   label: "Product files(s)",
    //   type: "relationship",
    //   required: true,
    //   relationTo: "product_files",
    //   hasMany: false,
    // },
    {
      name: "approvedForSale",
      label: "Product status",
      type: "select",
      defaultValue: "pending",
      access: {
        create: ({ req }) => req.user?.role === "admin",
        read: ({ req }) => req.user?.role === "admin",
        update: ({ req }) => req.user?.role === "admin",
      },
      options: [
        {
          label: "Pending verification",
          value: "pending",
        },
        {
          label: "Approved",
          value: "approved",
        },
        {
          label: "Denied",
          value: "denied",
        },
      ],
    },
    {
      name: "priceId",
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
      name: "images",
      type: "array",
      label: "Product Images",
      minRows: 1,
      maxRows: 10,
      required: true,
      labels: {
        singular: "Image",
        plural: "Images",
      },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
  ],
};
