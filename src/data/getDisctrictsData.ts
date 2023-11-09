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
    const infoRegions: { [key: string]: string } = infoData.regions;
    const districtData: { [key: string]: string[] } = {};

    for (const id of Object.values(infoRegions)) {
        try {
            const fileData: FileData = await import(`./dataRegions/full_${id}.json`);
            const region = Object.keys(infoRegions).find(key => infoRegions[key] === id) || 'Empty Region';

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
                    console.log('error');
                }
            }
            districtData[region] = regular_districts.sort();
        } catch (error) {
            console.error(`Error loading data for ID ${id}:`, error);
        }
    }

    return districtData;
}
