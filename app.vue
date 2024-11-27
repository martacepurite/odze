<script setup lang="ts">
import '~/assets/css/style.css'
import { useAuthStore } from './store/auth';

import { storeToRefs } from 'pinia';

const { authenticated } = storeToRefs(useAuthStore()) 
const { user_id } = storeToRefs(useAuthStore()) 
const { usertype } = storeToRefs(useAuthStore()) 

const { logout } = useAuthStore() 

function logoutUser(){
  logout()
   navigateTo(`/`)
}

function gotoUserPage(){
  
   navigateTo(`/users/${usertype.value}/${user_id.value}`)
}



</script>

<template>
  <div>
    <header>
      <NuxtLink to="/">

      <img src="public/logo.png">
      </NuxtLink>
        <div class="login_buttons">
          <NuxtLink v-show="!authenticated" to="/login">
            <button>Ielogoties</button> 
          </NuxtLink>
          <NuxtLink v-show="!authenticated" to="/register">
            <button>Reģistrēties</button> 
          </NuxtLink>
          <button v-show="authenticated" v-on:click="gotoUserPage">Mana Odze</button>
          <button v-show="authenticated" v-on:click="logoutUser">Iziet</button>
        </div>
    </header>
    <div> 
      <NuxtPage />
    </div>
  </div>
</template>
