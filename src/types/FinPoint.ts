export interface PointFeature {
    type: "Feature";
    id: number;
    geometry: {
        type: "Point";
        coordinates: [number, number];
    };
    options: {
        preset: string;
        hideIconOnBalloonOpen: boolean;
    };
    properties: {
        balloonContentHeader: string;
        balloonContentBody: string;
        balloonContentFooter: string;
        clusterCaption: string;
        hintContent: string;
        typeObject: string;
        iconContent: string;
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

export interface CheckboxListProps {
    nameStorage: string;
    elements: string[];
}
