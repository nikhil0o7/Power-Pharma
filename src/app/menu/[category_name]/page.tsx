"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from '@/components/ui/textarea';
import { cn } from "@/lib/utils";
import { AuthCredentialsValidator, TAuthCredentialsValidator } from "@/lib/validators/account-credentials-validator";
import { trpc } from "@/trpc/client";
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ZodError, date } from "zod";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/emails/PrimaryActionEmail";

export type FormData = {
    name: string;
    email: string;
    message: string;
};

interface PageProps {
    params: {
        category_name: string;
    }
}
const Page = ({
    params,
}: PageProps) => {
    const category_name = decodeURIComponent(params.category_name);
    const resend = new Resend(process.env.RESEND_API_KEY || 're_BynHDsNn_EGqYWfYQ4NbVnwd6WqXNkfje');

    const { register, watch, handleSubmit, formState: { errors }, } = useForm<FormData>({
    })

    const { mutate } = trpc.auth.resend.useMutation({});

    const onSubmit = async (data: FormData) => {
        const { name, email, message } = data;
        mutate({ name, email, message });
        // const response = await fetch('/api/send', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         name: name,
        //         email: email,
        //         message: message,
        //     }),
        // });
        // const d = await response.json();
        // console.log(d);
        // mutate({ email, password });
        // const d = await resend.emails.send({
        //     from: `${process.env.FROM_EMAIL}`,
        //     to: `${process.env.TO_EMAIL}`,
        //     subject: "🎉New submission to your enquiry form!",
        //     html: "",
        //     react: EnquiryEmail({ name, email, message })
        // });

    }

    return <>
        <div className='container w-full relative flex pt-20 flex-col items-center justify-center lg:px-0'>
            <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
                <div className='flex flex-col items-center space-y-2 text-center'>
                    {/* <Image src="../../../../public/power.png" alt="logo.png" width={200} height={200} /> */}
                    <h1 className="text-3xl font-bold">{category_name}</h1>
                </div>
                {category_name === "Contact us" ? (
                    <div className="grid gap-6">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid gap-2">
                                <div className="grid gap-1 py-2">
                                    <Label htmlFor="name">Name*</Label>
                                    <Input required id="name" {...register("name")} className={cn({ "focus-visible:ring-red-400": errors.name })} type="text" placeholder="Enter your name" />
                                    {errors?.name && <p className="text-red-500 text-sm">{errors.name?.message}</p>}
                                </div>
                                <div className="grid gap-1 py-2">
                                    <Label htmlFor="email">Email*</Label>
                                    <Input required id="email" {...register("email")} className={cn({ "focus-visible:ring-red-400": errors.email })} type="email" placeholder="yourid@email.com" />
                                    {errors?.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                                </div>
                                <div className="grid gap-1 py-2">
                                    <Label htmlFor="message">Enquiry Description*</Label>
                                    <Textarea rows={4} required id="message" {...register("message")} className={cn({ "focus-visible:ring-red-400": errors.message })} placeholder="Enter your questions" />
                                    {errors?.message && <p className="text-red-500 text-sm">{errors.message?.message}</p>}
                                </div>
                                <Button type="submit" className="w-full">Submit</Button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="grid gap-6 w-full">
                        <div className="py-4 px-8">
                            <div className="mt-4">
                                <p className="gap-2 mb-1 text-lg"><strong>Contact Person:</strong> Mr. S. NAVEEN</p>
                                <p className="gap-2 mb-1 text-lg"><strong>Phone:</strong> +91 98492 79411</p>
                                <p className="gap-2 mb-1 text-lg"><strong>Registered Office:</strong> D. No.: 3-7-63/44, Sai Sapthagiri Colony, Mansoorabad, L.B. Nagar, Hyderabad-500068.</p>
                                <p className="gap-2 mb-1 text-lg"><strong>Phone No:</strong> +91 888592344</p>
                                <p className="gap-2 mb-1 text-lg"><strong>E-mail:</strong> <a href="mailto:power.pharma@yahoo.com" className="text-blue-600 hover:underline">power.pharma@yahoo.com</a></p>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div></>
}
export default Page;