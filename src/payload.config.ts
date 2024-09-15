import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import dotenv from "dotenv";
import path from "path";
import { buildConfig } from "payload/config";
import { Categories } from "./collections/Categories";
import { Manufacturers } from "./collections/Manufacturers";
import { Media } from "./collections/Media";
import { Orders } from "./collections/Orders";
import { Products } from "./collections/Products";
import { Users } from "./collections/Users";
import { gcsAdapter } from '@payloadcms/plugin-cloud-storage/gcs'
import { cloudStorage } from "@payloadcms/plugin-cloud-storage";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});


export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_API_URL || "",
  collections: [Users, Products, Media, Orders, Manufacturers, Categories],
  plugins: [
    // Pass the plugin to Payload
    cloudStorage({
      collections: {
        // Enable cloud storage for Media collection
        media: {
          adapter: gcsAdapter({
            options: {
              // you can choose any method for authentication, and authorization which is being provided by `@google-cloud/storage`
              keyFilename: './gcs-creds.json',
              // credentials: JSON.parse(process.env.GCS_CREDENTIALS || '{}'),
              },
            bucket: process.env.GCS_BUCKET || '',
          }),
        }
      },
    }),
  ],
  routes: {
    admin: "/sell",
  },
  admin: {
    user: "users",
    bundler: webpackBundler(),
    meta: {
      titleSuffix: "- PowerPharma",
      favicon: "/favicon.ico",
      ogImage: "/thumbnail.jpg",
    },
  },
  rateLimit: {
    max: 2000,
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URL!,
  }),
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
});
