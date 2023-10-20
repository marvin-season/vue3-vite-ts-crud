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
  let tempName = undefined;
  if (action == "up") {
    currentLevelInfo.value.level -= 1;
    tempName = currentLevelInfo.value.nameStack.pop();
  }

  const { nameStack, level } = currentLevelInfo.value;
  const url = base
    .concat(geoLevelUrlMap[level])
    .concat("/")
    .concat(nameStack.slice(-1)[0])
    .concat(".json");

  console.log("url", url);

  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    // rollback
    if (action == "up" && tempName) {
      currentLevelInfo.value.level += 1;
      currentLevelInfo.value.nameStack.push(tempName);
    } else {
      currentLevelInfo.value.level -= 1;
      currentLevelInfo.value.nameStack.pop();
    }

    ElMessage.error("加载地图数据失败");
    throw new Error("加载地图数据失败");
  }
};
