import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/find-clinic(.*)",
  "/clinic(.*)" // Public viewer page
]);

const isPublicApiGetRoute = createRouteMatcher([
  "/api/clinics", // Base clinics list is public for the find-clinic page
  "/api/clinics/(.*)/queue" // Queue fetching is public (but anonymized in the route handler)
]);

export default clerkMiddleware(async (auth, req) => {
  // Allow explicitly defined public UI routes
  if (isPublicRoute(req)) {
    return;
  }
  
  // Allow GET requests to specific public APIs (like fetching the clinic list or the queue)
  if (isPublicApiGetRoute(req) && req.method === "GET") {
    return;
  }

  // Everything else (including POST /api/clinics, the dashboard, etc.) requires authentication
  await auth.protect();
});

export const config = {
  matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)", "/(api|trpc)(.*)"],
};
