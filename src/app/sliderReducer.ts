import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SliderState {
    gridSize: number;
}

const initialState: SliderState = {
    gridSize: 50,
};


const SliderSlice = createSlice({
    name: 'gridSize',
    initialState,
    reducers: {
        setupGridSize: (state, action: PayloadAction<number>) => {
            state.gridSize = action.payload;
        },
    },
});

export default SliderSlice.reducer;
export const { setupGridSize } = SliderSlice.actions;
