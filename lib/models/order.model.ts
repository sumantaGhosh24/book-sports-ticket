import {Schema, model, models, Document} from "mongoose";

export interface IOrder extends Document {
  sport: {
    _id: string;
    title: string;
  };
  buyer: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  paymentResult: {
    id: string;
    status: string;
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  };
  orderStatus: "pending" | "completed" | "cancelled" | "refund";
  totalPrice: number;
  isPaid: boolean;
  paidAt: Date;
}

export type IOrderItem = {
  _id: string;
  sportId: string;
  buyer: string;
  paymentResult: {
    id: string;
    status: string;
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  };
  orderStatus: "pending" | "completed" | "cancelled" | "refund";
  totalPrice: number;
  isPaid: boolean;
  paidAt: Date;
};

const OrderSchema = new Schema({
  sport: {
    type: Schema.Types.ObjectId,
    ref: "Sport",
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  paymentResult: {
    id: {type: String},
    status: {type: String},
    razorpay_order_id: {type: String},
    razorpay_payment_id: {type: String},
    razorpay_signature: {type: String},
  },
  orderStatus: {
    type: String,
    enum: ["pending", "completed", "cancelled", "refund"],
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false,
  },
  paidAt: {
    type: Date,
  },
});

const Order = models.Order || model("Order", OrderSchema);

export default Order;
