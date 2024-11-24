<script setup lang="ts">
import '~/assets/css/style.css'

import { useAuthStore } from '~/store/auth';
const store = useAuthStore()

const { logout } = useAuthStore()

function logoutUser(){
   logout()
   navigateTo(`/`)
}



</script>

<template>
      <header>
        <a href="/">
        <img src="public/logo.png">
        </a>
          <div class="login_buttons">

            <NuxtLink v-show="!store.isLoggedIn" to="/login">
              <button>Ielogoties</button> 
            </NuxtLink>
            <NuxtLink v-show="!store.isLoggedIn" to="/register">
              <button>Reģistrēties</button> 
            </NuxtLink>
            <button v-show="store.isLoggedIn" v-on:click="logoutUser">Iziet</button>
          </div>

     </header>
     
  <div>
    <NuxtPage/>
  </div>
</template>
