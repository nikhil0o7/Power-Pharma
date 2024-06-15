import { Access, CollectionConfig } from "payload/types";
import { User } from "../payload-types";

const isAdminOrHasAccess =
  (): Access =>
  //@ts-ignore
  ({ req: { user: _user } }) => {
    const user = _user as User | undefined;

    if (!user) return false;
    if (user.role === "admin") return true;
    if (user.role === "user") return false;
  };

export const Manufacturers: CollectionConfig = {
  slug: "manufacturers",
  admin: {
    useAsTitle: "mfg_name",
  },
  access: {
    read: isAdminOrHasAccess(),
    update: isAdminOrHasAccess(),
    delete: isAdminOrHasAccess(),
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
      name: "mfg_name",
      label: "Manufacturer Name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "richText",
      label: "Manufacturer details",
    },
  ],
};
