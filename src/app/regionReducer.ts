import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RegionsState {
    items: string;
}

const initialState: RegionsState = {
    items: '',
};


const regionSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        addRegion: (state, action: PayloadAction<string>) => {
            state.items = action.payload;
        },
        removeRegion: (state) => {
            state.items = '';
        },
    },
});

export default regionSlice.reducer;
export const { addRegion, removeRegion } = regionSlice.actions;
