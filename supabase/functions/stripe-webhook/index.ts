// supabase/functions/stripe-webhook/index.ts
//
// Stripe calls this URL directly (not the browser). It's the only place
// that writes subscription status, so the JavaFX app and React page can
// both just read the `subscriptions` table and trust it.
//
// Required secrets:
//   STRIPE_SECRET_KEY
//   STRIPE_WEBHOOK_SECRET   - whsec_... from the Stripe webhook config
//   SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY
//
// After deploying, register this function's URL in the Stripe dashboard
// (Developers -> Webhooks) listening for:
//   checkout.session.completed
//   invoice.paid
//   customer.subscription.updated
//   customer.subscription.deleted

import Stripe from "https://esm.sh/stripe@17.7.0?target=denonext";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2024-06-20",
  httpClient: Stripe.createFetchHttpClient(),
});

const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET")!;
const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

Deno.serve(async (req) => {
  const signature = req.headers.get("Stripe-Signature");
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature!,
      webhookSecret,
      undefined,
      Stripe.createSubtleCryptoProvider()
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.client_reference_id ?? session.metadata?.supabase_user_id;
        if (userId && session.subscription) {
          const sub = await stripe.subscriptions.retrieve(session.subscription as string);
          await upsertSubscription(userId, session.customer as string, sub);
        }
        break;
      }

      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice;
        if (invoice.subscription) {
          const sub = await stripe.subscriptions.retrieve(invoice.subscription as string);
          const userId = sub.metadata?.supabase_user_id ?? (await findUserByCustomer(sub.customer as string));
          if (userId) await upsertSubscription(userId, sub.customer as string, sub);
        }
        break;
      }

      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription;
        const userId = sub.metadata?.supabase_user_id ?? (await findUserByCustomer(sub.customer as string));
        if (userId) await upsertSubscription(userId, sub.customer as string, sub);
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        const userId = sub.metadata?.supabase_user_id ?? (await findUserByCustomer(sub.customer as string));
        if (userId) {
          await supabaseAdmin
            .from("subscriptions")
            .update({ status: "canceled", updated_at: new Date().toISOString() })
            .eq("user_id", userId);
        }
        break;
      }

      default:
        // Ignore anything we don't explicitly handle
        break;
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }), {
      status: 500,
    });
  }
});

async function findUserByCustomer(customerId: string): Promise<string | null> {
  const { data } = await supabaseAdmin
    .from("subscriptions")
    .select("user_id")
    .eq("stripe_customer_id", customerId)
    .maybeSingle();
  return data?.user_id ?? null;
}

async function upsertSubscription(userId: string, customerId: string, sub: Stripe.Subscription) {
  await supabaseAdmin.from("subscriptions").upsert({
    user_id: userId,
    stripe_customer_id: customerId,
    stripe_subscription_id: sub.id,
    status: sub.status,
    current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  });
}