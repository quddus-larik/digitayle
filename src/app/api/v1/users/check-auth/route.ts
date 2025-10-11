"use server"
import { NextResponse } from "next/server";
import clientPromise from "@libs/mongodb";

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();
    const db = (await clientPromise).db("tech-nest");
    const users = db.collection("users");

    const existing = await users.findOne({ email });
    if (existing) {
      return NextResponse.json({ message: "User exists", user: existing });
    }

    const result = await users.insertOne({ name, email, role: "customer" });
    return NextResponse.json({ message: "User inserted", result });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
