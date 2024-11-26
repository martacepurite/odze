<script setup>
const route = useRoute()
console.log(route.params)
</script>


<template>
  <div>
    <h1>Welcome private user</h1>

    <div class="user-menu">
      <NuxtLink :to="{ name: 'users-privusers-id-tables', params: { id: route.params.id}}">
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