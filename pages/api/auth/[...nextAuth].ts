import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      //https://console.cloud.google.com/
    }),
    // ...add more providers here
  ],
  callbacks: {
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // console.log("url");
      // console.log(url);
      // console.log(baseUrl);
      return "/planters";
    },
  },
};
export default NextAuth(authOptions);
