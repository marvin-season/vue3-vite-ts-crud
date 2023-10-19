<template>
    <div>{{ user.name }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

let user = ref<{id: number, name: string}>({
    id: 1,
    name: 'J.M'
})

const otherUser = {
    id: 2,
    name: 'M.R'
}

setTimeout(() => {
    user.value = otherUser
}, 1000)
</script>