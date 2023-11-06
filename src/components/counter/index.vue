<template>
    <div id="counter">
        <div>{{ count.toFixed(2) }}</div>
        <button @click="handleCount">click</button>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { animation } from '@/utils/animate';
const count = ref(999)
const handleCount = () => {
    animation(3000, 999, 9.9, (value) => {        
        if (count.value) count.value = value
    })
}
</script>