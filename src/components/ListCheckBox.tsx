import React, {useState, useEffect} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import {CheckboxListProps} from "../types/FinPoint"
import './ListCheckBox.css'

export function CheckboxList ({ elements }: CheckboxListProps) {
    const [checked, setChecked] = useState<number[]>(() => {
        const storedState: string | null = localStorage.getItem('checkboxState');
        return storedState ? JSON.parse(storedState) : [];
    });

    useEffect(() => {
        localStorage.setItem('checkboxState', JSON.stringify(checked));
    }, [checked]);

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <List className='list-checkbox'>
            {elements.map((value, index) => {
                const labelId = `checkbox-list-label-${index}`;

                return (
                    <ListItem className="checkbox-list-sidebar" key={index} role={undefined} dense onClick={handleToggle(index)}>
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={checked.indexOf(index) !== -1}
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