import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  const body = await request.json();

  //check if the request matches the schema
  const validation = schema.safeParse(body);

  //if not return the error and set status to 400
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  //check if the user exists in the database
  const user = await prisma.user.findUnique({ where: { email: body.email } });

  //if the user exists, return a message and set the status to 400
  if (user)
    return NextResponse.json({ error: "User already exists" }, { status: 400 });

  //otherwise create the user (using a hashed password)
  const hashedPassword = await bcrypt.hash(body.password, 10);
  const newUser = await prisma.user.create({
    data: { email: body.email, hashedPassword },
  });

  return NextResponse.json({ email: newUser.email });
}
