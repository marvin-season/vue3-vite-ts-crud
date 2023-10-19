import { Ref } from "vue";

const base = "/src/assets/geo/";

const geoLevelUrlMap: Record<string, string> = {
  0: "省",
  1: "市",
  2: "县",
};

export interface LevelInfoProps {
  level: number;
  name: string;
  nameStack: string[];
}

export const initLevelInfo: LevelInfoProps = {
  level: 0,
  name: "甘肃省",
  nameStack: ["甘肃省"],
};

export const getMapData: (
  currentLevelInfo: Ref<LevelInfoProps>,
  action?: "up" | "down"
) => any = async (currentLevelInfo, action = "down") => {
  if (action == "up") {
    currentLevelInfo.value.level -= 1;
    currentLevelInfo.value.nameStack.pop();
    currentLevelInfo.value.name =
      currentLevelInfo.value.nameStack[
        currentLevelInfo.value.nameStack.length - 1
      ];
  }

  const { name, level } = currentLevelInfo.value;
  const url = base.concat(geoLevelUrlMap[level]).concat("/").concat(name);

  console.log("url", url);

  const response = await fetch(url.concat(".json"));
  return await response.json();
};
