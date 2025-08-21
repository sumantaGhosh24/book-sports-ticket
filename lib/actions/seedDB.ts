"use server";

import {faker} from "@faker-js/faker";

import {connectToDatabase} from "../database";
import Category from "../models/category.model";
import Order from "../models/order.model";
import Sport from "../models/sport.model";

export async function seedDB() {
  try {
    connectToDatabase();

    console.log("Database seeding started...");

    console.log("Seeding categories...");
    const categories = [];
    const categoryNames = [
      "Cricket",
      "Football",
      "Basketball",
      "Volleyball",
      "Chess",
      "Baseball",
    ];
    for (let i = 0; i < 10; i++) {
      const name =
        categoryNames[i] || faker.lorem.word({length: {min: 5, max: 10}});
      const category = new Category({
        name: name,
      });
      categories.push(await category.save());
    }
    console.log(`Seeded ${categories.length} categories.`);

    console.log("Seeding sports...");
    const sports = [];
    for (let i = 0; i < 100; i++) {
      const randomCategory = faker.helpers.arrayElement(categories);
      const admin = "68a6aa15fc4a2cdc06db2466";
      const startDate = faker.date
        .future({years: 1})
        .toISOString()
        .split("T")[0];
      const endDate = faker.date
        .soon({days: faker.number.int({min: 1, max: 3}), refDate: startDate})
        .toISOString()
        .split("T")[0];

      const sport = new Sport({
        title: faker.book.title(),
        description: faker.commerce.productDescription(),
        location: faker.location.streetAddress(),
        createdAt: new Date(),
        imageUrl:
          "https://j4yuvj65gs.ufs.sh/f/025823cc-555c-4df2-96bf-2d8765e00e07-yhfs80.jpg",
        startDateTime: startDate,
        endDateTime: endDate,
        price: faker.commerce.price({min: 500, max: 5000}),
        url: faker.internet.url(),
        category: randomCategory._id,
        organizer: admin,
      });
      sports.push(await sport.save());
    }
    console.log(`Seeded ${sports.length} sports.`);

    console.log("Database seeding complete!");
  } catch (error: any) {
    throw new Error(`Failed to seed database: ${error.message}`);
  }
}
