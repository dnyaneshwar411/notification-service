import { faker } from "@faker-js/faker";
import mongoose, { Types } from "mongoose";
import Notification from "../src/infrastructure/database/models/notification.model"
import { env } from "../src/config/envVars";

// Helper to generate a realistic sequence of status history
function generateStatusTimeline(status: string) {
  const created = faker.date.recent({ days: 30 }); // Sometime in the last 30 days
  const timeline: Record<string, Date> = { created };

  if (status === "created") return timeline;

  // Add received time (a few seconds after creation)
  const received = new Date(created.getTime() + faker.number.int({ min: 1000, max: 5000 }));
  timeline.received = received;
  if (status === "received") return timeline;

  // Add read time (somewhere between 5 mins and 5 hours after receiving)
  const read = new Date(received.getTime() + faker.number.int({ min: 300000, max: 18000000 }));
  timeline.read = read;
  if (status === "read") return timeline;

  // Add deleted time (somewhere between 1 and 3 days after reading)
  const deleted = new Date(read.getTime() + faker.number.int({ min: 86400000, max: 259200000 }));
  timeline.deleted = deleted;
  
  return timeline;
}

export const seedDynamicNotifications = async (count = 50) => {
  const seeds = [];

  for (let i = 0; i < count; i++) {
    // 1. Pick a random category and status from your schema enums
    const category = faker.helpers.arrayElement(["system", "promotional"]);
    const status = faker.helpers.arrayElement(["created", "received", "read", "deleted"]);
    
    // 2. Decide if it has a dynamic entity model attached
    const hasEntity = faker.datatype.boolean(0.7); // 70% chance to have a related model
    const entityModel = hasEntity ? faker.helpers.arrayElement(["Order", "POST", "Comment"]) : undefined;
    const entityId = entityModel ? new Types.ObjectId() : undefined;

    // 3. Generate content variations based on the entity model context
    let subject = faker.company.catchPhrase();
    let message = faker.lorem.sentence();

    if (entityModel === "Order") {
      subject = `📦 Order Status Update: #${faker.number.int({ min: 10000, max: 99999 })}`;
      message = `Your order for the "${faker.commerce.productName()}" has changed status to ${faker.helpers.arrayElement(['shipped', 'delivered', 'processed'])}.`;
    } else if (entityModel === "POST") {
      subject = `🔥 Your post is trending!`;
      message = `${faker.person.fullName()} and ${faker.number.int({ min: 2, max: 50 })} others liked your post about "${faker.word.sample()}".`;
    } else if (entityModel === "Comment") {
      subject = `💬 New reply from ${faker.person.firstName()}`;
      message = `"${faker.lorem.sentence()}"`;
    } else if (category === "promotional") {
      subject = `⚡ Flash Sale: ${faker.helpers.arrayElement(['30%', '50%', '70%'])} OFF!`;
      message = `Don't miss out on today's deals for premium tiers. Use code ${faker.finance.currencyCode()}50.`;
    }

    // 4. Assemble the schema mock payload
    seeds.push({
      recipient: new Types.ObjectId(), // Simulating a User ID
      actor: faker.datatype.boolean(0.8) ? new Types.ObjectId() : undefined, // 80% chance of a triggering user
      entity: entityId,
      entityModel: entityModel,
      category: category,
      status: status,
      statusTimeLine: generateStatusTimeline(status),
      groupKey: entityId ? `group_key_${entityModel?.toLowerCase()}_${entityId}` : `promo_${faker.string.alphanumeric(8)}`,
      subject: subject,
      message: message,
    });
  }

  try {
    await Notification.deleteMany({});
    console.log("🧹 Cleared existing notifications.");

    await Notification.insertMany(seeds);
    console.log(`🌱 Successfully seeded database with ${count} fake notifications!`);
  } catch (error) {
    console.error("❌ Seeding with Faker failed:", error);
  }
};

;(async function(){
  console.time("seeding")
  const MONGO_URI = env.MONGOOSE_DB_URL || "mongodb://localhost:21017/your_database_name";
  console.log("⏳ Connecting to MongoDB...");
  await mongoose.connect(MONGO_URI);
  await seedDynamicNotifications(10000)
  console.timeEnd("seeding")
})()