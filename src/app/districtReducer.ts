import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DistrictsState {
    items: string[];
}

const initialState: DistrictsState = {
    items: [],
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
    },
});

export default districtsSlice.reducer;
export const { addDistrict, removeDistrict, clearDistricts } = districtsSlice.actions;
