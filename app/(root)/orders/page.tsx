import type {Metadata} from "next";
import {currentUser} from "@clerk/nextjs";
import {redirect} from "next/navigation";

import {SearchParamProps} from "@/types";
import {getUserByClerkId} from "@/lib/actions/user.actions";
import {getAllOrders} from "@/lib/actions/order.actions";
import CollectionTable from "@/components/CollectionTable";

export const metadata: Metadata = {
  title: "Manage Orders",
};

const Orders = async ({searchParams}: SearchParamProps) => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await getUserByClerkId(user.id);
  if (userInfo.role !== "admin") redirect("/");

  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const allOrders = await getAllOrders({page: ordersPage});

  return (
    <>
      <div className="bg-white px-4 py-8 mt-10 rounded shadow">
        <section className="text-left mb-8">
          <h2 className="text-3xl font-bold mb-2">All Orders</h2>
          <p className="text-gray-600">All booked ticket.</p>
        </section>
        <CollectionTable
          data={allOrders?.data}
          emptyTitle="You don't have any ticket yet."
          limit={5}
          page={ordersPage}
          urlParamName="ordersPage"
          totalPages={allOrders?.totalPages}
          type="admin"
        />
      </div>
    </>
  );
};

export default Orders;
