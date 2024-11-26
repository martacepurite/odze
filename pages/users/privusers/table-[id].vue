<script setup>
import { ref } from 'vue'

const id  = parseInt(useRoute().params.id.toString())

const val = ref(0)
const newentrytitle = ref('')

const { data: entries_data, refresh }  = await useFetch('/api/get_table_entries',{
        method: 'POST',
        body: {
            id: id
        }
    })

async function createEntry(){

const entry = await $fetch('/api/create_table_entry',{
        method: 'POST',
        body: {
            tableId: id, 
            title: newentrytitle.value,
            value: parseInt(val.value)
        }
    })
    refresh()

}



</script>
<template>
    <li v-for="entry in entries_data.entries">
        {{ entry.title }}
    </li>

    <form v-on:submit.prevent="createEntry">

        Nosaukums: <input v-model="newentrytitle" required/>
        Vērtība: <input v-model="val" required/>
        <input type="submit" value="Izveidot ierakstu">
    </form>


</template>