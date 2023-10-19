import { Ref, onMounted, ref } from "vue";
import * as echarts from "echarts";
import { LevelInfoProps, initLevelInfo as levelInfo } from "./data";

export const useEchart: (
  mapRef: Ref<HTMLDivElement | null>,
  initLevelInfo?: LevelInfoProps
) => {
  myChart: Ref<any>;
  initEchartStruct: (mapRef_?: Ref<HTMLDivElement | null>) => void;
  currentLevelInfo: Ref<LevelInfoProps>;
  initEchartOption: (mapData: any) => void;
  updateEchartOption: (mapData: any) => void;
} = (mapRef, initLevelInfo = levelInfo) => {
  const initOption = {
    series: [
      {
        type: "map",
        map: levelInfo.nameStack.slice(-1)[0],
      },
    ],
  };

  const currentLevelInfo = ref<LevelInfoProps>(initLevelInfo);

  const myChart = ref();

  const initEchartStruct = (mapRef_?: Ref<HTMLDivElement | null>) => {
    myChart.value?.clear();
    // 初始化 ECharts 实例
    myChart.value = echarts.init(mapRef_?.value ?? mapRef?.value);
    // 注册点击事件
    myChart.value.on("click", function (params: any) {
      console.log("click params", params);

      // 在这里处理点击事件
      currentLevelInfo.value = {
        level: currentLevelInfo.value.level + 1,
        nameStack: currentLevelInfo.value.nameStack.concat(params.name),
      };
    });
  };

  const initEchartOption = (mapData: any) => {
    // @ts-ignore
    echarts.registerMap(currentLevelInfo.value.nameStack.slice(-1)[0], mapData);
    myChart.value.setOption(initOption);
  };

  const updateEchartOption = async (mapData: any) => {
    myChart.value.clear();
    // 使用 mapData 加载地图
    echarts.registerMap(currentLevelInfo.value.nameStack.slice(-1)[0], mapData);

    myChart.value.setOption({
      series: [
        {
          type: "map",
          map: currentLevelInfo.value.nameStack.slice(-1)[0],
        },
      ],
    });
  };

  onMounted(initEchartStruct);

  return {
    myChart,
    initEchartStruct,
    initEchartOption,
    updateEchartOption,
    currentLevelInfo,
  };
};