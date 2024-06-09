import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getPayloadClient } from "../get-payload";
import { AuthCredentialsValidator } from "../lib/validators/account-credentials-validator";
import { publicProcedure, router } from "./trpc";
import { Resend } from "resend";
// import { EnquiryEmail } from "@/components/emails/EnquiryEmail";

export const authRouter = router({
  createPayloadUser: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input }) => {
      const { email, password } = input;
      const payload = await getPayloadClient();
      // if user already exists, return error
      const { docs: users } = await payload.find({
        collection: "users",
        where: {
          email: {
            equals: email,
          },
        },
      });
      if (users.length > 0) {
        throw new TRPCError({ code: "CONFLICT" });
      }
      await payload.create({
        collection: "users",
        data: {
          email,
          password,
          role: "user",
        },
      });
      return { sucess: true, sentToEmail: email };
    }),

  VerifyEmail: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      const { token } = input;
      const payload = await getPayloadClient();
      const isVerified = await payload.verifyEmail({
        collection: "users",
        token: token,
      });
      if (!isVerified) throw new TRPCError({ code: "UNAUTHORIZED" });

      return { sucess: true };
    }),
  resend: publicProcedure
    .input(
      z.object({ email: z.string(), name: z.string(), message: z.string() })
    )
    .mutation(async ({ input }) => {
      const { name, email, message } = input;
      const resend = new Resend(process.env.RESEND_API_KEY);
      try {
        const data = await resend.emails.send({
          from: "🎉Power Pharma <onboarding@resend.dev>",
          to: ["srirangam.nikhil@gmail.com"],
          subject: "New Enquiry for Power Pharma",
          text: ".", // Add a text version of the email content
          // react: EnquiryEmail({ name, email, message }),
        });
        return { success: true, sentToEmail: email };
      } catch (e) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),

  signIn: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      const { res } = ctx;
      const payload = await getPayloadClient();
      try {
        await payload.login({
          collection: "users",
          data: {
            email,
            password,
          },
          res,
        });
        return { sucess: true };
      } catch (e) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
    }),
});
