<script setup lang="ts">
const auth = useFirebaseAuth()

const signOutUser = async () => {
  if (auth) {
    try {
      await auth.signOut()
      console.log('User signed out successfully')
      // Redirect the user to the login page or home page after signing out
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }
}

const user = useCurrentUser()
</script>
<template>
  <div>
    <div class="nav">
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/wishlist">Wishlist</NuxtLink>
      <NuxtLink to="/cart">Cart</NuxtLink>
      <NuxtLink to="/account">Account</NuxtLink>
      <NuxtLink v-if="!user" to="/login">login</NuxtLink>
      <NuxtLink v-if="user" @click="signOutUser" to="/login">logout</NuxtLink>
      {{ user?.email }}
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
