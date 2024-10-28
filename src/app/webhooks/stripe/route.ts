import { handlers } from "./handlers";
import { extractEvent } from "./extractEvent";
import { env } from "@/env";

export const POST = async (request: Request): Promise<Response> => {
  const event = await extractEvent(request, env.STRIPE_WEBHOOK_SECRET);

  if (event instanceof Error) {
    console.error(event);
    return new Response(JSON.stringify({ error: event.message }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const handler = handlers[event.type];

  if (!handler) {
    console.error(`No handler found for event type ${event.type}`);
    return new Response(JSON.stringify({ error: `No handler found for event type ${event.type}` }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    // if (env.NODE_ENV === "production" && event.livemode === false) {
    //   console.error("Event is not live");
    //   return new Response(JSON.stringify({ error: "Event is not live" }), {
    //     status: 400,
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    // }

    // @ts-expect-error I am not sure how to make ts happy here
    const result = await handler(event.data.object);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Unhandled event") {
        return new Response(JSON.stringify({ error: "Unhandled event" }), {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      console.error(error);

      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(JSON.stringify({ error: "Unknown error" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

