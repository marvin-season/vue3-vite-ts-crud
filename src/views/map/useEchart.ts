import { Ref, computed, onMounted, ref } from "vue";
import * as echarts from "echarts";
import {
  LevelInfoProps,
  MapAction,
  UpdateEchartOptionProps,
  getMapData,
  initLevelInfo as levelInfo,
} from "./data";

export const useEchart: (
  mapRef: Ref<HTMLDivElement | null>,
  initLevelInfo?: LevelInfoProps,
  onHandleUpdate?: () => void
) => {
  currentLevelInfo: Ref<LevelInfoProps>;
  initEchartMap: (mapData?: any) => void;
  updateEchartMap: (params?: UpdateEchartOptionProps) => void;
} = (mapRef, initLevelInfo = levelInfo, onHandleUpdate) => {
  const currentLevelInfo = ref<LevelInfoProps>(initLevelInfo);
  
  const mapName = computed(() => {
    return currentLevelInfo.value.nameStack.slice(-1)[0]
  })
  

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

  const initEchartMap = async (mapData?: any) => {
    await registerMap(mapData);
  };

  const updateEchartMap: (params?: UpdateEchartOptionProps) => void = async (
    params
  ) => {
    onHandleUpdate && onHandleUpdate();
    await registerMap(params?.mapData, params?.action);
  };

  const registerMap: (
    mapData?: any,
    action?: MapAction
  ) => Promise<void> = async (mapData = null, action = "down") => {
    let data = mapData;
    try {
      data = await getMapData(currentLevelInfo, action);
      if (myChart.value) {
        myChart.value.clear();
      }
      echarts.registerMap(mapName.value, data);

      myChart.value.setOption({
        geo: {
          map: mapName.value, // 使用详细信息的地图
        },
        series: [
          {
            type: "map",
            map: mapName.value,
          },
        ],
      });

      if (action == "down") {
        myChart.value.dispatchAction({
          type: "geoRoam",
          zoom: 2, // 放大级别
          center: [0, 0],
        });
      }
    } catch (error) {
      return Promise.reject(false);
    }
  };

  onMounted(initEchartStruct);

  return {
    initEchartMap,
    updateEchartMap,
    currentLevelInfo,
  };
};
