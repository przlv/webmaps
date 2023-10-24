import React, {useState, KeyboardEvent, MouseEvent, Fragment} from 'react';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import './SideBar.css'
import {SideBarMenu} from "./SideBarMenu";

const SideBar: React.FC = () => {
    const [state, setState] = useState<boolean>(false);

    const toggleDrawer =
        (open: boolean) =>
            (event: KeyboardEvent | MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as KeyboardEvent).key === 'Tab' ||
                        (event as KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }
                setState(open);
            };
    
    return (
        <Fragment>
            <MenuIcon
                className="menu-icon"
                onClick={toggleDrawer(true)} />
            <Drawer
                anchor='left'
                open={state}
                onClose={toggleDrawer(false)}
            >
                <div className="sidebar-menu">
                    <img className="logo-sidebar" src='/logo-menu.png' alt="Финансовая доступность"/>
                    <SideBarMenu />
                </div>
            </Drawer>
        </Fragment>
    );
};

export default SideBar;
