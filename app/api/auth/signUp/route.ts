import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    console.log({email,password})

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw { message: 'User exists already!', status: 422 };
    }

    const bcrypt = require("bcrypt");
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      },
    });

    return NextResponse.json({ success: "Account created" }, { status: 200 })

  } catch (error: any) {
    if (error.status) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }  
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}