<script setup>
import {ref} from 'vue'

const email = ref('')
const password = ref('')

function login(event){
    event.preventDefault()
    alert(email.value)
}
</script>


<template>
  <h1>Ielogošanās</h1>
  <form name="login_form" @submit="login">

        E-pasts: <input v-model="email" /><br>
        Parole: <input v-model="password" /><br>
        
    <input type="submit" value="Ielogoties">
  </form>
</template>