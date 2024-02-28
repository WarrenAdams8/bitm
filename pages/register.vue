<script setup lang="ts">
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { doc, getFirestore, setDoc } from 'firebase/firestore';
const signUpEmail = ref('')
const signUpPassword = ref('')

const router = useRouter();

const auth = useFirebaseAuth()

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: 'http://localhost:3000/',
  // This must be true.
  handleCodeInApp: true,
};

async function handleSubmit() {

  if (auth) {

    createUserWithEmailAndPassword(auth, signUpEmail.value, signUpPassword.value).then(async (cred) => {
      if (cred?.user.uid) {
        const db = getFirestore()
        const usersCollection = doc(db, 'users', cred.user.uid);
        await setDoc(usersCollection, {
          email: cred.user.email
        })
        console.log(cred.user.uid)

        sendEmailVerification(cred.user, actionCodeSettings).then(() => {
          alert('Verification email sent!')
          router.push('/login')
        })

      }
    }).catch((reason) => {
      console.error('Failed register', reason)
    })
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