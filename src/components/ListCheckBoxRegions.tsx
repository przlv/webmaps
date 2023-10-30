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
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';


interface AdditionalListsVisible {
    [key: string]: boolean;
}

export function ListCheckBoxRegions() {
    const [dataRegions, setDataRegions] = useState<Districts>();
    const [elements, setElements] = useState<string[]>([]);
    const [additionalListsVisible, setAdditionalListsVisible] = useState<AdditionalListsVisible>({});

    useEffect(() => {
        getDistricts().then((districtsData) => {
            setDataRegions(districtsData);
            let regions = Object.keys(districtsData);
            setElements(regions.sort());
        });
    }, []);
    
    const [selectedDistrict, setSelectedDistrict] = useState<string[]>([]);
    const selectedRegions = useAppSelector((state) => state.selectedRegions.items)
    const dispatch = useAppDispatch()

    const handleToggleDistrict = (text: string) => () => {
        if (!selectedRegions.includes(text)) {
            setSelectedDistrict([...selectedDistrict, text]);
        } else {
            setSelectedDistrict(selectedDistrict.filter((district) => district !== text));
        }
    };

    const handleToggleRegions = (text: string) => () => {
        if (!selectedDistrict.includes(text)) {
            dispatch(addRegion(text))
        } else {
            dispatch(removeRegion(text))
        }
    }

    const toggleAdditionalList = (value: string) => () => {
        setAdditionalListsVisible({
          ...additionalListsVisible,
          [value]: !additionalListsVisible[value],
        });
    };
    
    return (
        <List className='list-checkbox'>
            {elements.map((value, index) => {
                const labelId = `checkbox-list-label-${index}`;
                return (
                    <div>
                        <ListItem className="checkbox-list-sidebar" key={index} role={undefined} dense onClick={toggleAdditionalList(value)}>
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
                            {additionalListsVisible[value] ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <div className='districts-listcheckbox'>
                            {additionalListsVisible[value] && (
                                <List>
                                    {dataRegions !== undefined ? dataRegions[value].map((district, index) => {
                                        const labelId = `checkbox-list-label-district-${index}`;
                                        return (
                                            <ListItem className="checkbox-list-sidebar" key={index} role={undefined} dense onClick={handleToggleDistrict(district)}>
                                                <ListItemIcon>
                                                    <Checkbox
                                                        size='small'
                                                        edge="start"
                                                        checked={selectedDistrict.includes(district)}
                                                        tabIndex={-1}
                                                        disableRipple
                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                    />
                                                </ListItemIcon>
                                                <ListItemText id={labelId} primary={district} />
                                                <IconButton edge="end" aria-label="comments"/>
                                            </ListItem>
                                        )
                                    }):[]}
                                </List>
                            )}
                        </div>
                    </div>
                );
            })}
        </List>
    );
}