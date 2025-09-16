import { MongoClient } from "mongodb";

const uri =
  process.env.NODE_ENV === "production"
    ? (process.env.MONGO_URI as string)
    : "mongodb://localhost:27017";

const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGO_URI && process.env.NODE_ENV === "production") {
  console.warn("⚠️ MONGO_URI is not set! Database will not connect in production.");
}

declare global {
  // For hot-reloading in Next.js (avoid multiple connections)
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
