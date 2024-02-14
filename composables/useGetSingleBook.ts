import { bookSchema } from "~/types/BookTypes";
import type { Book } from "~/types/BookTypes";
import type { BookColor } from "~/types/BookColorTypes";

const BOOKS_URL = "https://www.googleapis.com/books/v1/volumes";

export default function (id = "wrOQLV6xB-wC") {
  /**
   * Asynchronous function to retrieve a single book and its color palette.
   *
   * @return {Promise<{ book: Book; palette: BookColor; }>} A promise that resolves to an object containing the book and its color palette.
   */
  const getSingleBook = async (): Promise<{
    book: Book;
    palette: BookColor;
  }> => {
    const response = await fetch(`${BOOKS_URL}/${id}`);
    const data: unknown = await response.json();

    const colorRes = await $fetch(`/api/bookColorPalette/${id}`);

    const validatedBook = bookSchema.safeParse(data);

    if (validatedBook.success) {
      return { book: validatedBook.data, palette: colorRes };
    } else {
      console.error(validatedBook.error);
      throw new Error("error");
    }
  };
  return getSingleBook();
}
