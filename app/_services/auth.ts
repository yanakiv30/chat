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
        // Пренасочване към /account след успешна автентикация
        return `${baseUrl}/account`
      },
    },
}

export const {auth, handlers:{GET, POST}} = NextAuth(authConfig);