import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prismadb from "@/lib/prisma";
// import { comparePasswordHash } from "@/lib/helpers";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        let user = null;

        // logic to verify if the user exists
        user = await prismadb.user.findUnique({
          where: { email: credentials.username as string },
        });
        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.");
        }

        // logic to salt and hash password
        // const pwHash = comparePasswordHash(
        //   credentials.password as string,
        //   user.pwd
        // );

        // return user object with their profile data
        return user;
      },
    }),
  ],
});
