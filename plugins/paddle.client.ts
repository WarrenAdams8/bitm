import { initializePaddle } from "@paddle/paddle-js";
import type { InitializePaddleOptions, Paddle } from "@paddle/paddle-js";

export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig();

  const paddleInit = async (): Promise<Paddle | undefined> => {
    const paddle = await initializePaddle({
      environment: "sandbox",
      token: config.public.paddleToken,
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

  Paddle?.Setup({
    token: config.public.paddleToken,
    eventCallback: function(data) {
      console.log(data);
    }
    
  });

  return {
    provide: {
      Paddle,
    },
  };
});
