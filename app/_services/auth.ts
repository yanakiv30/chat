import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

const googleClientId = process.env.AUTH_GOOGLE_ID;
const googleClientSecret = process.env.AUTH_GOOGLE_SECRET;
const githubClientId = process.env.AUTH_GITHUB_ID;
const githubClientSecret = process.env.AUTH_GITHUB_SECRET;

if (!googleClientId || !googleClientSecret) {
  throw new Error(
    "Missing Google OAuth credentials. Please set AUTH_GOOGLE_ID and AUTH_GOOGLE_SECRET."
  );
}

if (!githubClientId || !githubClientSecret) {
  throw new Error(
    "Missing GitHub OAuth credentials. Please set AUTH_GITHUB_ID and AUTH_GITHUB_SECRET."
  );
}

const authConfig = {
  providers: [
    Google({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
    GitHub({
      clientId: githubClientId,
      clientSecret: githubClientSecret,
    }),
  ],
  callbacks: {
    async jwt({ token, account }: { token: any; account: any }) {
      if (account) {
        token.providerId = account.providerAccountId;
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user.providerId = token.providerId;
      session.user.provider = token.provider;
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