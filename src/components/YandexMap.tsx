import React, { useState, useEffect } from 'react';
import { YMaps, Map, Placemark, ZoomControl, TypeSelector, RouteButton, ObjectManager } from '@pbe/react-yandex-maps';

import './Map.css';
import data from '../data/dataRegions/full_80.json'

import {Coords, CurrentCoords, FeatureCollection, PointFeature} from '../types/FinPoint'
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

    const [objects, setObjects] = useState<FeatureCollection | null>(null);

    const selectedTypePoints = useAppSelector((state) => state.selectedTypePoints.items);
    const selectedRegions = useAppSelector((state) => state.selectedRegions.items);

    const objectsLoad: FeatureCollection = data as FeatureCollection;
    useEffect(() => {
        setObjects(objectsLoad);
        console.log('loadData', objectsLoad);
    }, [])
    
    const infoDatasets: BankInterface = infoData as BankInterface;
    // useEffect(() => {
    //     if (selectedRegions.length > 0) {
    //         setObjects(null);
    //         const combinedFeatures: PointFeature[] = [] as PointFeature[];
    
    //         // Создаем массив обещаний для всех асинхронных запросов
    //         const promises = selectedRegions.map(region => {
    //             const numData: number = Number(infoDatasets.regions[region]);
    //             return getPoints(numData)
    //                 .then(dataset => {
    //                     if (dataset !== null) {
    //                         combinedFeatures.push(...dataset.features);
    //                     }
    //                 })
    //                 .catch(error => {
    //                     console.error('Произошла ошибка:', error);
    //                 });
    //         });
    
    //         // Ожидаем завершения всех асинхронных запросов
    //         Promise.all(promises).then(() => {
    //             const newObjects: FeatureCollection = {
    //                 type: "FeatureCollection",
    //                 features: combinedFeatures,
    //             };
    //             setObjects(newObjects);
    //             console.log('my', newObjects);
    //         });
    //     }
    // }, [selectedRegions]);
    
    

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
                        options={{
                            clusterize: true,
                            gridSize: 32,
                        }}
                        objects={{
                            openBalloonOnClick: true,
                            preset: "islands#greenDotIcon",
                        }}
                        clusters={{
                            preset: "islands#violetCircleDotIcon",
                        }}
                        // filter={(object: PointFeature) => {
                        //     // const balloonContentFooter = object.properties.balloonContentFooter;
                        //     return selectedTypePoints.includes(object.properties.typeObject)
                        // }}
                        defaultFeatures={objects}
                        modules={[
                            "objectManager.addon.objectsBalloon",
                            "objectManager.addon.objectsHint",
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
