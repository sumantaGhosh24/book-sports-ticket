import {NextResponse} from "next/server";
import crypto from "crypto";

import {connectToDatabase} from "@/lib/database";
import Order from "@/lib/models/order.model";

export async function POST(req: Request, res: Response) {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    sport,
    user,
    totalPrice,
  } = await req.json();

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(body.toString())
    .digest("hex");
  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    await connectToDatabase();
    var date_time = new Date();
    await Order.create({
      buyer: user,
      sport: sport,
      paymentResult: {
        id: razorpay_order_id,
        status: "success",
        razorpay_order_id: razorpay_order_id,
        razorpay_payment_id: razorpay_payment_id,
        razorpay_signature: razorpay_signature,
      },
      orderStatus: "completed",
      totalPrice: Number(totalPrice / 100),
      isPaid: true,
      paidAt: date_time,
    });
  } else {
    return NextResponse.json({message: "fail"}, {status: 400});
  }

  return NextResponse.json({message: "success"}, {status: 200});
}
