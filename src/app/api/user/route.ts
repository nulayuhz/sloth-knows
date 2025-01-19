import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  const userSchema = z.object({
    username: z.string().min(1, "Username is required").max(30),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z.string().min(8, "Password must have at least 8 characters"),
  });
  try {
    const body = await req.json();
    const { email, username, password } = userSchema.parse(body);
    const existingUserByEmail = await db.user.findUnique({
      where: { email },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        {
          user: null,
          message: "User with this email already exists",
        },
        { status: 409 }
      );
    }

    const existingUserByUsername = await db.user.findUnique({
      where: { username },
    });
    if (existingUserByUsername) {
      return NextResponse.json(
        {
          user: null,
          message: "User with this username already exists",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: { email, username, password: hashedPassword },
    });
    const { password: pswd, ...user } = newUser;
    return NextResponse.json(
      { user, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
