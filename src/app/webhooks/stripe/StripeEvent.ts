import type { stripe } from "@/services/stripe";

type StripeEvent = Awaited<ReturnType<typeof stripe.webhooks.constructEventAsync>>;

type StripeEventType = StripeEvent["type"];

export type StripeEventHandlers = {
  [K in StripeEventType]: (data: Extract<StripeEvent, { type: K }>["data"]["object"]) => Promise<object>;
};

export type StripeWebhookHandler<K extends StripeEventType> = (
  data: Extract<StripeEvent, { type: K }>["data"]["object"],
) => Promise<object>;
