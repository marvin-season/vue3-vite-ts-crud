<template>
    <div class="flex">
        <el-button @click="handleClickUp">up</el-button>
    </div>
    <div ref="mapRef" style="width: 600px; height: 400px">
    </div>
</template>

<script setup lang="ts">

import { onMounted, ref, watch } from 'vue';
import { mapService } from './machine';
import { useEchart } from './useEchart';
import { getMapData, initLevelInfo } from './data';

const mapRef = ref<HTMLDivElement | null>(null)

const {
    initEchartOption,
    updateEchartOption,
    currentLevelInfo,
} = useEchart(mapRef, initLevelInfo)


const handleClickUp = async () => {
    try {
        const data = await getMapData(currentLevelInfo, 'up');
        updateEchartOption(data)
    } catch (error) {

    }
}


onMounted(async () => {
    try {
        const data = await getMapData(currentLevelInfo);
        initEchartOption(data)
    } catch (error) {

    }
})


watch(() => currentLevelInfo.value, async () => {
    try {
        const data = await getMapData(currentLevelInfo);
        updateEchartOption(data)
    } catch (error) {

    }
})

</script>./data