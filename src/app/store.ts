import { configureStore } from '@reduxjs/toolkit'
import itemsReducer from './typePointsReducer'
import regionReducer from "./regionReducer";
import districtReducer from "./districtReducer";
import sliderReducer from "./sliderReducer";
import filterDistrictsReducer from "./filterDistrictsReducer";

export const store = configureStore({
    reducer: {
        selectedTypePoints: itemsReducer,
        selectedRegion: regionReducer,
        selectedDistricts: districtReducer,
        selectedGridSize: sliderReducer,
        loadDistricts: filterDistrictsReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch