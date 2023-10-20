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
import {  initLevelInfo } from './data';
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
    initEchartMap,
    updateEchartMap,
    currentLevelInfo,
} = useEchart(mapRef, initLevelInfo, onHandleUpdate)


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