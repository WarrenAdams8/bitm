<script setup lang="ts">

const { data: books, isLoading } = useQuery({
    queryKey: ['books'],
    queryFn: () => useGetBooks()
})

const book = await useGetSingleBook()



</script>
<template>
    <div v-if="isLoading">
        <p>...Loading</p>
    </div>
    <div v-for="book in books">
        <h2>{{ book.volumeInfo.title }}</h2>
    </div>
    <pre>{{ book.book }}</pre>
    <pre>{{ book.palette }}</pre>
</template>