<template>
    <div @click="handleClick">AAA</div>
    <div ref="mapRef" style="width: 600px; height: 400px">

    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import mapData from '@/assets/geo/甘肃省/index.json' // 你的地图数据文件
import { onMounted, ref } from 'vue';
import { mapService } from './machine';
import { useOption } from './useOption';

const mapRef = ref<HTMLDivElement | null>(null)
const myChart = ref()
const selectedName = ref('customMap')

const { option, updateOption } = useOption()


const getMapData = async (name: string) => {
    const response = await fetch(`/src/assets/geo/甘肃省/${name}.json`);
    return await response.json();
}


const initEchartStruct = () => {
    // 初始化 ECharts 实例
    myChart.value = echarts.init(mapRef.value);

    // 注册点击事件
    myChart.value.on('click', function (params: any) {
        // 在这里处理点击事件
        selectedName.value = params.name;
        // 调用函数以显示选定市区的详细地图
        // showCityMap(selectedName);
    });
}
const initEchartOption = () => {
    // @ts-ignore
    echarts.registerMap(selectedName.value, mapData);
    myChart.value.setOption(option.value);
}
const updateEchartOption = async () => {

    const data = await getMapData(selectedName.value)
    // 使用 mapData 加载地图
    echarts.registerMap(selectedName.value, data);
    updateOption({
        series: [
            {
                type: "map",
                map: selectedName.value,
            },
        ],
    })
}



onMounted(initEchartStruct)
onMounted(initEchartOption)
// onMounted(updateEchartOption)



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

const handleClick = () => {
    mapService.send('SWITCH_TO_CITY')
}
</script>