// supabase/functions/create-checkout-session/index.ts
//
// Called from the React landing page once a user is signed in (or has just
// signed up). Creates a Stripe Checkout Session in subscription mode and
// returns the URL to redirect the browser to.
//
// Required secrets (set with `supabase secrets set`):
//   STRIPE_SECRET_KEY       - sk_live_... / sk_test_...
//   STRIPE_PRICE_ID         - price_... (the recurring monthly price)
//   SITE_URL                - https://freemyquery.com (no trailing slash)
//   SUPABASE_URL            - auto-provided by Supabase
//   SUPABASE_SERVICE_ROLE_KEY - auto-provided by Supabase

import Stripe from "https://esm.sh/stripe@17.7.0?target=denonext";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2024-06-20",
  httpClient: Stripe.createFetchHttpClient(),
});


const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);
const PRICE_ID = Deno.env.get("STRIPE_PRICE_ID")!;
const SITE_URL = Deno.env.get("SITE_URL")!;

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
      console.error("getUser failed:", userError);
      return json({ error: "Invalid or expired session", detail: userError?.message }, 401);
    }

    // Reuse an existing Stripe customer if this user already has one,
    // otherwise create a fresh one and store it.
    const { data: existingSub } = await supabaseAdmin
      .from("subscriptions")
      .select("stripe_customer_id")
      .eq("user_id", user.id)
      .maybeSingle();

    let customerId = existingSub?.stripe_customer_id as string | undefined;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { supabase_user_id: user.id },
      });
      customerId = customer.id;
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      line_items: [{ price: PRICE_ID, quantity: 1 }],
      success_url: `${SITE_URL}/?checkout=success`,
      cancel_url: `${SITE_URL}/?checkout=cancelled`,
      client_reference_id: user.id,
      subscription_data: {
        metadata: { supabase_user_id: user.id },
      },
      metadata: { supabase_user_id: user.id },
    });

    return json({ url: session.url }, 200);
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