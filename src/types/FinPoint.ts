export interface PointFeature {
    type: "Feature";
    id: number;
    geometry: {
        type: "Point";
        coordinates: [number, number];
    };
    properties: {
        balloonContentHeader: string;
        balloonContentBody: string;
        balloonContentFooter: string;
        clusterCaption: string;
        hintContent: string;
    };
    options: {
        preset: string;
    };
}

export interface FeatureCollection {
    type: "FeatureCollection";
    features: PointFeature[];
}

export interface Coords {
    latitude: number;
    longitude: number;
}

export interface CurrentCoords {
    center: number[];
    zoom: number;
}