import Image from 'next/image'
import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import MobileNav from './MobileNav'
import NavItems from './NavItems'
import React from 'react'
import NavItemD from './NavItemD'

const Navbar = async () => {
    // const { data: manufacturers, isLoading: isLoadingManufacturers } = trpc.manufacturers.useQuery({ limit: 100 });


    return (
        <div className='bg-white sticky z-50 top-0 inset-x-0 h-16'>
            <header className='relative bg-white'>
                <MaxWidthWrapper>
                    <div className='border-b border-gray-200'>
                        <div className='flex h-16 items-center'>
                            <MobileNav />

                            <div className='ml-4 flex lg:ml-0'>
                                <Link href='/'>
                                    {/* <Icons.logo className='h-10 w-10' /> */}
                                    {/* <Power.logo className='h-100 w-100' /> */}
                                    <Image
                                        src='/power.png'
                                        width={150}
                                        height={150}
                                        loading='eager'
                                        alt='Power Pharma' />
                                </Link>
                            </div>

                            <div className='hidden z-50 lg:ml-8 lg:block lg:self-stretch'>
                                <NavItemD />
                            </div>

                            <div className='ml-auto flex items-center'>
                                {/* <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
                                    {user ? null : (
                                        <Link
                                            href='/sign-in'
                                            className={buttonVariants({
                                                variant: 'ghost',
                                            })}>
                                            Sign in
                                        </Link>
                                    )}

                                    {user ? null : (
                                        <span
                                            className='h-6 w-px bg-gray-200'
                                            aria-hidden='true'
                                        />
                                    )}

                                    {user ? (
                                        <UserAccountNav user={user} />
                                    ) : (
                                        <Link
                                            href='/sign-up'
                                            className={buttonVariants({
                                                variant: 'ghost',
                                            })}>
                                            Create account
                                        </Link>
                                    )}

                                    {user ? (
                                        <span
                                            className='h-6 w-px bg-gray-200'
                                            aria-hidden='true'
                                        />
                                    ) : null}

                                    {user ? null : (
                                        <div className='flex lg:ml-6'>
                                            <span
                                                className='h-6 w-px bg-gray-200'
                                                aria-hidden='true'
                                            />
                                        </div>
                                    )}

                                    <div className='ml-4 flow-root lg:ml-6'>
                                        <Cart />
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </header>
        </div>
    )
}

export default Navbar