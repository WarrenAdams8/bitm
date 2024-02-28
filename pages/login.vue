<script lang="ts">
import { GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getFirestore, setDoc } from 'firebase/firestore';
export const googleAuthProvider = new GoogleAuthProvider()
</script>

<script setup lang="ts">
import {
    getRedirectResult,
    signInWithRedirect,
} from 'firebase/auth'

const auth = useFirebaseAuth()

const error = ref(null)
function signinRedirect() {
    if (auth) {
        signInWithRedirect(auth, googleAuthProvider).catch((reason) => {
            console.error('Failed signinRedirect', reason)
            error.value = reason
        })
    }
}

// only on client side
onMounted(() => {
    if (auth) {
        getRedirectResult(auth)
            .then(async (cred) => {
                if (cred?.user.uid) {
                    const db = getFirestore()
                    const usersCollection = doc(db, 'users', cred.user.uid);
                    await setDoc(usersCollection, {
                        email: cred.user.email
                    })
                    console.log(cred.user.uid)
                }
            })
            .catch((reason) => {
                console.error('Failed redirect result', reason)
                error.value = reason
            })
    }
})

const signUpEmail = ref('')
const signUpPassword = ref('')

async function handleSubmit(){
    if (auth){
        signInWithEmailAndPassword(auth, signUpEmail.value, signUpPassword.value).then((cred) => {
            if (cred?.user) {
                alert('Login successful')
            }
        }).catch((reason) => {
            console.error('Failed login', reason)
        })
    }
}


</script>
<template>
    <div class="centered-content">
        <h1>Login</h1>

        <form class="form" @submit.prevent="handleSubmit">
            <input v-model="signUpEmail" type="text" placeholder="Email">
            <input v-model="signUpPassword" type="password" placeholder="Password">
            <button type="submit">login</button>
        </form>


        <button @click="signinRedirect()">login with Google</button>

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

button {
    margin-top: 15px;
}
</style>