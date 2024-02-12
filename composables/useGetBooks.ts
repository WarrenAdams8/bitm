import type { Book, BooksApiResponse } from "~/types/BookTypes";
import { bookSchema, booksApiResponseSchema } from "~/types/BookTypes";

const BOOKS_URL = "https://www.googleapis.com/books/v1/volumes";
const PARAMS = "&maxResults=30&filter=paid-ebooks";

export default function (query = "Harry + Potter") {
  const getBooks = async (): Promise<Book[]> => {
    const response = await fetch(`${BOOKS_URL}?q=${query}${PARAMS}`);
    const data: BooksApiResponse = await response.json();

    const validatedBooks = booksApiResponseSchema.safeParse(data);


    if (!validatedBooks.success) {
      console.error(validatedBooks.error);
      return [];
    }

    return validatedBooks.data.items;
  };

  return getBooks()
}
