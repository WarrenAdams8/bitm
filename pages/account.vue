<script setup>
const user = useSupabaseUser();

</script>
<template>
    <div class="">
        {{ user?.email }}
        <button  @click="logOut">Logout</button>
    </div>
</template>