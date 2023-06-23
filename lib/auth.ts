import {NextAuthOptions} from "next-auth";
import GitHubProvider from "next-auth/providers/github"
import 'dotenv/config'
import {db} from "@/lib/db";
import {eq} from "drizzle-orm";
import {PlanetScaleAdapter} from "@/lib/db/lib/drizzle-adapter";
import {User, users} from "@/lib/db/schema/users/schema";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  adapter: PlanetScaleAdapter(db),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({token, session}) {
      if (token) {
        (session.user! as any).id = token.id
        session.user!.name = token.name
        session.user!.email = token.email
      }

      return session
    },
    async jwt({token, user}) {
      const dbUser: User = await db.select().from(users).where(eq(users.email, token.email || ''))

      if (!dbUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
      }
    },
  },
}
