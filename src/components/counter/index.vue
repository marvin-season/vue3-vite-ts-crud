<template>
    <div>
        <div id="counter">
            <div>{{ count.toFixed(2) }}</div>
            <button @click="handleCount">click</button>
        </div>
        <div id="number">
            <NNumberAnimation ref="numberAnimationInstRef" :from="999" :active="true" :to="9.9" :duration="2000"/>
            <button @click="handleNumber">click</button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { animation } from '@/utils/animate';
import { NNumberAnimation, NumberAnimationInst } from 'naive-ui'

const numberAnimationInstRef = ref<NumberAnimationInst | null>(null)
const handleNumber = () => {
    numberAnimationInstRef.value?.play()
}


const count = ref(999)
const handleCount = () => {
    animation(3000, 999, 9.9, (value) => {
        if (count.value) count.value = value
    })
}
</script>