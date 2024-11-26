<script setup>
import { ref } from 'vue'

const id  = parseInt(useRoute().params.id.toString())
const newtablename = ref('')

const { data: user_data }  = await useFetch('/api/get_user_id',{
        method: 'POST',
        body: {
            id: id
        }
    })


const { data: tables_data, refresh}  = await useFetch('/api/get_org_tables',{
        method: 'POST',
        body: {
            id: user_data.value.user.orgId 
        }
        
    })

async function createTable(){

const table = await $fetch('/api/create_org_table',{
        method: 'POST',
        body: {
            orgId: user_data.value.user.orgId,
            name: newtablename.value
        }
    })
    refresh()

}

</script>

<template>
    <form v-on:submit.prevent="createTable">

        Nosaukums: <input v-model="newtablename" required/>
        <input type="submit" value="Izveidot tabulu">
    </form>
    <li v-for="table in tables_data.tables">
        <NuxtLink :to="{ name: 'users-privusers-table-id', params: { id: table.id}}">
        {{ table.name }}
        </NuxtLink>
    </li>

</template>