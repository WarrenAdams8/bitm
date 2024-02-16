<script setup lang="ts">
import type { Book } from '~/types/BookTypes';
import type { Database } from '~/types/supabase';

const store = useWishlistStore()

const emit = defineEmits(['refresh-data'])

const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser();

defineProps<{
    books: Book[]
}>()

async function removeFromSupabase(id: string) {
    try {

        if (user?.value?.id) {
            const { error } = await supabase.from('wishlist_item')
                .delete()
                .eq("user_id", user.value.id)
                .eq('book_id', id)

            emit('refresh-data')
            if (error) throw error
        }

    } catch (error) {
        console.error(error)
    }

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
        <button v-if="user" @click="removeFromSupabase(book.id)">Remove from wishlist</button>
        <button v-else @click="store.removeBookFromWishlist(book)">Remove from wishlist</button>
    </div>
</template>