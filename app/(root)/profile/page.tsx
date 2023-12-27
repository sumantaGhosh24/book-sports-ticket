import type {Metadata} from "next";
import {currentUser} from "@clerk/nextjs";

import {SearchParamProps} from "@/types";
import {getOrdersByUser} from "@/lib/actions/order.actions";
import {getSportsByUser} from "@/lib/actions/sport.actions";
import Collection from "@/components/Collection";
import CollectionTable from "@/components/CollectionTable";
import {getUserByClerkId} from "@/lib/actions/user.actions";

export const metadata: Metadata = {
  title: "Profile",
};

const ProfilePage = async ({searchParams}: SearchParamProps) => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await getUserByClerkId(user.id);
  const userId = userInfo._id;

  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const sportsPage = Number(searchParams?.sportsPage) || 1;

  const myOrders = await getOrdersByUser({userId, page: ordersPage});

  const organizedSports = await getSportsByUser({userId, page: sportsPage});

  return (
    <>
      <div className="bg-white px-4 py-8 mt-10 rounded shadow">
        <section className="text-left mb-8">
          <h2 className="text-3xl font-bold mb-2">My Orders</h2>
          <p className="text-gray-600">All your booked ticket.</p>
        </section>
        <CollectionTable
          data={myOrders?.data}
          emptyTitle="You don't have any ticket yet."
          limit={5}
          page={ordersPage}
          urlParamName="ordersPage"
          totalPages={myOrders?.totalPages}
          type="any"
        />
      </div>
      {userInfo.role === "admin" && (
        <div className="bg-white px-4 py-8 my-10 rounded shadow">
          <section className="text-left mb-8">
            <h2 className="text-3xl font-bold mb-2">My Organized Matches</h2>
            <p className="text-gray-600">All match where you have organizer.</p>
            <div>
              <Collection
                data={organizedSports?.data}
                emptyTitle="You don't organized any sports yet."
                emptyStateSubtext="Organize one to see here."
                collectionType="Sports_Organized"
                limit={3}
                page={sportsPage}
                urlParamName="sportsPage"
                totalPages={organizedSports?.totalPages}
              />
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
