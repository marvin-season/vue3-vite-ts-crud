<template>
    <div ref="mapRef" style="width: 600px; height: 400px">

    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import mapData from '@/assets/map/gansu.json'; // 你的地图数据文件
import { onMounted, ref } from 'vue';

const mapRef = ref<HTMLDivElement | null>(null)


onMounted(() => {
    console.log(mapRef);

    // 初始化 ECharts 实例
    const myChart = echarts.init(mapRef.value);

    // 使用 mapData 加载地图
    // @ts-ignore
    echarts.registerMap('customMap', mapData);
    myChart.setOption({
        series: [
            {
                type: 'map',
                map: 'customMap',
            },
        ],
    });
})
</script>