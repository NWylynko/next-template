import "server-only";
import { env } from "@/env";
import Stripe from "stripe";

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  typescript: true,
  apiVersion: "2024-09-30.acacia",
});
