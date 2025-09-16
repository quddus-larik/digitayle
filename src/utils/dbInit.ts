import clientPromise from "@libs/mongodb";

export async function initCollections() {
  const client = await clientPromise;
  const db = client.db("tech-nest");

  const collections = await db.listCollections({ name: "users" }).toArray();
  if (collections.length === 0) {
    await db.createCollection("users");
    await db.collection("users").createIndex({ email: 1 }, { unique: true });
    console.log("✅ 'users' collection created with index on email.");
  }

  return db.collection("users");
}
