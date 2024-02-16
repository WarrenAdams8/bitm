<script setup lang="ts">
import logOut from './utils/logOut';

  
  const user = useSupabaseUser()
</script>
<template>
  <div>
    <div class="nav">
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/wishlist">Wishlist</NuxtLink>
      <NuxtLink to="/cart">Cart</NuxtLink>
      <NuxtLink v-if="!user" to="/login">Login</NuxtLink>
      <NuxtLink v-if="user" @click="logOut" to="/login">Logout</NuxtLink>
    </div>
    <NuxtPage />
  </div>
</template>
<style scoped>
  .nav {
    display: flex;
    gap: 1rem;
    padding: 1rem;
  }
</style>
