import { PrimaryActionEmailHtml } from "../components/emails/PrimaryActionEmail";
import { User } from "../payload-types";
import { Access, CollectionConfig } from "payload/types";
import { use } from "react";

const adminsAndUser: Access = ({ req: { user } }) => {
  if (user.role === "admin") return true;

  return {
    id: {
      equals: user.id,
    },
  };
};

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    verify: {
      generateEmailHTML: ({ token }) => {
        return PrimaryActionEmailHtml({
          actionLabel: "Verify Your Email",
          buttonText: "Verify Email",
          href: `${process.env.NEXT_PUBLIC_API_URL}/verify-email?token=${token}`,
        });
      },
    },
  },
  // access: {
  //   read: adminsAndUser,
  //   create: () => true,
  //   update: ({ req }) => req.user.role === "admin",
  //   delete: ({ req }) => req.user.role === "admin",
  // },
  admin: {
    hidden: ({ user }) => user.role !== "admin",
  },
  fields: [
    {
      name: "role",
      required: true,
      defaultValue: "user",
      admin: {
        condition: () => false,
      },
      label: "Role",
      type: "select",
      options: [
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "User",
          value: "user",
        },
      ],
    },
  ],
};
