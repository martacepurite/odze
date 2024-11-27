<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';

const { user_id } = storeToRefs(useAuthStore())
const { authenticated } = storeToRefs(useAuthStore())

</script>


<template>
  <div>
    <h1>Welcome private user</h1>

    <div class="user-menu">
      <NuxtLink :to="{ name: 'users-privusers-id-tables', params: { id: user_id}}">
        <button>Manas tabulas</button>
      </NuxtLink>
        <button>Rēķinu pārvalde</button>
        <button>Datu vizualizācija</button>
        <button>Pārskati</button>
    </div>
  <div class="contents-view">
    <NuxtPage />
  </div>
  </div>
</template>