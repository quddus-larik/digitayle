import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: true, message: "Email query param is required" },
        { status: 400 }
      );
    }

    const db = (await clientPromise).db("tech-nest");
    
    const collection = db.collection("users");

    const result = await collection.findOne({ email });

    if (!result) {
      return NextResponse.json(
        { error: true, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ error: false, user: result });
  } catch (err) {
    console.error("Error in /api/v1/users/role:", err);
    return NextResponse.json(
      { error: true, message: "Internal server error" },
      { status: 500 }
    );
  }
}
