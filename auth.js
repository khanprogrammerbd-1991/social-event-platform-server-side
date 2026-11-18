import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI);

export const auth = betterAuth({
  database: mongodbAdapter(client.db("socialeventDB")),
  secret: process.env.BETTER_AUTH_SECRET, 
  baseURL: process.env.BETTER_AUTH_URL,   
  trustedOrigins: ["https://social-event-website-frontend.vercel.app"], // Explicitly trust your Next.js frontend
  advanced: {
    defaultCookieAttributes: {
      sameSite: "none",
      secure: true
    }
  },
  
  emailAndPassword: {
    enabled: true, 
  },
});