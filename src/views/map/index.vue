<template>
    <div class="flex">
        <el-button @click="handleClickUp">up</el-button>
    </div>
    <div ref="mapRef" style="width: 600px; height: 400px">
    </div>
</template>

<script setup lang="ts">

import mapData from '@/assets/geo/甘肃省/index.json' // 你的地图数据文件
import { onMounted, ref, watch } from 'vue';
import { mapService } from './machine';
import { useEchart } from './useEchart';
import { getMapData } from './util';

const mapRef = ref<HTMLDivElement | null>(null)

const {
    initEchartOption,
    updateEchartOption,
    currentLevelInfo,
} = useEchart(mapRef)


onMounted(() => {
    initEchartOption(mapData)
})

watch(() => currentLevelInfo.value, async (info) => {
    const data = await getMapData(info);
    updateEchartOption(data)
})

onMounted(() => {
    mapService.start()

    mapService.subscribe((state) => {
        // 在状态变化时更新地图数据和视图
        switch (state.value) {
            case 'province':
                console.log('loadProvinceMap');

                break;
            case 'city':
                console.log('loadCityMap');

                break;
            // case 'district':
            //   loadDistrictMap();
            //   break;
            // case 'county':
            //   loadCountyMap();
            //   break;
        }
    });

})

const handleClickUp = () => {

}

</script>