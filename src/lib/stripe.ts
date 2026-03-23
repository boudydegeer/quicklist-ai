import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});

export const PLANS = {
  starter: { name: "Starter", price: 2900, listings: 50, priceId: process.env.STRIPE_STARTER_PRICE_ID! },
  pro: { name: "Pro", price: 7900, listings: 250, priceId: process.env.STRIPE_PRO_PRICE_ID! },
  agency: { name: "Agency", price: 19900, listings: 1000, priceId: process.env.STRIPE_AGENCY_PRICE_ID! },
} as const;
