import { initializePaddle } from "@paddle/paddle-js";
import type { InitializePaddleOptions, Paddle, PaddleEventData } from "@paddle/paddle-js";

export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig();

  const paddleInit = async (): Promise<Paddle | undefined> => {
    const paddle = await initializePaddle({
      environment: "sandbox",
      token: config.public.paddleToken,
      eventCallback: (data:PaddleEventData) => {
        console.log(data);
      }
    } as unknown as InitializePaddleOptions).then(
      (paddleInstance: Paddle | undefined) => {
        if (paddleInstance) {
          return paddleInstance;
        }
        return undefined;
      }
    );
    return paddle;
  };
  const Paddle = await paddleInit();

  return {
    provide: {
      Paddle,
    },
  };
});
