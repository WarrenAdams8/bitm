<script setup lang="ts">
import { useWishlistStore } from '@/stores/wishlistStore';
import { collection, getFirestore } from 'firebase/firestore';
import type { Book } from '~/types/BookTypes';


const store = useWishlistStore()
const { bookWishlist } = storeToRefs(store)

const user = useCurrentUser()
const db = getFirestore()


function getBooks() {
    if (user.value?.uid) {
        const booksCollection = collection(db, `users/${user.value.uid}/wishlistBooks`);
        return useCollection<Book>(booksCollection)
    }
    return useCollection<Book>(collection(db, 'noBooks'))
}

const { data: books, pending, error } = getBooks()



</script>
<template>
    <h1>Wishlist</h1>

    <ClientOnly>
        <WishlistItems v-if="user" :books="books as unknown as Book[]" />
        <WishlistItems v-else :books="bookWishlist as unknown as Book[]" />
   </ClientOnly>
</template>
