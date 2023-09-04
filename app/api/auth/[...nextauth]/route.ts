import { connectMongoDB } from "@/lib/mongoose";
import User from "@/models/userschema";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name:"Credentials" || "",
      credentials:{},
      async authorize(credentials){
        const {email,password}=credentials;
        try {
          await connectMongoDB()
          const user = await User.findOne({email})
          if(!user){
            return null
          }
          return user
        } catch (error) {
          console.log("error")
        }
       

      }
    })
  ],
  sessions:{
    strategy:"jwt"
  },
  secret:process.env.NEXTAUTH_SECRET,

  
  callbacks: {
    async signIn({ user, account }) {
      console.log("User", user);
      console.log("Account", account);
      if (account.provider === "google") {
        try {
          const { name, email,image } = user;
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
                image,
              }),
            });
          }
          
          
        } catch (error) {
          
          console.error(error);
        }
      }

      return user;
    },
  },
  pages:{
    signIn:"/"
  }
  
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };