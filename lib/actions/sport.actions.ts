"use server";

import {revalidatePath} from "next/cache";

import {
  CreateSportParams,
  UpdateSportParams,
  DeleteSportParams,
  GetAllSportsParams,
  GetSportsByUserParams,
  GetRelatedSportsByCategoryParams,
} from "@/types";

import User from "../models/user.model";
import Category from "../models/category.model";
import Sport from "../models/sport.model";
import {connectToDatabase} from "../database";
import {handleError} from "../utils";

const getCategoryByName = async (name: string) => {
  return Category.findOne({name: {$regex: name, $options: "i"}});
};

const populateSport = (query: any) => {
  return query
    .populate({
      path: "organizer",
      model: User,
      select: "_id firstName lastName",
    })
    .populate({path: "category", model: Category, select: "_id name"});
};

export async function createSport({userId, sport, path}: CreateSportParams) {
  try {
    await connectToDatabase();
    const organizer = await User.findById(userId);
    if (!organizer) throw new Error("Organizer not found");
    const newSport = await Sport.create({
      ...sport,
      category: sport.categoryId,
      organizer: userId,
    });
    revalidatePath(path);
    return JSON.parse(JSON.stringify(newSport));
  } catch (error) {
    handleError(error);
  }
}

export async function getSportById(sportId: string) {
  try {
    await connectToDatabase();
    const sport = await populateSport(Sport.findById(sportId));
    if (!sport) throw new Error("Sport not found");
    return JSON.parse(JSON.stringify(sport));
  } catch (error) {
    handleError(error);
  }
}

export async function updateSport({userId, sport, path}: UpdateSportParams) {
  try {
    await connectToDatabase();
    const sportToUpdate = await Sport.findById(sport._id);
    if (!sportToUpdate || sportToUpdate.organizer.toHexString() !== userId) {
      throw new Error("Unauthorized or sport not found");
    }
    const updatedSport = await Sport.findByIdAndUpdate(
      sport._id,
      {...sport, category: sport.categoryId},
      {new: true}
    );
    revalidatePath(path);
    return JSON.parse(JSON.stringify(updatedSport));
  } catch (error) {
    handleError(error);
  }
}

export async function deleteSport({sportId, path}: DeleteSportParams) {
  try {
    await connectToDatabase();
    const deletedSport = await Sport.findByIdAndDelete(sportId);
    if (deletedSport) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

export async function getAllSports({
  query,
  limit = 6,
  page,
  category,
}: GetAllSportsParams) {
  try {
    await connectToDatabase();
    const titleCondition = query ? {title: {$regex: query, $options: "i"}} : {};
    const categoryCondition = category
      ? await getCategoryByName(category)
      : null;
    const conditions = {
      $and: [
        titleCondition,
        categoryCondition ? {category: categoryCondition._id} : {},
      ],
    };
    const skipAmount = (Number(page) - 1) * limit;
    const sportsQuery = Sport.find(conditions)
      .sort({createdAt: "desc"})
      .skip(skipAmount)
      .limit(limit);
    const sports = await populateSport(sportsQuery);
    const sportsCount = await Sport.countDocuments(conditions);
    return {
      data: JSON.parse(JSON.stringify(sports)),
      totalPages: Math.ceil(sportsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

export async function getSportsByUser({
  userId,
  limit = 6,
  page,
}: GetSportsByUserParams) {
  try {
    await connectToDatabase();
    const conditions = {organizer: userId};
    const skipAmount = (page - 1) * limit;
    const sportsQuery = Sport.find(conditions)
      .sort({createdAt: "desc"})
      .skip(skipAmount)
      .limit(limit);
    const sports = await populateSport(sportsQuery);
    const sportsCount = await Sport.countDocuments(conditions);
    return {
      data: JSON.parse(JSON.stringify(sports)),
      totalPages: Math.ceil(sportsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

export async function getRelatedSportsByCategory({
  categoryId,
  sportId,
  limit = 3,
  page = 1,
}: GetRelatedSportsByCategoryParams) {
  try {
    await connectToDatabase();
    const skipAmount = (Number(page) - 1) * limit;
    const conditions = {$and: [{category: categoryId}, {_id: {$ne: sportId}}]};
    const sportsQuery = Sport.find(conditions)
      .sort({createdAt: "desc"})
      .skip(skipAmount)
      .limit(limit);
    const sports = await populateSport(sportsQuery);
    const sportsCount = await Sport.countDocuments(conditions);
    return {
      data: JSON.parse(JSON.stringify(sports)),
      totalPages: Math.ceil(sportsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}
