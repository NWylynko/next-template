import { stripe } from "@/services/stripe";

export const extractEvent = async (request: Request, stripe_key: string) => {
  try {
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      throw new Error("No signature found");
    }

    const body = await request.text();

    const event = await stripe.webhooks.constructEventAsync(body, signature, stripe_key);

    return event;
  } catch (error) {
    if (error instanceof Error) {
      return error;
    }

    return new Error("Unknown error");
  }
};
