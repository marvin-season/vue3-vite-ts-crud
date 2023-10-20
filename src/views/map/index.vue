<template>
    <div class="flex">
        <el-button @click="handleInit">初始化</el-button>
        <el-button @click="handleClickUp">up</el-button>
    </div>
    <div ref="mapRef" class="myRefCon" style="height: 600px">
    </div>
</template>

<script setup lang="ts">

import { ref, watch } from 'vue';
import { useEchart } from './useEchart';
import { initLevelInfo, getLevel } from './data';
// import gsap from 'gsap';‘

const mapRef = ref<HTMLDivElement | null>(null)

const {
    updateEchartMap,
    currentLevelInfo,
} = useEchart(mapRef, initLevelInfo)


const handleInit = () => {
    updateEchartMap({
        levelInfo: {
            level: getLevel('省'),
            nameStack: ['中华人民共和国', '甘肃省']
        }
    })
}

const handleClickUp = async () => {
    updateEchartMap && updateEchartMap({
        action: 'up',
    })

}

watch(() => currentLevelInfo.value, async () => {
    updateEchartMap && updateEchartMap()
})

</script>