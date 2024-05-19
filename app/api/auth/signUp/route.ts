import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

import { z } from 'zod';
import validator from 'validator';

const prisma = new PrismaClient();

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export async function POST(request: Request) {
  try {
    const { name, email, password } = userSchema.parse(await request.json());

    const sanitizedEmail = validator.normalizeEmail(email) as string;

    const existingUser = await prisma.user.findUnique({
      where: { email: sanitizedEmail},
    });

    if (existingUser) {
      throw { message: 'User exists already!', status: 422 };
    }

    const bcrypt = require("bcrypt");
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email: sanitizedEmail,
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