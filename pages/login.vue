<script setup lang="ts">
const email = ref('')
const password = ref('')

const router = useRouter();
const { auth } = useSupabaseClient();
const errorMsg = ref(null)

async function handleSubmit() {
   try {
        const { error } = await auth.signInWithPassword({
             email: email.value,
            password: password.value
        });
        if (error) throw error;
        router.push("/account");
    } catch (error: any) {
        errorMsg.value = error.message
        console.log(error)
    }    
}


</script>
<template>
    <div class="centered-content">
        <h1>Login</h1>
            <form class="form" @submit.prevent="handleSubmit">
                <input v-model="email" type="text" placeholder="Email">
                <input v-model="password" type="password" placeholder="Password">
                <button type="submit">Login</button>
            </form>

        <h3>Dont have an account?</h3>
        <NuxtLink to="/register">Register</NuxtLink>    
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