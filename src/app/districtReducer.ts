import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DistrictsState {
    items: string[];
    targetRegion: string;
}

const initialState: DistrictsState = {
    items: [],
    targetRegion: ""
};


const districtsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        addDistrict: (state, action: PayloadAction<string>) => {
            state.items.push(action.payload);
        },
        removeDistrict: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item !== action.payload);
        },
        clearDistricts: (state) => {
            state.items = [];
        },
        setupTargetRegion: (state, action: PayloadAction<string>) => {
            state.targetRegion = action.payload;
        }
    },
});

export default districtsSlice.reducer;
export const { addDistrict, removeDistrict, clearDistricts, setupTargetRegion } = districtsSlice.actions;
