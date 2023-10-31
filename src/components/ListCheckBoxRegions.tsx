import {useState, useEffect, useCallback} from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import {Collapse} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import {Districts} from "../types/FinPoint"
import './ListCheckBox.css'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import {addRegion, removeRegion} from "../app/regionReducer";
import getDistricts from '../data/getDistrict';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {addDistrict, removeDistrict, clearDistricts} from "../app/districtReducer";


interface AdditionalListsVisible {
    [key: string]: boolean;
}

export function ListCheckBoxRegions() {
    const [targetRegion, setTargetRegion] = useState<string>('');
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

    const selectedDistricts = useAppSelector((state) => state.selectedDistricts.items)
    const selectedRegion = useAppSelector((state) => state.selectedRegions.items)
    const dispatch = useAppDispatch()

    const handleToggleDistrict = useCallback((text: string, region: string) => {
        dispatch(removeRegion());
        if (!selectedDistricts.includes(text)) {
            if  (targetRegion === '') {
                setTargetRegion(region);
            }
            else {
                if (region !== targetRegion) {
                    dispatch(clearDistricts());
                    setTargetRegion(region);
                }
            }
            dispatch(addDistrict(text));
        } else {
            dispatch(removeDistrict(text))
        }
    }, [dispatch, selectedDistricts]);

    const handleToggleRegions = useCallback((text: string) => {
        if (!(selectedRegion === text)) {
            dispatch(addRegion(text));
            dispatch(clearDistricts());
        } else {
            dispatch(removeRegion());
        }
    }, [dispatch, selectedRegion]);

    const toggleAdditionalList = useCallback((value: string) => {
        setAdditionalListsVisible((prev) => ({
            ...prev,
            [value]: !prev[value],
        }));
    }, []);
    
    return (
        <List className='list-checkbox'>
            {elements.map((region, index) => {
                const labelId = `checkbox-list-label-${index}`;
                return (
                    <div key={`${index}-mainList`}>
                        <div className='regions-list-checkbox'>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={selectedRegion === region}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                    onClick={() => handleToggleRegions(region)}
                                />
                            </ListItemIcon>
                            <ListItem className="checkbox-list-sidebar" key={index} role={undefined} dense onClick={() => toggleAdditionalList(region)}>
                                <ListItemText id={labelId} primary={region} />
                                {additionalListsVisible[region] ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                        </div>
                        <div className='districts-listcheckbox'>
                            <Collapse in={additionalListsVisible[region]} timeout="auto" unmountOnExit>
                                <List>
                                    {dataRegions !== undefined ? dataRegions[region].sort().map((district, index) => {
                                        const labelId = `checkbox-list-label-district-${index}`;
                                        return (
                                            <ListItem className="checkbox-list-sidebar" key={`${index}-additionallyList`} role={undefined} dense onClick={() => handleToggleDistrict(district, region)}>
                                                <ListItemIcon>
                                                    <Checkbox
                                                        size='small'
                                                        edge="start"
                                                        checked={selectedDistricts.includes(district)}
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
                            </Collapse>
                        </div>
                    </div>
                );
            })}
        </List>
    );
}