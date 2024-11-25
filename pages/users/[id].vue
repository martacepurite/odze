<script setup>
import { ref } from 'vue'

const id  = parseInt(useRoute().params.id.toString())

const { data: user_data }  = await useFetch('/api/get_user_id',{
        method: 'POST',
        body: {
            id: id
        }
    })

const { data: org_data}  = await useFetch('/api/get_org_id',{
        method: 'POST',
        body: {
            id: user_data.value.user.orgId 
        }
    })


</script>

<template>
    <div class="user-menu">
            <p>{{ user_data?.user?.email }}</p>
    <p v-show="!org_data.organization.isPrivate">{{ org_data?.organization.name}}</p>

        <button>Rēķinu pārvalde</button>
        <button>Datu vizualizācija</button>
        <button>Pārskati</button>
        <button>Manas tabulas</button>
    </div>
</template>