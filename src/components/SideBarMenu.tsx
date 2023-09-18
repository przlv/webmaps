import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import FilterListIcon from "@mui/icons-material/FilterList";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {Collapse} from "@mui/material";
import Divider from "@mui/material/Divider";
import React, {useState} from "react";
import {CheckboxList} from "./ListCheckBox";
import './SideBarMenu.css'

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

    const menuItems = ['Фильтры', 'Территориальные учреждения Банка России'];
    const typePoints = ['Офис банка (в т.ч. передвижной пункт)',
                        'Удаленная точка банк. обслуживания',
                        'Банкомат (с использованием банк. карт)',
                        'Банкомат (без использования банк. карт)',
                        'Банковские услуги в отделениях Почты России',
                        'Точка выдачи наличных в магазине',
                        'Точка оплаты наличными',
                        'Микрофинансовая организация',
                        'Страховая организация'];
    const ubr = ['Свердловская область', 'Республика Башкортостан', 'Ставропольский край', 'Хабаровский край', 'Амурская область','Архангельская область','Астраханская область','Белгородская область','Брянская область','Владимирская область','Волгоградская область','Вологодская область','Воронежская область','Ивановская область', 'Свердловская область', 'Республика Башкортостан', 'Ставропольский край', 'Хабаровский край', 'Амурская область','Архангельская область','Астраханская область','Белгородская область','Брянская область','Владимирская область','Волгоградская область','Вологодская область','Воронежская область','Ивановская область', 'Свердловская область', 'Республика Башкортостан', 'Ставропольский край', 'Хабаровский край', 'Амурская область','Архангельская область','Астраханская область','Белгородская область','Брянская область','Владимирская область','Волгоградская область','Вологодская область','Воронежская область','Ивановская область', 'Свердловская область', 'Республика Башкортостан', 'Ставропольский край', 'Хабаровский край', 'Амурская область','Архангельская область','Астраханская область','Белгородская область','Брянская область','Владимирская область','Волгоградская область','Вологодская область','Воронежская область','Ивановская область'];

    return (
        <Box role="presentation" className='sidebar-menu'>
            <List component="nav">
                {menuItems.map((text, index) => (
                    <div key={text}>
                        <ListItem className={target === index ? 'item-menu target-item' : 'item-menu'} disablePadding
                                  onMouseOver={() => handleMouseOver(index)}
                                  onMouseOut={handleMouseOut}>
                            <ListItemButton onClick={() => handleToggle(index)}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <FilterListIcon className={target === index ? 'item-menu target-item' : 'item-menu'} /> :
                                        <AccountBalanceIcon className={target === index ? 'item-menu target-item' : 'item-menu'} />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                                {open === index ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                        </ListItem>

                        <Collapse in={open === index} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding onMouseOver={() => handleMouseOver(index)} onMouseOut={handleMouseOut}>
                                <ListItem disablePadding>
                                    <CheckboxList elements={index === 0 ? typePoints:ubr}/>
                                </ListItem>
                            </List>
                        </Collapse>
                    </div>
                ))}
            </List>
            <Divider />
            <span className='info-text'>
                <br/>Информация, представленная на сайте,
                <br/>основана на отчетности финансовых организаций
                <br/>по состоянию на 01.07.2022
            </span>
        </Box>
    )
}

