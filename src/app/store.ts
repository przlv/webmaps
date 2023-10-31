import { configureStore } from '@reduxjs/toolkit'
import itemsReducer from './typePointsReducer'
import regionReducer from "./regionReducer";
import districtReducer from "./districtReducer";

export const store = configureStore({
    reducer: {
        selectedTypePoints: itemsReducer,
        selectedRegions: regionReducer,
        selectedDistricts: districtReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch