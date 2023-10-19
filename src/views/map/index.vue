<template>
    <div class="flex">
        <el-button @click="handleClickUp">up</el-button>
    </div>
    <div ref="mapRef" class="myRefCon" style="width: 600px; height: 400px">
    </div>
</template>

<script setup lang="ts">

import { onMounted, ref, watch } from 'vue';
import { useEchart } from './useEchart';
import { getMapData, initLevelInfo } from './data';
import gsap from 'gsap';

const mapRef = ref<HTMLDivElement | null>(null)

const onHandleUpdate = () => {
    gsap.to(".myRefCon", {
        duration: 1, scale: 1.5, ease: 'power1.inOut', onComplete: () => {
            gsap.to(".myRefCon", { duration: 1, scale: 1, ease: 'power1.inOut' });
        }
    });

}

const {
    initEchartOption,
    updateEchartOption,
    currentLevelInfo,
} = useEchart(mapRef, initLevelInfo, onHandleUpdate)


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