import infoData from "./infoData.json"


interface FileFeature {
    properties: {
        balloonContentFooter: string;
    };
}

interface FileData {
    features: FileFeature[];
}

export default async function getDistrictsData(): Promise<{ [key: string]: string[] }> {
    const ids = [23, 64 /* ...другие числа */];
    const districtData: { [key: string]: string[] } = {};

    for (const id of ids) {
        try {
            // Динамически импортируйте каждый файл на основе списка ID
            const fileData: FileData = await import(`./data/dataRegions/file_${id}.json`);
            const region = Object.keys(infoData.regions).find(key => infoData.regions[key] === id.toString()) || 'Empty Region';

            const regular_districts: string[] = [];
            for (const point of fileData.features) {
                try {
                    let numDistrict = 1;
                    const districts = point.properties.balloonContentFooter
                        .split(',')
                        .map(element => element.trim().toLowerCase());

                    if (districts[numDistrict] === region.trim().toLowerCase() || districts[numDistrict] === 'Россия'.trim().toLowerCase()) {
                        numDistrict = 2;
                    }
                    const district = districts[numDistrict].trim().toLowerCase();
                    if (!regular_districts.includes(district)) {
                        regular_districts.push(district);
                    }
                } catch {
                    continue;
                }
            }
            districtData[region] = regular_districts;
        } catch (error) {
            console.error(`Error loading data for ID ${id}:`, error);
        }
    }

    return districtData;
}
