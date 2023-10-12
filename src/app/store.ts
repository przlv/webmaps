import { configureStore } from '@reduxjs/toolkit'
import itemsReducer from './typePointsReducer'
import regionReducer from "./regionReducer";


export const store = configureStore({
    reducer: {
        selectedTypePoints: itemsReducer,
        selectedRegions: regionReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch