"use server";

import {GetOrdersByUserParams} from "@/types";

import {connectToDatabase} from "../database";
import Order from "../models/order.model";
import {handleError} from "../utils";
import Sport from "../models/sport.model";
import User from "../models/user.model";

export async function getOrdersByUser({
  userId,
  limit = 3,
  page,
}: GetOrdersByUserParams) {
  try {
    await connectToDatabase();
    const skipAmount = (Number(page) - 1) * limit;
    const conditions = {buyer: userId};
    const orders = await Order.distinct("sport._id")
      .find(conditions)
      .sort({createdAt: "desc"})
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: "sport",
        model: Sport,
        populate: {
          path: "organizer",
          model: User,
          select: "_id firstName lastName",
        },
      });
    const ordersCount = await Order.distinct("sport._id").countDocuments(
      conditions
    );
    return {
      data: JSON.parse(JSON.stringify(orders)),
      totalPages: Math.ceil(ordersCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

export async function getAllOrders({
  limit = 5,
  page,
}: {
  limit?: number;
  page?: number;
}) {
  try {
    await connectToDatabase();
    const skipAmount = (Number(page) - 1) * limit;
    const orders = await Order.distinct("sport._id")
      .find()
      .sort({createdAt: "desc"})
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: "sport",
        model: Sport,
        populate: {
          path: "organizer",
          model: User,
          select: "_id firstName lastName",
        },
      })
      .populate({path: "buyer", model: User, select: "_id firstName lastName"});
    const ordersCount = await Order.distinct("sport._id").countDocuments();
    return {
      data: JSON.parse(JSON.stringify(orders)),
      totalPages: Math.ceil(ordersCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}
