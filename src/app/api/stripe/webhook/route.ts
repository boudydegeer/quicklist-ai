import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event;

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

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      console.log("Checkout session completed:", session.id);
      console.log("User ID:", session.metadata?.userId);
      console.log("Customer:", session.customer);
      console.log("Subscription:", session.subscription);
      // TODO: Update user profile in Supabase
      break;
    }
    case "customer.subscription.updated": {
      const subscription = event.data.object;
      console.log("Subscription updated:", subscription.id);
      console.log("Status:", subscription.status);
      // TODO: Update user subscription status in Supabase
      break;
    }
    default:
      console.log("Unhandled event type:", event.type);
  }

  return NextResponse.json({ received: true });
}
