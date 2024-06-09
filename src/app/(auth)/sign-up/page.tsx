"use client";

import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { AuthCredentialsValidator, TAuthCredentialsValidator } from "@/lib/validators/account-credentials-validator";
import { trpc } from "@/trpc/client";
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ZodError } from "zod";
import { router } from '../../../trpc/trpc';
import { useRouter } from "next/navigation";
import { error } from "console";

const Page = () => {


    const { register, watch, handleSubmit, formState: { errors }, } = useForm<TAuthCredentialsValidator>({
        resolver: zodResolver(AuthCredentialsValidator),
    })
    const router = useRouter();

    const { mutate } = trpc.auth.createPayloadUser.useMutation({
        onError: (err) => {
            if (err?.data?.code === 'CONFLICT') {
                toast.error('This email is already in use. Please try again with a different email?');
            }

            if (err instanceof ZodError) {
                toast.error(err.issues[0].message)
                return
            }
            toast.error('Something went wrong. Please try again later.')
        },
        onSuccess: ({ sentToEmail }) => {
            toast.success(`We've sent a verification link to ${sentToEmail}. Please verify your email to continue.`)
            router.push('/verify-email?to=' + sentToEmail);

        }
    })

    const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
        mutate({ email, password });

    }

    return <>
        <div className='container w-full relative flex pt-20 flex-col items-center justify-center lg:px-0'>
            <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
                <div className='flex flex-col items-center space-y-2 text-center'>
                    <Icons.logo className="w-20 h-20" />
                    <h1 className="text-2xl font-bold">Create an account</h1>

                    <Link href='/sign-in' className={buttonVariants({ variant: 'link', className: "gap-1.5" })}>Already have an account?
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
                <div className="grid gap-6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-2">
                            <div className="grid gap-1 py-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" {...register("email")} className={cn({ "focus-visible:ring-red-400": errors.email })} type="email" placeholder="yourid@email.com" />
                                {errors?.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                            </div>
                            <div className="grid gap-1 py-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" {...register("password")} className={cn({ "focus-visible:ring-red-500": errors.password })} placeholder="Password" />
                                {errors?.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                            </div>
                            <Button type="submit" className="w-full">Sign up</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div></>
}
export default Page;