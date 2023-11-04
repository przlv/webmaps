import { FeatureCollection } from "../types/FinPoint";

async function getPointsData(id: string): Promise<FeatureCollection> {
    const data = await import(`./dataRegions/full_${id}.json`);
    return data.default;
}

export default getPointsData;