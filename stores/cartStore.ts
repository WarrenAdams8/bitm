import { defineStore } from "pinia";
import type { Book } from "~/types/BookTypes";

export const useCartStore = defineStore(
  "cart",
  () => {
    const cart: Ref<Book[]> = ref([]);

    /**
     * Function to add a book to the cart if it's not already present.
     *
     * @param {Book} book - the book to be added to the cart
     * @return {void} no return value
     */
    function addBookToCart(book: Book) {
      console.log(book);
      const isBookInCart = cart.value.findIndex(function (bookInCart) {
        return bookInCart.id === book.id;
      });
      if (isBookInCart === -1) {
        cart.value.push(book);
      }

      console.log(cart.value);
    }

    /**
     * Removes a book from the cart.
     *
     * @param {Book} book - the book to be removed
     * @return {void}
     */
    function removeBookFromCart(book: Book) {
      const newCart = cart.value.filter((cart) => {
        return cart.id !== book.id;
      });

      cart.value = newCart;
      console.log(cart.value);
    }

    return {
      cart,
      addBookToCart,
      removeBookFromCart,
    };
  },
  {
    persist: {
      storage: persistedState.localStorage,
    },
  }
);
