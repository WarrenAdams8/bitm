<script setup lang="ts">
const signUpEmail = ref('')
const signUpPassword = ref('')

const router = useRouter();
const { auth } = useSupabaseClient();
const errorMsg = ref(null)



async function handleSubmit() {
  try {
    const { error } = await auth.signUp({
      email: signUpEmail.value,
      password: signUpPassword.value
    });
    if (error) throw error;
    alert("Check your email to confirm your account");
    router.push("/");
  } catch (error: any) {
    errorMsg.value = error.message
    console.log(errorMsg.value)

  }
}


</script>
<template>
  <div class="centered-content">
    <h1>Register</h1>
    <form class="form" @submit.prevent="handleSubmit">
      <input v-model="signUpEmail" type="text" placeholder="Email">
      <input v-model="signUpPassword" type="password" placeholder="Password">
      <button type="submit">Register</button>
    </form>

    <h3>already have an account?</h3>
    <NuxtLink to="/login">Login</NuxtLink>
  </div>
</template>
<style scoped>
  .form {
        display: flex;
        flex-direction: column;
        gap: 1rem;  
        width: 300px;
    }

    .centered-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        padding-top: 100px;
    }
</style>