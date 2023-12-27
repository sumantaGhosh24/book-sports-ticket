import type {Metadata} from "next";
import {currentUser} from "@clerk/nextjs";
import {redirect} from "next/navigation";

import {getUserByClerkId} from "@/lib/actions/user.actions";
import SportForm from "@/components/SportForm";

export const metadata: Metadata = {
  title: "Create Sport",
};

export default async function CreateSport() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await getUserByClerkId(user.id);
  if (userInfo.role !== "admin") redirect("/");
  const userId = userInfo._id;

  return (
    <div className="bg-white px-4 py-8 mt-10 rounded shadow">
      <section className="text-left mb-8">
        <h2 className="text-3xl font-bold mb-2">Create Sport Day</h2>
        <p className="text-gray-600">Create a sport for user can buy ticket.</p>
      </section>
      <SportForm userId={userId} type="Create" />
    </div>
  );
}
