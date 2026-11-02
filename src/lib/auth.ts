import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";

import { jwt } from "better-auth/plugins"


const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error(
    "MONGODB_URI is not set. Add your MongoDB connection string to .env.",
  );
}

// Reuse the client across hot reloads so `next dev` doesn't leak connections.
const globalForMongo = globalThis as unknown as {
  mongoClient?: MongoClient;
};

const client = globalForMongo.mongoClient ?? new MongoClient(uri);

if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongoClient = client;
}

const db = client.db("B14_A8_Events_Management");

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [
        jwt(), 
    ],
    session: {
      cookieCache:{
        enabled: true,
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60, // 7 days
      }
    },  
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },

  // Google and GitHub login.
  // Add the client IDs and secrets to your .env file.
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_AUTH_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_AUTH_CLIENT_ID as string,
      clientSecret: (process.env.GITHUB_AUTH_CLIENT_SECRET ??
        process.env.GITHUB_AUTH_CLIENT_SECRETS) as string,
    },
  },
});
