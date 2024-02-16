<script setup lang="ts">
import { useWishlistStore } from '@/stores/wishlistStore';
import type { Book } from '~/types/BookTypes';
import type { Database } from '~/types/supabase';

const store = useWishlistStore()
const { bookWishlist } = storeToRefs(store)


const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser();

const { data: wishlist_items, refresh } = await useAsyncData('wishlist_items', async () => {
    if (user?.value?.id) {

        const { data } = await supabase.from('wishlist_item').select("book_info").eq("user_id", user.value?.id)
        
        const items: Book[] = []

        data?.forEach((item) => {
            //@ts-ignore 
            items.push(item.book_info)
        })
        console.log(items)

        return items
    }
})

const refreshData = () => {
    refresh()
}



</script>
<template>
    <h1>Wishlist</h1>
    
    <WishlistItems v-if="user" :books="wishlist_items as Book[]" @refresh-data="refreshData" />
    <WishlistItems v-else :books="bookWishlist" @refresh-data="refreshData" />
</template>