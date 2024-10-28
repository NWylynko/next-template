import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    // System
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    TZ: z.string().optional().refine((val) => process.env.NODE_ENV !== "development" || val === "UTC", {
      message: "TZ must be UTC in development",
    }),

    // Database
    DATABASE_URL: z
      .string()
      .url()
      .refine(
        (str) => !str.includes("YOUR_POSTGRES_URL_HERE"),
        "You forgot to change the default URL",
      ),

    // Clerk
    CLERK_SECRET_KEY: z.string(),

    // Stripe
    STRIPE_SECRET_KEY: z.string(),
    STRIPE_WEBHOOK_SECRET: z.string(),

    // Resend
    RESEND_API_KEY: z.string(),
    DEV_EMAIL: z.string().optional(),

    // Cloudflare
    CLOUDFLARE_R2_PUBLIC_BUCKET: z.string(),
    CLOUDFLARE_R2_PUBLIC_ENDPOINT: z.string(),
    CLOUDFLARE_R2_PUBLIC_BUCKET_DOMAIN: z.string(),
    CLOUDFLARE_R2_PRIVATE_BUCKET: z.string(),
    CLOUDFLARE_R2_PRIVATE_ENDPOINT: z.string(),
    CLOUDFLARE_R2_ACCESS_KEY_ID: z.string(),
    CLOUDFLARE_R2_SECRET_ACCESS_KEY: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // Clerk
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    // System
    NODE_ENV: process.env.NODE_ENV,
    TZ: process.env.TZ,

    // Database
    DATABASE_URL: process.env.DATABASE_URL,

    // Clerk
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,

    // Stripe
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,

    // Resend
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    DEV_EMAIL: process.env.DEV_EMAIL,

    // Cloudflare
    CLOUDFLARE_R2_PUBLIC_BUCKET:
      process.env.CLOUDFLARE_R2_PUBLIC_BUCKET,
    CLOUDFLARE_R2_PUBLIC_ENDPOINT:
      process.env.CLOUDFLARE_R2_PUBLIC_ENDPOINT,
    CLOUDFLARE_R2_PUBLIC_BUCKET_DOMAIN: process.env.CLOUDFLARE_R2_PUBLIC_BUCKET_DOMAIN,
    CLOUDFLARE_R2_PRIVATE_BUCKET: process.env.CLOUDFLARE_R2_PRIVATE_BUCKET,
    CLOUDFLARE_R2_PRIVATE_ENDPOINT:
      process.env.CLOUDFLARE_R2_PRIVATE_ENDPOINT,
    CLOUDFLARE_R2_ACCESS_KEY_ID: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
    CLOUDFLARE_R2_SECRET_ACCESS_KEY:
      process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined.
   * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
