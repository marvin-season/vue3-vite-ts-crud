const base = "/src/assets/geo/甘肃省";

export interface LevelInfoProps {
  level: number;
  name: string;
  preName?: string;
  url: string;
  preUrl: string;
}

export const initLevelInfo: LevelInfoProps = {
  level: 0,
  name: "甘肃省",
  preUrl: base,
  url: base,
  preName: "甘肃省",
};

export const getMapData = async (currentLevelInfo: LevelInfoProps) => {
    console.log(currentLevelInfo.url.concat('.json'));
    
  const response = await fetch(currentLevelInfo.url.concat('.json'));
  return await response.json();
};
