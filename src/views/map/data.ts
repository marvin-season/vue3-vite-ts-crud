import { ElMessage } from "element-plus";
import { Ref } from "vue";

const base = "/src/assets/geo/";

const MapLevelsNameOrder = ["国", "省", "市", "县"];

export const getLevel = (levelName: string) => {
  return MapLevelsNameOrder.indexOf(levelName);
}

export interface LevelInfoProps {
  level: number;
  nameStack: string[];
}

export interface UpdateEchartOptionProps {
  action?: MapAction;
  levelInfo?: LevelInfoProps
}

export type MapAction = "up" | "down";

export const initLevelInfo: LevelInfoProps = {
  level: getLevel("国"),
  nameStack: ["中华人民共和国"],
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
    .concat(MapLevelsNameOrder[level])
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
