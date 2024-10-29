import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function logActivity(email: string, activityType: string) {
  try {
    const result = await supabase
      .from("emails")
      .insert({ email, activity_type: activityType });
    console.log("result:", JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("Error logging activity to Supabase:");
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    } else {
      console.error("Unexpected error:", error);
    }
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  events: {
    async signIn(message) {
      if (message.user.email) {
        await logActivity(message.user.email, "sign_in");
      }
    },
    async createUser(message) {
      if (message.user.email) {
        await logActivity(message.user.email, "sign_up");
      }
    },
  },
});

export { handler as GET, handler as POST };
