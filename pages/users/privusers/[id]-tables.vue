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
async function deleteTable(table_id){
    console.log(table_id)
 const entries = await $fetch('/api/delete_table_entries',{
        method: 'POST',
        body: {
            id: table_id
        }
    })
    
const table = await $fetch('/api/delete_table',{
        method: 'POST',
        body: {
            id: table_id
        }
    })
 
    refresh()
}
</script>

<template>
    <h3>Manas tabulas</h3>
    <li v-for="table in tables_data.tables">
        <div class="table-row">
            <NuxtLink :to="{ name: 'users-privusers-table-id', params: { id: table.id}}">
                {{ table.name }}
            </NuxtLink>
            <button @click="deleteTable(table.id)" >X</button>
        </div>
    </li>
    <p>Jauna tabula</p>
    <form v-on:submit.prevent="createTable">

        Nosaukums: <input v-model="newtablename" required/>
        <input type="submit" value="Izveidot tabulu">
    </form>

</template>