import useGetBooks from "~/composables/useGetBooks";
// add colors
const runtime = useRuntimeConfig();
export default defineEventHandler(async (event) => {
  const books = await useGetBooks(event.context.params?.searchTerm);
  console.log(runtime.stripeKey);
  return books;
});
