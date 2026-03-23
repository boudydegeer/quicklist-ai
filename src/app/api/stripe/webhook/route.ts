import { NextResponse } from "next/server";
import { stripe, PLANS } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

// Use service role client for webhook (no user session available)
function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

function getPlanFromPriceId(priceId: string): { name: string; limit: number } {
  for (const [key, plan] of Object.entries(PLANS)) {
    if (plan.priceId === priceId) {
      return { name: key, limit: plan.listings };
    }
  }
  return { name: "free", limit: 5 };
}

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = createServiceClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;

      if (userId && session.subscription) {
        // Fetch subscription to get price ID
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        );
        const priceId = subscription.items.data[0]?.price.id;
        const plan = getPlanFromPriceId(priceId);

        await supabase
          .from("profiles")
          .update({
            plan: plan.name,
            stripe_customer_id: session.customer as string,
            stripe_subscription_id: session.subscription as string,
            generations_limit: plan.limit,
            generations_used: 0,
            billing_period_start: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("id", userId);
      }
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      const priceId = subscription.items.data[0]?.price.id;
      const plan = getPlanFromPriceId(priceId);

      // Find user by subscription ID
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("stripe_subscription_id", subscription.id)
        .single();

      if (profile) {
        const updateData: Record<string, unknown> = {
          plan: subscription.status === "active" ? plan.name : "free",
          generations_limit:
            subscription.status === "active" ? plan.limit : 5,
          updated_at: new Date().toISOString(),
        };

        if (subscription.status !== "active") {
          updateData.stripe_subscription_id = null;
        }

        await supabase
          .from("profiles")
          .update(updateData)
          .eq("id", profile.id);
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;

      await supabase
        .from("profiles")
        .update({
          plan: "free",
          stripe_subscription_id: null,
          generations_limit: 5,
          updated_at: new Date().toISOString(),
        })
        .eq("stripe_subscription_id", subscription.id);
      break;
    }

    default:
      console.log("Unhandled event type:", event.type);
  }

  return NextResponse.json({ received: true });
}
