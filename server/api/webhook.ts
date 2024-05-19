import { Paddle, EventName, Environment } from "@paddle/paddle-node-sdk";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const paddle = new Paddle(config.paddleKey, {
    environment: Environment.sandbox,
  });

  const headers = event.node.req.headers;
  const body = (await readRawBody(event)) as string;
  const sig = headers["paddle-signature"] as string;
  const secret = config.webhookSecret;

  const getCustomerEmail = async (ctm_id: string) => {
    const cust = await paddle.customers.get(ctm_id);
    return cust.email;
  };

  const getSubscription = async (sub_id: string) => {
    const sub = await paddle.subscriptions.get(sub_id);
    return sub;
  };

  try {
    if (sig && body) {
      // The `unmarshal` function will validate the integrity of the webhook and return an entity
      const eventData = paddle.webhooks.unmarshal(body, secret, sig);
      switch (eventData?.eventType) {
        case EventName.SubscriptionCreated:
          const email = await getCustomerEmail(eventData.data.customerId);
          console.log(`Sub: ${eventData.data.id}, Email: ${email}`);
          //add to supabase
          break;
        case EventName.SubscriptionCanceled:
          console.log(`Product ${eventData.data} was updated`);
          console.log(JSON.stringify(eventData.data));
          break;
        case EventName.SubscriptionActivated:
          console.log(`Product ${eventData.data} was updated`);
          console.log(JSON.stringify(eventData.data));
          break;
        case EventName.SubscriptionUpdated:
          console.log(`Product ${eventData.data} was updated`);
          console.log(JSON.stringify(eventData.data));
          break;
        case EventName.TransactionCreated:
          console.log(`Transaction created ${eventData.data.customerId}`);
          console.log(JSON.stringify(eventData.data));
          const cust = await paddle.customers.get(
            eventData.data.customerId as string,
          );
          console.log(cust);
          const sub = await getSubscription("sub_01hxvzefat4vjcsa6bfxtgc17h");
          console.log(sub);
          break;
        default:
          console.log(eventData?.eventType);
      }
    } else {
      console.log("Signature missing in header");
    }
  } catch (e) {
    // Handle signature mismatch or other runtime errors
    console.log(e);
  }
  // Return a response to acknowledge
  return "Processed webhook event";
});
