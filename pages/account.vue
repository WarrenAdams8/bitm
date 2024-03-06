<script setup lang="ts">
import { getCheckoutUrl, getPortalUrl } from '@/utils/stripePayment';
import { collection, getFirestore } from 'firebase/firestore';
import type { Book } from '~/types/BookTypes';

const app = useFirebaseApp()
const user = useCurrentUser()
const db = getFirestore()


const { state: premiumStatus, isLoading } = useAsyncState(useGetPremiumStatus(), false)

watch(user, async () => {
    premiumStatus.value = await useGetPremiumStatus()
})

async function upgradeToPremium() {
    const priceId = 'price_1OktZmJMy9YqO9u25QJgJX5U'
    const checkoutUrl = await getCheckoutUrl(app, priceId)
    await navigateTo(checkoutUrl, { external: true })
    console.log('Upgrade to premium')
}

async function manageSubscription() {
    const portalUrl = await getPortalUrl(app)
    console.log(portalUrl)
    navigateTo(portalUrl, { external: true })
}

const getOutstandingBooks = () => {
    if (user.value?.uid) {
        const outstandingBooksCollection = collection(db, `users/${user.value.uid}/outstandingBooks`);
        const outstandingBooks = useCollection<Book>(outstandingBooksCollection)
        return outstandingBooks
    } else {
        return useCollection<Book>(collection(db, 'noBooks'))
    }
}

const { data: outstandingBooks } = getOutstandingBooks()

</script>

<template>
    <div class="">Hello {{ user?.email }}</div>
    <div v-if="isLoading">...isLoading</div>
    <div v-else>
        <div>Memerbership: {{ premiumStatus }}</div>
        <div v-if="user">
            <button v-show="!premiumStatus" @click="upgradeToPremium">Upgrade To Premium</button>
            <button v-show="premiumStatus" @click="manageSubscription">Manage Subscription</button>
            <h3 v-for="book in outstandingBooks as Book[]">
                <img :src="book.volumeInfo.imageLinks.smallThumbnail" alt="">
                {{ book.volumeInfo.title }}
            </h3>
        </div>
    </div>
</template>
