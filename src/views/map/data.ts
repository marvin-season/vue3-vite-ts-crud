import { ElMessage } from "element-plus";
import { Ref } from "vue";

const base = "/src/assets/geo/";

const geoLevelUrlMap: Record<string, string> = {
  0: "省",
  1: "市",
  2: "县",
};

export interface LevelInfoProps {
  level: number;
  nameStack: string[];
}

export interface UpdateEchartOptionProps {
  mapData?: any;
  action: MapAction;
}

export type MapAction = "up" | "down";

export const initLevelInfo: LevelInfoProps = {
  level: 0,
  nameStack: ["甘肃省"],
};

export const getMapData: (
  currentLevelInfo: Ref<LevelInfoProps>,
  action?: MapAction
) => any = async (currentLevelInfo, action = "down") => {
  if (action == "up") {
    currentLevelInfo.value.level -= 1;
    currentLevelInfo.value.nameStack.pop();
  }

  const { nameStack, level } = currentLevelInfo.value;
  const url = base
    .concat(geoLevelUrlMap[level])
    .concat("/")
    .concat(nameStack.slice(-1)[0]);

  console.log("url", url);

  try {
    const response = await fetch(url.concat(".json"));
    return await response.json();
  } catch (error) {
    currentLevelInfo.value.level -= 1;
    currentLevelInfo.value.nameStack.pop();
    ElMessage.error("加载地图数据失败");
    return Promise.reject(null);
  }
};
