import { connectMongoDB } from "@/lib/mongoose";
import User from "@/models/userschema";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      console.log("User", user);
      console.log("Account", account);
      if (account.provider === "google") {
        try {
          const { name, email } = user;
          await connectMongoDB();
          const userExist =  await User.findOne({email})
          
          if(!userExist){
            console.log(name);
            await fetch("http://localhost:3000/api/user", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name,
                email,
              }),
            });
          }
          
          
        } catch (error) {
          // Handle error here
          console.error(error);
        }
      }

      return user;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
