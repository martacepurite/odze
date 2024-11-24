<script setup>
import {ref} from 'vue'

const email = ref('')
const password = ref('')
const password_again = ref('')
const type = ref('')
const organization = ref('')

async function register(){
   const user = await $fetch('/api/register',{
        method: 'POST',
        body: {
            email: email.value,
            password: password.value,
            isAdmin: true
        }
    })
    navigateTo("/") 
}
</script>


<template>
  <form class="login-box" v-on:submit.prevent="register">
  <h1>Reģistrācija</h1>

        E-pasts: <input v-model="email" /><br>
        Parole: <input v-model="password" /><br>
        Parole atkārtoti: <input v-model="password_again" /><br>
        Organizācijas nosaukums: <input v-model="organization" /><br>
        
            Konta tips:
            <select v-model="type">
                <option>Organizācijas administrators</option>
                <option>Standarta lietotājs</option>
            </select><br>
        

    <input type="submit" value="Reģistrēties">
  </form>
</template>