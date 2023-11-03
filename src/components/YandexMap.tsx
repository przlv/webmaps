import React, { useState, useEffect } from 'react';
import { YMaps, Map, Placemark, ZoomControl, TypeSelector, RouteButton, ObjectManager } from '@pbe/react-yandex-maps';

import './Map.css';

import {Coords, CurrentCoords, PointFeature} from '../types/FinPoint'
import { useAppSelector } from '../app/hooks'
import getPoints from "../data/getPoints";
import infoData from "../data/infoData.json"


interface BankLocation {
    [region: string]: string;
}
  
interface BankInterface {
    regions: BankLocation;
    typePoints: string[];
}


export const YandexMap: React.FC = () => {
    const [mapState, setMapState] = useState<CurrentCoords>({
        center: [57.371976468912315, 61.395945886505494],
        zoom: 10,
    });

    const [objects, setObjects] = useState<PointFeature[]>([]);

    const selectedTypePoints = useAppSelector((state) => state.selectedTypePoints.items);
    const selectedRegion = useAppSelector((state) => state.selectedRegion.items);
    const selectedDistricts = useAppSelector((state) => state.selectedDistricts.items);
    const targetRegion = useAppSelector((state) => state.selectedDistricts.targetRegion);
    const selectedGridSize = useAppSelector((state) => state.selectedGridSize.gridSize);

    const infoDatasets: BankInterface = infoData as BankInterface;
    useEffect(() => {
        async function fetchData() {
            if (selectedRegion !== '' || targetRegion !== '') {
                setObjects([]);

                try {
                    let region: string;
                    if (selectedRegion !== '') region = selectedRegion;
                    else region = targetRegion;

                    const numData = Number(infoDatasets.regions[region]);
                    const dataset = await getPoints(numData);
                    if (dataset !== null) {
                        setObjects(dataset.features);
                    }
                } catch (error) {
                    console.error('Произошла ошибка:', error);
                }
            }
            else setObjects([]);
        }
        fetchData();
    }, [selectedRegion, targetRegion]);

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude }: Coords = position.coords;
                setMapState({
                    center: [latitude, longitude],
                    zoom: 12,
                });
            });
        }
    }, []);

    return (
        <YMaps query={{apikey:'23433d4b-ba8e-4b36-8d78-40afc5eb0acf'}}>
            <div className="wrapper-ym">
                <Map state={mapState} width="100%" height="100vh">
                    <ZoomControl />
                    <TypeSelector />
                    <RouteButton options={{ float: "right" }} />
                    <ObjectManager
                        key={selectedRegion}
                        options={{
                            clusterize: true,
                            gridSize: selectedGridSize,
                        }}
                        objects={{
                            openBalloonOnClick: true,
                            // preset: "islands#greenDotIcon",
                        }}
                        clusters={{
                            preset: "islands#violetCircleDotIcon",
                        }}
                        features={objects}

                        filter={(object: PointFeature) => {
                            let districtCheck: boolean = false;
                            let typeCheck: boolean;

                            if (selectedDistricts.length > 0) {
                                const balloonContentFooter = object.properties.balloonContentFooter;
                                for (let district of selectedDistricts) {
                                    if (balloonContentFooter.toLowerCase().includes(district.trim().toLowerCase())) {
                                        districtCheck = true;
                                        break;
                                    }
                                }
                            }
                            else districtCheck = true;


                            typeCheck = selectedTypePoints.includes(object.properties.typeObject);

                            return districtCheck && typeCheck;
                        }}
                        modules={[
                            "objectManager.addon.objectsBalloon",
                            "objectManager.addon.objectsHint",
                            "objectManager.addon.clustersBalloon",
                            "objectManager.addon.clustersHint",
                        ]}
                    />
                    <Placemark
                        geometry={mapState.center}
                        modules={["geoObject.addon.balloon"]}
                        properties={{
                            hintContent: 'Ваше местоположение',
                            balloonContent: 'Вы здесь!',
                        }}
                    />
                </Map>
            </div>
        </YMaps>
    );
}
