import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {Collapse} from "@mui/material";
import Divider from "@mui/material/Divider";
import React, {useState} from "react";
import {CheckboxList} from "./ListCheckBox";
import data from '../data/full_80.json'
import regionsData from "../data/regions.json"
import {FeatureCollection} from "../types/FinPoint";
import './SideBarMenu.css'


const getDataSidebar = () => {
    const typePoints: string[] = [];
    const ubr: string[] = [];

    const dataJSON = data as FeatureCollection
    for (let obj of dataJSON.features) {
        if (!typePoints.includes(obj.properties.typeObject)) {
            typePoints.push(obj.properties.typeObject)
        }
        let currentUbr: string = obj.properties.balloonContentFooter.split(',')[1].trim();
        if (!ubr.includes(currentUbr)) {
            ubr.push(currentUbr)
        }
    }

    return [typePoints, ubr]
}
const [typePoints, ubr] = getDataSidebar();

export const SideBarMenu: React.FC = () => {
    const [target, setTarget] = useState<number | null>(null);
    const [open, setOpen] = useState<number>(-1);

    const handleMouseOver = (index: number) => {
        setTarget(index);
    };

    const handleMouseOut = () => {
        setTarget(null);
    };

    const handleToggle = (index: number) => {
        if (open === index) {
            setOpen(-1);
        } else {
            setOpen(index);
        }
    };
    //Если менять 1ый фильтр, то нужно поменять его также в ListCheckBox.tsx
    const menuItems = ['Типы банковских объектов', 'Регионы'];

    return (
        <Box role="presentation" className='sidebar-menu'>
            <List component="nav" className="sidebar-menu-tabs">
                {menuItems.map((text, index) => (
                    <div key={text}>
                        <ListItem className={target === index ? 'item-menu target-item' : 'item-menu'} disablePadding
                                  onMouseOver={() => handleMouseOver(index)}
                                  onMouseOut={handleMouseOut}>
                            <ListItemButton onClick={() => handleToggle(index)}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <AccountBalanceIcon className={target === index ? 'item-menu target-item' : 'item-menu'} /> :
                                        <TravelExploreIcon className={target === index ? 'item-menu target-item' : 'item-menu'} />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                                {open === index ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                        </ListItem>

                        <Collapse in={open === index} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding onMouseOver={() => handleMouseOver(index)} onMouseOut={handleMouseOut}>
                                <ListItem disablePadding>
                                    <CheckboxList nameStorage={text} elements={index === 0 ? typePoints:ubr}/>
                                </ListItem>
                            </List>
                        </Collapse>
                    </div>
                ))}
            </List>
            <Divider />
        </Box>
    )
}

