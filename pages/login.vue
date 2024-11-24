<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';
import {ref} from 'vue'

const { login } = useAuthStore();

const { user_id } = storeToRefs(useAuthStore())
const { authenticated } = storeToRefs(useAuthStore())

const email = ref('')
const password = ref('')
const message = ref('')

async function loginUser(){
   await login(email.value, password.value)

    if(authenticated){
        navigateTo(`/users/${user_id.value}`)
    }else{
        message.value = "User not found"
    }
}

</script>


<template>
  <form class="login-box" v-on:submit.prevent="loginUser">
  <h1>Ielogošanās</h1>
        E-pasts: <input v-model="email" /><br>
        Parole: <input v-model="password" /><br>
        <p>{{ message }}</p>
    <input type="submit" value="Ielogoties">
  </form>
</template>