import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const googleClientId = process.env.AUTH_GOOGLE_ID;
const googleClientSecret = process.env.AUTH_GOOGLE_SECRET;

if (!googleClientId || !googleClientSecret) {
  throw new Error(
    "Missing Google OAuth credentials. Please set AUTH_GOOGLE_ID and AUTH_GOOGLE_SECRET."
  );
}

const authConfig = {
  providers: [
    Google({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
  ],
  callbacks: {
    async jwt({ token, account }: { token: any; account: any }) {
      if (account) {
        token.googleId = account.providerAccountId;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user.googleId = token.googleId;
      return session;
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      return `${baseUrl}/account`;
    },
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt" as const,
  },
  events: {
    async signIn({ user, account, profile, email, credentials }: any) {},
    async error({ error }: { error: Error }) {},
  },
};

export const {
  auth,
  handlers: { GET, POST },
} = NextAuth(authConfig);
