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
    debug: process.env.NODE_ENV === "development", 

  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt" as const, 
  },

  events: {

    async signIn({ user, account, profile, email, credentials }: any) {
      //console.log("User signed in:", { user, account, profile, email, credentials });
    },

    async error({ error }: { error: Error }) {
      //console.error("An error occurred:", error);
    },
  },
};

export const { auth, handlers: { GET, POST } } = NextAuth(authConfig);