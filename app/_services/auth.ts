import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
 
const authConfig={
    providers:[
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET
        })
    ],
    callbacks: {
      async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {        
        return `${baseUrl}/account`
      },
    },
    debug: process.env.NODE_ENV === "development", // Enable debug mode in development

  secret: process.env.NEXTAUTH_SECRET, // Secret for signing JWT or encryption

  session: {
    strategy: "jwt" as const, // Specify the exact allowed type
  },

  events: {
    // Sign-in event handler
    async signIn({ user, account, profile, email, credentials }: any) {
      console.log("User signed in:", { user, account, profile, email, credentials });
    },

    // Error event handler
    async error({ error }: { error: Error }) {
      console.error("An error occurred:", error);
    },
  },
};

export const { auth, handlers: { GET, POST } } = NextAuth(authConfig);