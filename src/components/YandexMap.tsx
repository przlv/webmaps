import React, { useState, useEffect } from 'react';
import { YMaps, Map, Placemark, ZoomControl, TypeSelector, RouteButton, ObjectManager } from '@pbe/react-yandex-maps';

import './Map.css';
import data from '../data/rezh.json'

import {Coords, CurrentCoords, PointFeature} from '../types/FinPoint'

export const YandexMap: React.FC = () => {
    const [mapState, setMapState] = useState<CurrentCoords>({
        center: [57.371976468912315, 61.395945886505494],
        zoom: 10,
    })

    const objects: PointFeature[] = data.features as PointFeature[];

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
                            preset: "islands#redClusterIcons",
                        }}
                        filter={(object: PointFeature) => object.id % 2 === 0}
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
