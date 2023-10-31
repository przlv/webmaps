import React from 'react';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {setupGridSize} from "../app/sliderReducer";

function CustomSlider() {
    const selectedGridSize = useAppSelector((state) => state.selectedGridSize.gridSize);
    const dispatch = useAppDispatch()

    const handleChange = (event: Event, newValue: number | number[]) => {
        dispatch(setupGridSize(newValue as number));
    };

    return (
        <div className="slider-cluster" style={{"padding": "2rem 5rem"}}>
            <Typography id="slider-label" gutterBottom>
                Размер кластеризации: {selectedGridSize}
            </Typography>
            <Slider
                value={selectedGridSize}
                onChange={handleChange}
                aria-labelledby="slider-label"
                valueLabelDisplay="auto"
                step={10}
                min={0}
                max={200}
            />
        </div>
    );
}

export default CustomSlider;
