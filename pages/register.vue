<script setup>
import {ref} from 'vue'

const email = ref('')
const password = ref('')
const password_again = ref('')
const type = ref('')
const organization = ref('')
const message = ref('')

function password_check(){
    if(password.value === password_again.value){
        validate()
    }else{
        message.value = 'Passwords do not match'
    }
}
async function validate(){
    const user = await $fetch('/api/get_user_email',{
        method: 'POST',
        body: {
            email: email.value,
        }
    })
   if(user.user === null){
    register()
   }else{
        message.value = 'Email taken'
   }
}

async function register(){
   const user = await $fetch('/api/register',{
        method: 'POST',
        body: {
            email: email.value,
            password: password.value,
            isAdmin: true
        }
    })
    alert("Great success!")
    navigateTo("/login") 
}
</script>


<template>
  <form class="login-box" v-on:submit.prevent="password_check">
  <h1>Reģistrācija</h1>
        E-pasts: <input v-model="email" required/><br>
        Parole: <input v-model="password" required/><br>
        Parole atkārtoti: <input v-model="password_again" required/><br>
        
            Konta tips:
            <select v-model="type" required>
                <option>Organizācijas administrators</option>
                <option>Standarta lietotājs</option>
            </select><br>
        <div v-if="type === 'Organizācijas administrators'">
            Organizācijas nosaukums: <input v-model="organization" required/><br>
        </div>
        <p>{{ message }}</p>

    <input type="submit" value="Reģistrēties">
  </form>
</template>