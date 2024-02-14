<script setup lang="ts">
import { useWishlistStore } from '@/stores/wishlistStore';

const store = useWishlistStore()
const { bookWishlist } = storeToRefs(store)

</script>
<template>
    <h1>Wishlist</h1>
    <div v-for="book in bookWishlist">
        <NuxtLink :to="`/bookDetails/${book.id}`">
            <div>
                <img :src="book.volumeInfo.imageLinks.smallThumbnail" alt="">
                <h2>{{ book.volumeInfo.title }}</h2>
            </div>
        </NuxtLink>
        <button @click="store.removeBookFromWishlist(book)">Remove from wishlist</button>
    </div>

</template>