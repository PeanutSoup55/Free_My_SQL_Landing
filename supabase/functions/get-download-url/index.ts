// supabase/functions/get-download-url/index.ts
//
// Called from AccountPage.tsx. Checks the caller's JWT and looks up their
// subscription status server-side, then — only if active — returns the
// download URL for the real installer.
//
// This version points at an UNLISTED GitHub Release (not linked anywhere
// on the public site, so it's only discoverable through this gated flow).
// Note the tradeoff vs. a signed Storage URL: this link doesn't expire,
// so someone who captures it could reuse/share it without re-checking
// their subscription. Fine for now — upgrade to a private-repo + token
// fetch later if you want a harder gate.
//
// Update DOWNLOAD_URL below to point at your actual release asset.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

// TODO: point this at an unlisted release/tag — not the same one linked
// from the public beta download button.
const DOWNLOAD_URL =
  "https://github.com/PeanutSoup55/FreeMy-SQL/releases/download/v2.0/Free_My_SQL_Setup-1.0.exe";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return json({ error: "Missing Authorization header" }, 401);
    }

    const jwt = authHeader.replace("Bearer ", "");
    const {
      data: { user },
      error: userError,
    } = await supabaseAdmin.auth.getUser(jwt);

    if (userError || !user) {
      return json({ error: "Invalid or expired session" }, 401);
    }

    const { data: sub } = await supabaseAdmin
      .from("subscriptions")
      .select("status")
      .eq("user_id", user.id)
      .maybeSingle();

    const active = sub?.status === "active" || sub?.status === "trialing";
    if (!active) {
      return json({ error: "No active subscription" }, 403);
    }

    return json({ url: DOWNLOAD_URL }, 200);
  } catch (err) {
    console.error(err);
    return json({ error: err instanceof Error ? err.message : "Unknown error" }, 500);
  }
});

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}