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
import {ListCheckBoxRegions} from "./ListCheckBoxRegions";
import CustomSlider from "./Slider";
import infoData from "../data/infoData.json"
import './SideBarMenu.css'


const typePoints = infoData.typePoints.sort((a, b) => a.localeCompare(b, 'ru'));

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

    return (
        <Box role="presentation" className='sidebar-menu'>
                <List component="nav" className="sidebar-menu-tabs">
                    <div key={'Типы банковских объектов'} onMouseLeave={() => handleToggle(-1)}>
                        <ListItem className={target === 0 ? 'item-menu target-item' : 'item-menu'} disablePadding
                                  onMouseOver={() => handleMouseOver(0)}
                                  onMouseOut={handleMouseOut}>
                            <ListItemButton onClick={() => handleToggle(0)}>
                                <ListItemIcon>
                                    <AccountBalanceIcon className={target === 0 ? 'item-menu target-item' : 'item-menu'} />
                                </ListItemIcon>
                                <ListItemText primary={'Типы банковских объектов'} />
                                {open === 0 ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                        </ListItem>

                        <Collapse in={open === 0} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding onMouseOver={() => handleMouseOver(0)} onMouseOut={handleMouseOut}>
                                <ListItem disablePadding>
                                    <CheckboxList elements={typePoints}/>
                                </ListItem>
                            </List>
                        </Collapse>
                    </div>
                    <div key={'Регионы'} onMouseLeave={() => handleToggle(-1)}>
                    <ListItem className={target === 1 ? 'item-menu target-item' : 'item-menu'} disablePadding
                                  onMouseOver={() => handleMouseOver(1)}
                                  onMouseOut={handleMouseOut}>
                            <ListItemButton onClick={() => handleToggle(1)}>
                                <ListItemIcon>
                                    <TravelExploreIcon className={target === 1 ? 'item-menu target-item' : 'item-menu'} />
                                </ListItemIcon>
                                <ListItemText primary={'Регионы'} />
                                {open === 1 ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                        </ListItem>

                        <Collapse in={open === 1} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding onMouseOver={() => handleMouseOver(1)} onMouseOut={handleMouseOut}>
                                <ListItem disablePadding>
                                    <ListCheckBoxRegions />
                                </ListItem>
                            </List>
                        </Collapse>
                    </div>
                    <CustomSlider />
                </List>
            <Divider />
        </Box>
    )
}

