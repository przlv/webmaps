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

export function CheckboxList ({ nameStorage, elements }: CheckboxListProps) {
    const [checked, setChecked] = useState<number[]>(() => {
        const storedState: string | null = sessionStorage.getItem(nameStorage);
        return storedState ? JSON.parse(storedState) : [];
    });

    const [checkedText, setCheckedText] = useState<string[]>(() => {
        const storedState: string | null = sessionStorage.getItem(nameStorage+'Text');
        return storedState ? JSON.parse(storedState) : [];
    });

    useEffect(() => {
        sessionStorage.setItem(nameStorage, JSON.stringify(checked));
        sessionStorage.setItem(nameStorage+'Text', JSON.stringify(checkedText));
    }, [checked, checkedText, nameStorage]);

    const handleToggle = (value: number, text: string) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        const newCheckedText = [...checkedText];

        if (currentIndex === -1) {
            newChecked.push(value);
            newCheckedText.push(text);
        } else {
            newChecked.splice(currentIndex, 1);
            newCheckedText.splice(currentIndex, 1);
        }

        setChecked(newChecked);
        setCheckedText(newCheckedText);
    };

    return (
        <List className='list-checkbox'>
            {elements.map((value, index) => {
                const labelId = `checkbox-list-label-${index}`;

                return (
                    <ListItem className="checkbox-list-sidebar" key={index} role={undefined} dense onClick={handleToggle(index, value)}>
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