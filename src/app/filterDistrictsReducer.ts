import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterDistrictState {
    districts: { [key: string]: string[] },
    regions: string[]
}

const initialState: FilterDistrictState = {
    districts: {},
    regions: []
};


const FilterDistrictSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        loadFilterDistrict: (state, action: PayloadAction<FilterDistrictState>) => {
            state.districts = action.payload.districts as { [key: string]: string[] };
            state.regions = action.payload.regions as string[];
        },
    },
});

export default FilterDistrictSlice.reducer;
export const { loadFilterDistrict } = FilterDistrictSlice.actions;
