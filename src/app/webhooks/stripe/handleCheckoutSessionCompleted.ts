import { z } from "zod";
import type { StripeWebhookHandler } from "./StripeEvent";

const metadataSchema = z.object({
});

export const handleCheckoutSessionCompleted: StripeWebhookHandler<"checkout.session.completed"> = async (data) => {
  const metadata = metadataSchema.safeParse(data.metadata);

  if (!metadata.success) {
    throw new Error("Failed to parse metadata");
  }

  if (data.payment_status === "paid") {
    console.info("Payment has been paid");
  }

  throw new Error("Not implemented");

  return {
    success: true,
  };
};
