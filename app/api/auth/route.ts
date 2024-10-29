import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  const { email, password, mode } = await request.json();

  try {
    if (mode === "login") {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return NextResponse.json({ user: data.user });
    } else if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      return NextResponse.json({ user: data.user });
    } else if (mode === "logout") {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return NextResponse.json({ message: "Logged out successfully" });
    } else if (mode === "requestReset") {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/profile`,
      });
      if (error) throw error;
      return NextResponse.json({ message: "Password reset email sent" });
    } else if (mode === "updatePassword") {
      const { data, error } = await supabase.auth.updateUser({
        password: password,
      });
      if (error) throw error;
      return NextResponse.json({ message: "Password updated successfully" });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
