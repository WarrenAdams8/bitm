import { BookColorSchema, defaultBookPalette } from "~/types/BookColorTypes";

import Vibrant from "node-vibrant";
import useGetBooks from "~/composables/useGetBooks";

export default defineEventHandler(async (event) => {
  const books = await useGetBooks();
  const imageLink = `http://books.google.com/books/content?id=${event.context.params?.bookId}&printsec=frontcover&img=1&zoom=1&source=gbs_api`;
  const getPalette = async () => {
    return await Vibrant.from(imageLink).getPalette();
  };
  const palette = await getPalette();

  const validatedColors = BookColorSchema.safeParse(palette);

  books.forEach(async (book) => {
      const palette = await Vibrant.from(book.volumeInfo.imageLinks.image).getPalette();
      const validatedColors = BookColorSchema.safeParse(palette);

      console.log(validatedColors)
    })

  if (validatedColors.success) {
    return validatedColors.data;
  } else {
    console.error(validatedColors.error);
    return defaultBookPalette;
  }

});
