<template>
    <div class="flex">
        <el-button @click="handleClickUp">up</el-button>
    </div>
    <div ref="mapRef" class="myRefCon" style="height: 600px">
    </div>
</template>

<script setup lang="ts">

import { onMounted, ref, watch } from 'vue';
import { useEchart } from './useEchart';
import { initLevelInfo } from './data';
// import gsap from 'gsap';

const mapRef = ref<HTMLDivElement | null>(null)

const {
    initEchartMap,
    updateEchartMap,
    currentLevelInfo,
} = useEchart(mapRef, initLevelInfo)


const handleClickUp = async () => {
    updateEchartMap && updateEchartMap({
        action: 'up',
    })
}

onMounted(initEchartMap)


watch(() => currentLevelInfo.value, async () => {
    updateEchartMap && updateEchartMap()
})

</script>