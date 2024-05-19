
import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import { verifyPassword } from "./auth";
import validator from 'validator';

import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {

                
                if (!credentials || typeof credentials.email !== 'string' || typeof credentials.password !== 'string') {
                    throw new Error("Credentials are invalid");
                }

                const sanitizedEmail = validator.normalizeEmail(credentials.email);
                if (!sanitizedEmail || !validator.isEmail(sanitizedEmail)) {
                    throw new Error("Invalid email format");
                }
                
                const user = await prisma.user.findUnique({
                    where: { email: sanitizedEmail }
                })

                if (!user || typeof user.password !== 'string' || !(await verifyPassword(credentials.password, user.password))) {
                    throw new Error("Invalid email or password");
                }

                return {
                    id: user?.id,
                    name: user?.name,
                    email: user?.email,
                };
            },
        }),
    ],
    callbacks: {
        jwt: async ({ user, token, trigger, session }) => {
            if (trigger === "update") {
                return { ...token, ...session.user };
            }
            return { ...token, ...user };
        },
    },
};