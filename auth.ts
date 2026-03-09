import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user?.email) {
        token.email = user.email;
        console.log("our token = ", token);
      }
      if (user?.name) {
        token.name = user.name;
        console.log("our token = ", token);
      }
      if (account?.providerAccountId) {
        token.googleId = account.providerAccountId;
        console.log("our token = ", token);
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        console.log("session : ", session.user);
        if (token?.email) {
          session.user.email = token.email as string;
        }
        if (token?.name) {
          session.user.name = token.name as string;
        }
        if (token?.sub) {
          (session.user as { id?: string }).id = token.sub as string;
        }
      }
      return session;
    },
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
