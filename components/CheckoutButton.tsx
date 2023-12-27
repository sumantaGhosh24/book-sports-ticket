"use client";

import {SignedIn, SignedOut, useUser} from "@clerk/nextjs";
import {useRouter} from "next/navigation";

import {ISport} from "@/lib/models/sport.model";
import {RAZORPAY_KEY} from "@/constants/config";

import Checkout from "./Checkout";
import Logo from "../public/logo.png";

const CheckoutButton = ({sport}: {sport: ISport}) => {
  const {user} = useUser();
  const userId = user?.publicMetadata.userId as string;
  const hasSportFinished = new Date(sport.endDateTime) < new Date();

  const router = useRouter();

  const makePayment = async () => {
    const data = await fetch("http://localhost:3000/api/razorpay", {
      method: "POST",
      body: JSON.stringify({
        price: Number(sport.price) * 100,
      }),
    });
    const order = await data.json();
    const options = {
      key: RAZORPAY_KEY,
      name: "Book Sports Ticket",
      description: "Book your favorite match ticket.",
      currency: order.order.currency,
      amount: order.order.amount,
      order_id: order.order.id,
      image: Logo,
      handler: async function (response: any) {
        const data = await fetch("http://localhost:3000/api/paymentverify", {
          method: "POST",
          body: JSON.stringify({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            sport: sport._id,
            user: userId,
            totalPrice: order.order.amount,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const res = await data.json();
        if (res?.message == "success") {
          console.log("redirected.......");
          router.push("/profile");
        }
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function () {
      alert("Payment failed. Please try again. Contact support for help");
    });
  };

  return (
    <div className="flex items-center gap-3">
      {hasSportFinished ? (
        <p className="p-2 text-red-400 ml-5">
          Sorry, tickets are no longer available.
        </p>
      ) : (
        <>
          <SignedOut>
            <p className="text-center font-bold text-red-800">
              Login to book a ticket.
            </p>
          </SignedOut>
          <SignedIn>
            <Checkout makePayment={makePayment} />
          </SignedIn>
        </>
      )}
    </div>
  );
};

export default CheckoutButton;
