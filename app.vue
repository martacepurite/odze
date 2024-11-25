<script setup lang="ts">
import '~/assets/css/style.css'

import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';

const { authenticated } = storeToRefs(useAuthStore()) 

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

            <NuxtLink v-show="!authenticated" to="/login">
              <button>Ielogoties</button> 
            </NuxtLink>
            <NuxtLink v-show="!authenticated" to="/register">
              <button>Reģistrēties</button> 
            </NuxtLink>
            <button v-show="authenticated" v-on:click="logoutUser">Iziet</button>
          </div>

     </header>
     
  <div>
    <NuxtPage/>
  </div>
</template>
