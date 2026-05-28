import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import User from "../src/infrastructure/database/models/user.model"
import { env } from "../src/config/envVars"

function generateFakeUsers(count: number) {
  const users = [];

  for (let i = 0; i < count; i++) {
    users.push({
      name: faker.person.fullName(),
      password: faker.internet.password({ length: 12 }), // Generates a secure random password string
      mobileNumber: parseInt(faker.string.numeric(10), 10), 
      email: faker.internet.email(),
    });
  }

  return users;
}

// 2. Main seeding function
async function seedDatabase() {
  const MONGO_URI = env.MONGOOSE_DB_URL || "mongodb://localhost:21017/your_database_name";

  try {
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);

    // Optional: Clear existing data
    console.log("🧹 Clearing old user data...");
    await User.deleteMany({});

    // Generate 50 fake users
    const totalUsersToSeed = 20;
    console.log(`🎲 Generating ${totalUsersToSeed} fake users...`);
    const fakeUsers = generateFakeUsers(totalUsersToSeed);
    const userDocuments = fakeUsers.map(user => new User(user));

    // Insert into DB
    console.log("🌱 Inserting data into database...");
    const result = await User.bulkSave(userDocuments);

    console.log(`🎉 Success! Seeded fake users into the database.`, result);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB.");
    process.exit(0);
  }
}

seedDatabase();