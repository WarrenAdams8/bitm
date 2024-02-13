<script setup lang="ts">

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
    </div>
</template>
<style scoped>
.centered-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: v-bind(rgbStyle);
}
</style>