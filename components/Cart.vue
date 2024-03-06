<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore';
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore';
import type { Book } from '~/types/BookTypes';

const store = useCartStore()
const { cart } = storeToRefs(store)
const { state: premiumStatus } = useAsyncState(useGetPremiumStatus(), false)
const user = useCurrentUser()
const db = getFirestore()

function canYouAddToOutstandingBooks() {
    if (user.value?.uid) {
        const outstandingBooksCollection = collection(db, `users/${user.value.uid}/outstandingBooks`);
        const outstandingBooks = useCollection<Book>(outstandingBooksCollection)

        if (outstandingBooks.value.length + cart.value.length <= 5) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}

async function addToOutstandingBooks() {

    const db = getFirestore()
    const user = useCurrentUser()


    if (user.value?.uid) {


        if (canYouAddToOutstandingBooks() === false) {
            alert('your Subscription only allows 5 books outstanding at a time')
            return
        } else {

            cart.value.forEach((book) => {
                console.log(book)
                const booksCollection = doc(db, `users/${user.value?.uid}/outstandingBooks`, book.id);
                setDoc(booksCollection, book);
                store.removeBookFromCart(book)
            })

            alert('The Books are on the way')
        }


    } else {
        alert('Please login to checkout')
        navigateTo('/login')
    }
}


async function checkout() {

    if (premiumStatus.value) {
        addToOutstandingBooks()
    } else {
        alert('Upgrade to premium to checkout')
        navigateTo('/account')
    }
}


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
    <button v-show="cart.length > 0" @click="checkout">Checkout</button>
</template>