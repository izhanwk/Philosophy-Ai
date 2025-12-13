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
    async signIn({ user }) {
      // Load Prisma only inside the callback so middleware (Edge) stays Node-free.
      const { Prisma } = await import("./lib/prisma");

      const existingUser = await Prisma.users.findUnique({
        where: { email: user.email! },
      });
      if (!existingUser) {
        await Prisma.users.create({
          data: {
            email: user.email!,
            createdAt: new Date(),
            name: user.name,
          },
        });
      }

      return true;
    },
  },
});
