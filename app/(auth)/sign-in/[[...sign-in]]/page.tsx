import type {Metadata} from "next";
import {SignIn} from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Login",
};

export default function Page() {
  return <SignIn />;
}
