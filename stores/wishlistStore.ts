import { defineStore } from "pinia";
import type { Book } from "~/types/BookTypes";

export const useWishlistStore = defineStore(
  "wishlist",
  () => {
    const bookWishlist: Ref<Book[]> = ref([]);

    /**
     * Function to add a book to the wishlist if it's not already present.
     *
     * @param {Book} book - the book to be added to the wishlist
     * @return {void} no return value
     */
    function addBookToWishlist(book: Book) {
      console.log(book);
      const isItemInWishlist = bookWishlist.value.findIndex(function (
        bookInWishlist
      ) {
        return bookInWishlist.id === book.id;
      });
      if (isItemInWishlist === -1) {
        bookWishlist.value.push(book);
      }

      console.log(bookWishlist.value);
    }

    /**
     * Removes a book from the wishlist.
     *
     * @param {Book} book - the book to be removed
     * @return {void}
     */
    function removeBookFromWishlist(book: Book) {
      const newWishlist = bookWishlist.value.filter((bookInWishlist) => {
        return bookInWishlist.id !== book.id;
      });

      bookWishlist.value = newWishlist;
      console.log(bookWishlist.value);
    }

    return {
      bookWishlist,
      addBookToWishlist,
      removeBookFromWishlist,
    };
  },
  {
    persist: {
      storage: persistedState.localStorage,
    },
  }
);
