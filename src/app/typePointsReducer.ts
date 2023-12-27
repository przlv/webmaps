import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PointsState {
    items: string[];
}

const initialState: PointsState = {
    items: ["Банкомат для операций с банк. картами, наличными и совершения безналичных платежей", "Офис банка (в т.ч. мобильный офис)"],
};


const typePointsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        addPoint: (state, action: PayloadAction<string>) => {
            state.items.push(action.payload);
        },
        removePoint: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item !== action.payload);
        },
    },
});

export default typePointsSlice.reducer;
export const { addPoint, removePoint } = typePointsSlice.actions;
