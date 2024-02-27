<script setup lang="ts">
import { collection, doc, getFirestore, deleteDoc } from 'firebase/firestore';
import type { Book } from '~/types/BookTypes';

const store = useWishlistStore()

const user = useCurrentUser();


defineProps<{
    books: Book[]
}>()

async function removeBookFromFirestore(id: string) {
    const user = useCurrentUser()
    const db = getFirestore()
    if (user?.value?.uid) {
        const booksCollection = collection(db, `users/${user.value.uid}/wishlistBooks`);
        const bookDoc = doc(booksCollection, id)
        await deleteDoc(bookDoc)
    }
    console.log(id)
}



</script>

<template>
    <div v-for="book in books" :key="book.id">
        <NuxtLink :to="`/bookDetails/${book.id}`">
            <div>
                <img :src="book.volumeInfo.imageLinks.smallThumbnail" alt="">
                <h2>{{ book.volumeInfo.title }}</h2>
            </div>
        </NuxtLink>
        <button v-if="user" @click="removeBookFromFirestore(book.id)">Remove from wishlist</button>
        <button v-else @click="store.removeBookFromWishlist(book)">Remove from wishlist</button>
    </div>
</template>