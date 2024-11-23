<script setup>
import { ref } from 'vue'

const id  = parseInt(useRoute().params.id.toString())

</script>

<template>
    <p>{{ id }}</p>
</template>