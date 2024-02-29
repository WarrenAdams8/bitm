<script setup lang="ts">
import { getCheckoutUrl, getPortalUrl } from '@/utils/stripePayment';
import { getPremiumStatus } from '@/utils/getPremiumStatus'

const app = useFirebaseApp()
const user = useCurrentUser()
const premiumStatus = ref(false)

watch(user, async () => {
    if (user.value) {
        premiumStatus.value = await getPremiumStatus(app)
    } else {
        premiumStatus.value = false
    }
}, { immediate: true })

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
</script>
<template>
    <div class="">Hello {{ user?.email }}</div>
    <div>Memerbership: {{ premiumStatus }}</div>
    <button v-show="!premiumStatus" @click="upgradeToPremium">Upgrade To Premium</button>
    <button v-show="premiumStatus" @click="manageSubscription">Manage Subscription</button>
</template>