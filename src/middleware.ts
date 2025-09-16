import { clerkMiddleware, type ClerkMiddlewareAuth } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

export default clerkMiddleware(async (auth: ClerkMiddlewareAuth, req: NextRequest) => {
  const { userId } = await auth();

  if (!userId && req.nextUrl.pathname.startsWith("/dashboard")) {
    const signInUrl = new URL("/auth/sign-in", req.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/dashboard(.*)", // protect dashboard
  ],
};
