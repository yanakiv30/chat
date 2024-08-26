import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { NextAuthOptions } from "next-auth"

const googleClientId = process.env.AUTH_GOOGLE_ID;
const googleClientSecret = process.env.AUTH_GOOGLE_SECRET;

if (!googleClientId || !googleClientSecret) {
  throw new Error("Google OAuth credentials are not set in environment variables.");
}

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      return `${baseUrl}/account`
    },
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt" as const,
  },
  events: {
    async signIn(message) {
      console.log("User signed in:", message);
    },
    async signOut(message) {
      console.log("User signed out:", message);
    },
    async createUser(message) {
      console.log("User created:", message);
    },
    async linkAccount(message) {
      console.log("Account linked:", message);
    },
    async session(message) {
      console.log("Session created:", message);
    },
  },
};

// This is the auth function that you'll use in your application
export const auth = (options?: any) => NextAuth(authOptions);

// Handler for API routes
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };