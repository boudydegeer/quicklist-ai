import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error, data } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      // Ensure profile exists for new users
      const { data: existingProfile } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", data.user.id)
        .single();

      if (!existingProfile) {
        await supabase.from("profiles").insert({
          id: data.user.id,
          email: data.user.email ?? "",
          plan: "free",
          generations_used: 0,
          generations_limit: 5,
        });
      }

      return NextResponse.redirect(origin + next);
    }
  }

  return NextResponse.redirect(origin + "/auth/login?error=Could not authenticate");
}
