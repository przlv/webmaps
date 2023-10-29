import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import {CheckboxListProps} from "../types/FinPoint"
import './ListCheckBox.css'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import {addRegion, removeRegion} from "../app/regionReducer";


export function ListCheckBoxRegions({ nameStorage, elements }: CheckboxListProps) {
    const selectedRegions = useAppSelector((state) => state.selectedRegions.items)
    const dispatch = useAppDispatch()

    const handleToggleRegions = (text: string) => () => {
        if (!selectedRegions.includes(text)) {
            dispatch(addRegion(text))
        } else {
            dispatch(removeRegion(text))
        }
    };

    return (
        <List className='list-checkbox'>
            {elements.map((value, index) => {
                const labelId = `checkbox-list-label-${index}`;
                return (
                    <ListItem className="checkbox-list-sidebar" key={index} role={undefined} dense onClick={handleToggleRegions(value)}>
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={selectedRegions.includes(value)}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                            />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={value} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="comments">
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}
        </List>
    );
}