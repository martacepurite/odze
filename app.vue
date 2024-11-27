<script setup lang="ts">
import '~/assets/css/style.css'
import { useAuthStore } from './store/auth';

import { storeToRefs } from 'pinia';

const { authenticated } = storeToRefs(useAuthStore())
const { user_id } = storeToRefs(useAuthStore())
const { usertype } = storeToRefs(useAuthStore())

const { logout } = useAuthStore()

function logoutUser() {
  logout()
  navigateTo(`/`)
}

function gotoUserPage() {

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
        <NuxtLink v-show="!authenticated" v-if="$route.path == '/'" to="/login">
          <button class="button-9" role="button">Ielogoties</button>
        </NuxtLink>
        <!--
            <NuxtLink v-show="!authenticated" to="/register">
              <button>Reģistrēties</button> 
            </NuxtLink>
            -->
        <button v-show="authenticated" v-if="$route.path == '/'" v-on:click="gotoUserPage" class="button-9"
          role="button">Mana Odze</button>
        <button v-show="authenticated" v-if="$route.path != '/'" v-on:click="logoutUser" class="button-9"
          role="button">Iziet</button>
      </div>

    </header>

    <div>
      <NuxtPage />
    </div>
  </div>
</template>


<style scoped>
/* CSS */
.button-9 {
  appearance: button;
  backface-visibility: hidden;
  background-color: green;
  border-radius: 6px;
  border-width: 0;
  box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset, rgba(50, 50, 93, .1) 0 2px 5px 0, rgba(0, 0, 0, .07) 0 1px 1px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  font-family: -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif;
  font-size: 100%;
  height: 44px;
  line-height: 1.15;
  margin: 12px 0 0;
  outline: none;
  overflow: hidden;
  padding: 0 25px;
  position: relative;
  text-align: center;
  text-transform: none;
  transform: translateZ(0);
  transition: all .2s, box-shadow .08s ease-in;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 100%;
}

.button-9:disabled {
  cursor: default;
}

.button-9:focus {
  box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset, rgba(50, 50, 93, .2) 0 6px 15px 0, rgba(0, 0, 0, .1) 0 2px 2px 0,
    rgba(50, 151, 211, .3) 0 0 0 4px;
}
</style>