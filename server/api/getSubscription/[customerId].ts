export default defineEventHandler(async (event) => {
  const customerId = event.context.params;
  const config = useRuntimeConfig();
  const res = await fetch(`https://sandbox-api.paddle.com/subscriptions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      //To authenticate, pass your client-side token key using the Bearer header.
      Authorization: `Bearer ${config.private.paddleApi}`,
    },
  });
  const data = await res.json();

  console.log( customerId?.customerId); 
  return data?.data
});
