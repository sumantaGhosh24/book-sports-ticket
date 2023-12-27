import type {Metadata} from "next";
import {redirect} from "next/navigation";
import {currentUser} from "@clerk/nextjs";

import {getUserByClerkId} from "@/lib/actions/user.actions";
import {getSportById} from "@/lib/actions/sport.actions";
import SportForm from "@/components/SportForm";

export const metadata: Metadata = {
  title: "Update Sport",
};

type UpdateSportProps = {
  params: {
    id: string;
  };
};

const UpdateSport = async ({params: {id}}: UpdateSportProps) => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await getUserByClerkId(user.id);
  if (userInfo.role !== "admin") redirect("/");
  const userId = userInfo._id;

  const sport = await getSportById(id);

  return (
    <div className="bg-white px-4 py-8 mt-10 rounded shadow">
      <section className="text-left mb-8">
        <h2 className="text-3xl font-bold mb-2">Update Sport Day</h2>
        <p className="text-gray-600">Update a sport for user can buy ticket.</p>
      </section>
      <SportForm
        type="Update"
        sport={sport}
        sportId={sport._id}
        userId={userId}
      />
    </div>
  );
};

export default UpdateSport;
