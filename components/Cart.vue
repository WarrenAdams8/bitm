<script setup lang="ts">
    import { useCartStore } from '@/stores/cartStore';
    const store = useCartStore()

    const { cart } = storeToRefs(store)

</script>
<template>
    <div v-for="book in cart">
        <NuxtLink :to="`/bookDetails/${book.id}`">
            <div>
                <img :src="book.volumeInfo.imageLinks.smallThumbnail" alt="">
                <h2>{{ book.volumeInfo.title }}</h2>
            </div>
        </NuxtLink>
        <button @click="store.removeBookFromCart(book)">Remove from cart</button>
    </div>
</template>