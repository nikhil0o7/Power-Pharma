// import { appRouter } from "@/trpc";
// import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
// const handler = (req: Request) => {
//   fetchRequestHandler({
//     endpoint: "/api/trpc",
//     req,
//     router: appRouter,
//     //@ts-expect-error contxt already is passed from middleware
//     createContext: () => ({}),
//   });
// };

// export { handler as GET, handler as POST };


import { appRouter } from "@/trpc";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { NextResponse } from 'next/server';

const handler = async (req: Request) => {
  const response = await fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    //@ts-expect-error context already is passed from middleware
    createContext: () => ({}),
  });

  // Return the response
  return new NextResponse(response.body, {
    status: response.status,
    headers: response.headers,
  });
};

export { handler as GET, handler as POST };