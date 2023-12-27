import type {Metadata} from "next";
import {Roboto} from "next/font/google";
import {ClerkProvider} from "@clerk/nextjs";
import Script from "next/script";

import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Book Sports Ticket",
    default: "Book Sports Ticket",
  },
  description: "Book your favorite sports ticket.",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={roboto.className}>{children}</body>
      </html>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </ClerkProvider>
  );
}
