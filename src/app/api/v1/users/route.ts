import { initCollections } from "@/app/utils/dbInit";
import { type NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: true, message: "Email query parameter is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("tech-nest");
    const users = db.collection("users");

    const user = await users.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: true, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ error: false, user });
  } catch (err) {
    console.error("GET /api/v1/users error:", err);
    return NextResponse.json(
      { error: true, message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, country, city, street, zip, phone, wa_number, username } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    const db = (await clientPromise).db("tech-nest");
    const userCollection = db.collection("users");

    const result = await userCollection.updateOne(
      { email }, // filter
      {
        $set: {
          contact: {
            phone,
            wa_number,
          },
          address: {
            country,
            city,
            street,
            zip,
          },
          username
        },
      },
      { upsert: true } // create new if not exists
    );

    // Return updated document
    const updatedUser = await userCollection.findOne({ email });

    return NextResponse.json({ success: true, user: updatedUser, result });
  } catch (err) {
    console.error("Error updating user:", err);
    return NextResponse.json(
      { success: false, error: "Failed to update user" },
      { status: 500 }
    );
  }
}


