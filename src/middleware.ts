import { clerkMiddleware, type ClerkMiddlewareAuth, clerkClient  } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";


export default clerkMiddleware(async (auth: ClerkMiddlewareAuth, req: NextRequest) => {
  
  const { userId } = await auth();

  let MainUser = null;

  if(userId){
    const client = await clerkClient();
    MainUser = await client?.users.getUser(userId);
    const email =  MainUser.primaryEmailAddress?.emailAddress;

    if (email) {
      try {
        // absolute URL (important in middleware)
        const apiUrl = new URL("/api/v1/users/role", req.url);

        // use query param instead of body for GET
        apiUrl.searchParams.set("email", email);

        const getRoleRes = await fetch(apiUrl.toString(), { method: "GET" });
        const getRole = await getRoleRes.json();

        if (getRole.user?.role === "customer" && req.nextUrl.pathname.startsWith("/dashboard/admin")) {
          console.log("MW started for admin")
          const noAccessUrl = new URL("/dashboard", req.url); // redirect to main dashboard
          return NextResponse.redirect(noAccessUrl);
        }
        console.log("Role Response:", getRole);
      } catch (err) {
        console.error("Failed to fetch role:", err);
      }
    }
  }
  

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
    "/dashboard(.*)",
  ],
};
