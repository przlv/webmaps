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
import {addPoint, removePoint} from "../app/typePointsReducer";


export function CheckboxList ({elements}: CheckboxListProps) {
    const selectedTypePoints = useAppSelector((state) => state.selectedTypePoints.items)
    const dispatch = useAppDispatch()

    const handleToggleTypePoints = (text: string) => () => {
        if (!selectedTypePoints.includes(text)) {
            dispatch(addPoint(text))
        } else {
            dispatch(removePoint(text))
        }
    };

    return (
        <List className='list-checkbox'>
            {elements.map((value, index) => {
                const labelId = `checkbox-list-label-${index}`;
                return (
                    <ListItem className="checkbox-list-sidebar" key={index} role={undefined} dense onClick={handleToggleTypePoints(value)}>
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={selectedTypePoints.includes(value)}
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