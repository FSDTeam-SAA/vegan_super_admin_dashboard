import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { AdapterUser } from "@auth/core/adapters";

export type User = AdapterUser & {
  token: string;
  userId: string;
  role: string;
  accountType: string; // Assuming there are fixed possible roles
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials) return null;
        const user =
          typeof credentials.data === "string"
            ? JSON.parse(credentials.data)
            : credentials.data;

        if (!user) return null;

        return {
          id: user.userId, // Use userId as the id
          email: user.email,
          name: user.fullName,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/",
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
});
