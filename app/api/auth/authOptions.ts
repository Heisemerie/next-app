import { prisma } from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      //used to generate the form
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        //check if credentials have email and password
        if (!credentials?.email || !credentials.password) return null;

        //check if user exists in the database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        //if the user doesn't exist return null
        if (!user) return null;

        //if the user exists, compare the password with the one from the database
        //make sure to have a hashedPassword field in the user schema
        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword! //user should have a hashed password at this point
        );

        //if the passwords match, return user object otherwise return null
        return passwordsMatch ? user : null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
};
