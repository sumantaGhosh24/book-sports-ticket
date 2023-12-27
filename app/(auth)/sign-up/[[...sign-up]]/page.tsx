import type {Metadata} from "next";
import {SignUp} from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Register",
};

export default function Page() {
  return <SignUp />;
}
