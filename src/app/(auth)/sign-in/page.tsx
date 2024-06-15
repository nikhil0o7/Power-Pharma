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
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const Page = () => {

    const searchParams = useSearchParams();
    const router = useRouter();
    const isSeller = searchParams.get('as') === 'true';
    const origin = searchParams.get('origin');
    const { register, watch, handleSubmit, formState: { errors }, } = useForm<TAuthCredentialsValidator>({
        resolver: zodResolver(AuthCredentialsValidator),
    });

    const continueAsSeller = () => {
        router.push("?as=seller")
    }

    const continueAsBuyer = () => {
        router.replace('/sign-in', undefined)
    }


    const { mutate: signIn, isLoading } = trpc.auth.signIn.useMutation({
        onSuccess: () => {
            toast.success('Signed in successfully');
            router.refresh()

            if (origin) {
                router.push(`/${origin}`);
            }
            if (isSeller) {
                router.push('/sell');
                return;
            }

            router.push('/');
        },
        onError: (error) => {
            if (error.data?.code === 'UNAUTHORIZED') {
                toast.error('Invalid email or password');
            }
        }
    })

    const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
        signIn({ email, password });

    }

    return <>
        <div className='container w-full relative flex pt-20 flex-col items-center justify-center lg:px-0'>
            <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
                <div className='flex flex-col items-center space-y-2 text-center'>
                    <Icons.logo className="w-20 h-20" />
                    <h1 className="text-2xl font-bold">Sign in to your {isSeller ? 'seller' : ''} account</h1>

                    <Link href='/sign-up' className={buttonVariants({ variant: 'link', className: "gap-1.5" })}>Don&apos;t have an account?
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
                            <Button type="submit" className="w-full">Sign in</Button>
                        </div>
                    </form>
                    <div className="relative">
                        <div aria-hidden="true" className="absolute inset-0 flex items-center">
                            <span className="w-full border-t"></span>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-background text-muted-foreground">Or</span>
                        </div>
                    </div>
                    {isSeller ? (
                        <Button onClick={continueAsBuyer} variant='secondary' disabled={isLoading}>Continue as Customer</Button>
                    ) : <Button onClick={continueAsSeller} variant='secondary' disabled={isLoading}>Continue as Seller</Button>}
                </div>
            </div>
        </div ></>
}
export default Page;