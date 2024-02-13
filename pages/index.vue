<script setup lang="ts">

const query = defineModel()

const debouncedQuery = useDebounce(query, 500)

const { data: books, isLoading } = useQuery({
    queryKey: ['books', debouncedQuery],
    queryFn: () => {
        if (typeof query.value === 'string') {
            return useGetBooks(query.value)
        }
        return useGetBooks()
    },
    staleTime: 60000
})


</script>
<template>
    <input v-model="query" />
    <p>searching for: <b>{{ debouncedQuery }}</b></p>
    <div v-if="isLoading">
        <p>...Loading</p>
    </div>
    <div v-else-if="!books?.length">
        <p>No Books found</p>
    </div>
    <div v-for="book in books">
        <NuxtLink :to="`/bookDetails/${book.id}`">
            <div class="linkContent">
                <img :src="book.volumeInfo.imageLinks.smallThumbnail" alt="">
                <h2>{{ book.volumeInfo.title }}</h2>
            </div>
        </NuxtLink>
    </div>
</template>
<style scoped>
.linkContent {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 5px;
}
</style>