import {useState, useEffect} from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import {Districts} from "../types/FinPoint"
import './ListCheckBox.css'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import {addRegion, removeRegion} from "../app/regionReducer";
import getDistricts from '../data/getDistrict';


export function ListCheckBoxRegions() {
    const [dataRegions, setDataRegions] = useState<Districts>();
    const [elements, setElements] = useState<string[]>([]);

    useEffect(() => {
        getDistricts().then((districtsData) => {
            setDataRegions(districtsData);
            let regions = Object.keys(districtsData);
            setElements(regions.sort());
        });
    }, []);
    
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
                    <ListItem className="checkbox-list-sidebar" key={index} role={undefined} dense>
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={selectedRegions.includes(value)}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                                onClick={handleToggleRegions(value)}
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