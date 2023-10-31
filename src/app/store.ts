import { configureStore } from '@reduxjs/toolkit'
import itemsReducer from './typePointsReducer'
import regionReducer from "./regionReducer";
import districtReducer from "./districtReducer";
import sliderReducer from "./sliderReducer";

export const store = configureStore({
    reducer: {
        selectedTypePoints: itemsReducer,
        selectedRegion: regionReducer,
        selectedDistricts: districtReducer,
        selectedGridSize: sliderReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch