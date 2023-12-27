"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.YandexMap = void 0;
var react_1 = require("react");
var react_yandex_maps_1 = require("@pbe/react-yandex-maps");
require("./Map.css");
var hooks_1 = require("../app/hooks");
var filterDistrictsReducer_1 = require("../app/filterDistrictsReducer");
var infoData_json_1 = require("../data/infoData.json");
var getPointsData_1 = require("../data/getPointsData");
var getDisctrictsData_1 = require("../data/getDisctrictsData");
var apikey_json_1 = require("../apikey.json");
var regionReducer_1 = require("../app/regionReducer");
var apikey = apikey_json_1["default"].api;
var getDefaultRegion = function (coords, dispatch) { return __awaiter(void 0, void 0, void 0, function () {
    var apiKey, latitude, longitude, regions, geoTagRegion, response, data, addressDetails, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                apiKey = apikey;
                latitude = coords[0];
                longitude = coords[1];
                regions = Object.keys(infoData_json_1["default"].regions);
                geoTagRegion = sessionStorage.getItem('geo-tag-region');
                if (geoTagRegion) {
                    dispatch(regionReducer_1.addRegion(geoTagRegion));
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch("https://geocode-maps.yandex.ru/1.x/?format=json&apikey=" + apiKey + "&geocode=" + longitude + "," + latitude + "&kind=locality")];
            case 2:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 3:
                data = _a.sent();
                if (data.response && data.response.GeoObjectCollection.featureMember.length > 0) {
                    addressDetails = data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.Components;
                    addressDetails.map(function (address) {
                        if (regions.includes(address.name)) {
                            dispatch(regionReducer_1.addRegion(address.name));
                            sessionStorage.setItem('geo-tag-region', address.name);
                            return;
                        }
                    });
                }
                else {
                    dispatch(regionReducer_1.addRegion('Свердловская область'));
                    sessionStorage.setItem('geo-tag-region', 'Свердловская область');
                    return [2 /*return*/];
                }
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                console.error('Ошибка при выполнении запроса к Яндекс Геокодеру:', error_1);
                dispatch(regionReducer_1.addRegion('Свердловская область'));
                sessionStorage.setItem('geo-tag-region', 'Свердловская область');
                return [2 /*return*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.YandexMap = function () {
    var _a = react_1.useState({
        center: [57.371976468912315, 61.395945886505494],
        zoom: 10
    }), mapState = _a[0], setMapState = _a[1];
    var _b = react_1.useState([]), objects = _b[0], setObjects = _b[1];
    var selectedTypePoints = hooks_1.useAppSelector(function (state) { return state.selectedTypePoints.items; });
    var selectedRegion = hooks_1.useAppSelector(function (state) { return state.selectedRegion.items; });
    var selectedDistricts = hooks_1.useAppSelector(function (state) { return state.selectedDistricts.items; });
    var targetRegion = hooks_1.useAppSelector(function (state) { return state.selectedDistricts.targetRegion; });
    var selectedGridSize = hooks_1.useAppSelector(function (state) { return state.selectedGridSize.gridSize; });
    var dispatch = hooks_1.useAppDispatch();
    var infoDatasets = infoData_json_1["default"];
    react_1.useEffect(function () {
        function fetchData() {
            return __awaiter(this, void 0, void 0, function () {
                var region, numData, dataset, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(selectedRegion !== '' || targetRegion !== '')) return [3 /*break*/, 5];
                            setObjects([]);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            region = void 0;
                            if (selectedRegion !== '')
                                region = selectedRegion;
                            else
                                region = targetRegion;
                            numData = infoDatasets.regions[region];
                            return [4 /*yield*/, getPointsData_1["default"](numData)];
                        case 2:
                            dataset = _a.sent();
                            if (dataset !== null) {
                                setObjects(dataset.features);
                                setMapState({
                                    center: dataset.features[0].geometry.coordinates,
                                    zoom: 8
                                });
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            error_2 = _a.sent();
                            console.error('Произошла ошибка:', error_2);
                            return [3 /*break*/, 4];
                        case 4: return [3 /*break*/, 6];
                        case 5:
                            setObjects([]);
                            _a.label = 6;
                        case 6: return [2 /*return*/];
                    }
                });
            });
        }
        fetchData().then();
    }, [selectedRegion, targetRegion]);
    react_1.useEffect(function () {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var _a = position.coords, latitude = _a.latitude, longitude = _a.longitude;
                setMapState({
                    center: [latitude, longitude],
                    zoom: 12
                });
                getDefaultRegion([latitude, longitude], dispatch);
            });
        }
    }, []);
    react_1.useEffect(function () {
        getDisctrictsData_1["default"]().then(function (districtsData) {
            var regions = Object.keys(districtsData);
            var dataLoad = {
                districts: districtsData,
                regions: regions.sort()
            };
            dispatch(filterDistrictsReducer_1.loadFilterDistrict(dataLoad));
        });
    }, []);
    return (react_1["default"].createElement(react_yandex_maps_1.YMaps, { query: { apikey: apikey } },
        react_1["default"].createElement("div", { className: "wrapper-ym" },
            react_1["default"].createElement(react_yandex_maps_1.Map, { state: mapState, width: "100%", height: "100vh" },
                react_1["default"].createElement(react_yandex_maps_1.ZoomControl, null),
                react_1["default"].createElement(react_yandex_maps_1.TypeSelector, null),
                react_1["default"].createElement(react_yandex_maps_1.RouteButton, { options: { float: "right" } }),
                react_1["default"].createElement(react_yandex_maps_1.GeolocationControl, { options: { float: "right" } }),
                react_1["default"].createElement(react_yandex_maps_1.TrafficControl, null),
                react_1["default"].createElement(react_yandex_maps_1.RulerControl, null),
                react_1["default"].createElement(react_yandex_maps_1.ObjectManager, { key: selectedRegion, options: {
                        clusterize: true,
                        gridSize: selectedGridSize
                    }, objects: {
                        openBalloonOnClick: true
                    }, clusters: {
                        preset: "islands#violetCircleDotIcon"
                    }, features: objects, filter: function (object) {
                        var districtCheck = false;
                        var typeCheck;
                        if (selectedDistricts.length > 0) {
                            var balloonContentFooter = object.properties.balloonContentFooter;
                            for (var _i = 0, selectedDistricts_1 = selectedDistricts; _i < selectedDistricts_1.length; _i++) {
                                var district = selectedDistricts_1[_i];
                                if (balloonContentFooter.toLowerCase().includes(district.trim().toLowerCase())) {
                                    districtCheck = true;
                                    break;
                                }
                            }
                        }
                        else
                            districtCheck = true;
                        typeCheck = selectedTypePoints.includes(object.properties.typeObject);
                        return districtCheck && typeCheck;
                    }, modules: [
                        "objectManager.addon.objectsBalloon",
                        "objectManager.addon.objectsHint",
                        "objectManager.addon.clustersBalloon",
                        "objectManager.addon.clustersHint",
                    ] }),
                react_1["default"].createElement(react_yandex_maps_1.Placemark, { geometry: mapState.center, modules: ["geoObject.addon.balloon"], properties: {
                        hintContent: 'Ваше местоположение',
                        balloonContent: 'Вы здесь!'
                    } })))));
};
