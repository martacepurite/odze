<script setup>
import {ref} from 'vue'

const email = ref('')
const password = ref('')

async function login(){
   const user = await $fetch('/api/get_user_email',{
        method: 'POST',
        body: {
            email: email.value,
            
        }
    })
    if(user.user !== null){
      //alert(user.user.id)
      navigateTo(`/users/${user.user.id}`)
    }else{ 
      alert("not found")
    }
}

</script>


<template>
  <h1>Ielogošanās</h1>
  <form v-on:submit.prevent="login">

        E-pasts: <input v-model="email" /><br>
        Parole: <input v-model="password" /><br>
        
    <input type="submit" value="Ielogoties">
  </form>
</template>