import { Ref, onMounted, ref } from "vue";
import * as echarts from "echarts";

export const useEchart: (mapRef: Ref<HTMLDivElement | null>) => {
  myChart: Ref<any>;
  initEchartStruct: any;
  selectedName: Ref<any>;
  initEchartOption: any,
  updateEchartOption: any,
} = (mapRef) => {
  const option = ref({
    series: [
      {
        type: "map",
        map: "customMap",
      },
    ],
  });
  const myChart = ref();
  const selectedName = ref("customMap");

  const initEchartStruct = () => {
    // 初始化 ECharts 实例
    myChart.value = echarts.init(mapRef.value);
    // 注册点击事件
    myChart.value.on("click", function (params: any) {
      // 在这里处理点击事件
      selectedName.value = params.name;
      // 调用函数以显示选定市区的详细地图
      // showCityMap(selectedName);
    });
  };

  const initEchartOption = (mapData: any) => {
    // @ts-ignore
    echarts.registerMap(selectedName.value, mapData);
    myChart.value.setOption(option.value);
  };

  const updateEchartOption = async (mapData: any) => {
    myChart.value.clear();
    // 使用 mapData 加载地图
    echarts.registerMap(selectedName.value, mapData);

    myChart.value.setOption({
      series: [
        {
          type: "map",
          map: selectedName.value,
        },
      ],
    });
  };

  onMounted(initEchartStruct)

  return {
    myChart,
    option,
    initEchartStruct,
    initEchartOption,
    updateEchartOption,
    selectedName,
  };
};
