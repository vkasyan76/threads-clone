// Resource: https://clerk.com/docs/references/nextjs/clerk-middleware
// Copy the middleware code as it is from the above resource

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/forum(.*)"]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

// export default clerkMiddleware();

// export const config = {
//   // The following matcher runs middleware on all routes
//   // except static assets.
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };

// next-int integration:

// https://next-intl-docs.vercel.app/docs/routing/middleware#example-integrating-with-clerk

// Resource: https://clerk.com/docs/nextjs/middleware#auth-middleware
// Copy the middleware code as it is from the above resource

// clerk 4 middleware:

// import { authMiddleware } from "@clerk/nextjs";

// export default authMiddleware({
//   // An array of public routes that don't require authentication.
//   publicRoutes: ["/api/webhook/clerk"],

//   // An array of routes to be ignored by the authentication middleware.
//   ignoredRoutes: ["/api/webhook/clerk"],
// });

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };
