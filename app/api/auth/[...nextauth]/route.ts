import { connectMongoDB } from "@/lib/mongoose";
import User from "@/models/userschema";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { signJwtAccessToken } from "@/lib/jwt";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials" || "",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await connectMongoDB();
          const user = await User.findOne({ email });
          if (!user) {
            return null;
          }
          return user;
        } catch (error) {
          console.error(error);
        }
      },
    }),
  ],
  sessions: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user, account }) {
      console.log("User", user);
      console.log("Account", account);
      if (account.provider === "google") {
        try {
          const { name, email, image } = user;
          await connectMongoDB();
          const userExist = await User.findOne({ email });

          if (!userExist) {
            console.log(name);
            await fetch("api/user", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name,
                email,
                image,
              }),
            });
          }
          const jwtToken = signJwtAccessToken({ name, email, image }); 
          return Promise.resolve({ ...user, jwt: jwtToken }); 
        } catch (error) {
          console.error(error);
        }
      }

      return Promise.resolve(user);
    },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
