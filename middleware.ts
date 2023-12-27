import {authMiddleware} from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/sports/:id",
    "/api/webhook/clerk",
    "/api/razorpay",
    "/api/paymentverify",
    "/api/uploadthing",
  ],
  ignoredRoutes: [
    "/api/webhook/clerk",
    "/api/razorpay",
    "/api/paymentverify",
    "/api/uploadthing",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
