"use server";

import {revalidatePath} from "next/cache";

import {CreateUserParams, UpdateUserParams} from "@/types";

import {connectToDatabase} from "../database";
import Order from "../models/order.model";
import Sport from "../models/sport.model";
import User from "../models/user.model";
import {handleError} from "../utils";

export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

export async function getUserById(userId?: string) {
  try {
    await connectToDatabase();
    if (!userId) throw new Error("User id not found.");
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found.");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

export async function getUserByClerkId(userId?: string) {
  try {
    await connectToDatabase();
    if (!userId) return {userInfo: {role: "guest"}};
    const user = await User.findOne({clerkId: userId});
    if (!user) throw new Error("User not found.");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase();
    const updatedUser = await User.findOneAndUpdate({clerkId}, user, {
      new: true,
    });
    if (!updatedUser) throw new Error("User update failed.");
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();
    const userToDelete = await User.findOne({clerkId});
    if (!userToDelete) {
      throw new Error("User not found");
    }
    await Promise.all([
      Sport.updateMany(
        {_id: {$in: userToDelete.sports}},
        {$pull: {organizer: userToDelete._id}}
      ),
      Order.updateMany({_id: {$in: userToDelete.orders}}, {$unset: {buyer: 1}}),
    ]);
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");
    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}
