import { initializePaddle } from "@paddle/paddle-js";
import type { InitializePaddleOptions, Paddle } from "@paddle/paddle-js";

/**
 * Initializes the paddle object.
 *
 * @return A function thhat needs to be called to get the initialized Paddle instance
 */
export default function () {
  /**
   * Initializes the paddle object.
   *
   * @return {Promise<Paddle | undefined>} A Promise that resolves to the initialized Paddle instance, or undefined if initialization fails.
   */

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
  return paddleInit;
}
