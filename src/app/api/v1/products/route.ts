import clientPromise from "@libs/mongodb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
 
  const { searchParams } = new URL(req.url);

  const category = searchParams.get("category");
  const brand = searchParams.get("brand");

  const client = await clientPromise;
  const db = client.db("tech-nest");

  let productCollections;

  if (category === "phones") {
    productCollections = await db
      .collection("products")
      .find(brand ? { brand } : {})
      .toArray();
  }

  if (category === "laptops") {
    productCollections = await db
      .collection("products")
      .find(brand ? { brand } : {})
      .toArray();
  }

  return NextResponse.json(productCollections ?? []);
}
