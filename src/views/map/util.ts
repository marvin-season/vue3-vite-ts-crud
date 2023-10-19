export const getMapData = async (name: string) => {
    const response = await fetch(`/src/assets/geo/甘肃省/${name}.json`);
    return await response.json();
}