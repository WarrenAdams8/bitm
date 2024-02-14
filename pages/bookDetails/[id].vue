<script setup lang="ts">
import { useWishlistStore } from '@/stores/wishlistStore';
import { useCartStore } from '@/stores/cartStore';

const store = useWishlistStore()
const cartStore = useCartStore()


const routeParams = useRoute().params

const { data, isLoading } = useQuery({
    queryKey: ['books', routeParams],
    queryFn: () => {
        if (typeof routeParams.id === 'string') {
            return useGetSingleBook(routeParams.id)
        } else {
            return useGetSingleBook()
        }
    },
    staleTime: 60000
})

// convert _rgb[] to css rgb()
const rgbStyle = computed(() => `rgb(${data.value?.palette.Vibrant._rgb[0]}, ${data.value?.palette.Vibrant._rgb[1]}, ${data.value?.palette.Vibrant._rgb[2]})`);

/**
 * Adds a book to the wishlist if it exists in the data.
 *
 */
function addBookToWishlist() {
    if (data.value?.book) {
        store.addBookToWishlist(data.value.book)
    }
}


/**
 * Function to add a book to the cart if it exists in the data.
 *
 * @param {object} data - the data containing the book to be added to the cart
 * @return {void} 
 */
function addBookToCart() {
    if (data.value?.book) {
        cartStore.addBookToCart(data.value.book)
    }
}

</script>
<template>
    <div v-if="isLoading">
        <p>...Loading</p>
    </div>
    <div class="centered-content">
        <h1>{{ data?.book.volumeInfo.title }}</h1>
        <h3> {{ data?.book.volumeInfo.authors[0] }}</h3>
        <h4> {{ data?.book.volumeInfo.categories[0] }}</h4>
        <img :src="data?.book.volumeInfo.imageLinks.image" alt="book image">
        <p>{{ data?.book.volumeInfo.description }}</p>
        <button class="button" @click="addBookToWishlist">Add to wishlist</button>
        <button class="button" @click="addBookToCart">Add to cart</button>
    </div>
</template>
<style scoped>
.centered-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: v-bind(rgbStyle);
    position: relative;
}

.button {
    width: 200px;
    height: 50px;
}

</style>