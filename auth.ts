import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) {
        return false;
      }

      const { Prisma } = await import("./lib/prisma");

      const googleId = account?.providerAccountId ?? null;
      const existingUser = await Prisma.users.findUnique({
        where: { email: user.email },
      });

      let dbUser = existingUser;
      if (!dbUser) {
        dbUser = await Prisma.users.create({
          data: {
            email: user.email,
            createdAt: new Date(),
            name: user.name,
            google_id: googleId,
          },
        });
      } else if (googleId && !dbUser.google_id) {
        dbUser = await Prisma.users.update({
          where: { email: user.email },
          data: { google_id: googleId },
        });
      }

      return true;
    },
  },
});
