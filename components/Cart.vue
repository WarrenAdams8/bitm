<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore';

const store = useCartStore()
const { cart } = storeToRefs(store)

const { $Paddle } = useNuxtApp()

const config = useRuntimeConfig()


function checkout() {
    if ($Paddle) {
        $Paddle.Checkout.open({
            items: [
                {
                    priceId: 'pri_01hpvn9ezm0e5s137pcjk40smj',
                    quantity: 1
                }
            ],
        })
    }
}

const { data } = useFetch('/api/getSubscription/43434')

console.log(data.value)
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
    <div v-for="item in data">
        <pre> {{ item }}</pre>
    </div>
    <button @click="checkout">Checkout</button>
</template>