import React from 'react';
import {Paper, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Button} from '@mui/material';
import Month from '../models/month';
import Day from '../models/day';

interface CalendarViewProps {
    month: Month
    eventDays: number[]
    closedDays: number[]
    onEventDayClick: (dayIndex: number) => void
    onClosedDayClick: (dayIndex: number) => void
    color: 'primary' | 'secondary'
}

const CalendarView: React.FC<CalendarViewProps> = ({ month, onEventDayClick, onClosedDayClick, eventDays, closedDays, color }) => {
    const colors =  {event: '#00FF00', closed: '#FF0000'}
    const handleLeftClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, dayId: number) => {
        const isCtrlPressed = e.ctrlKey || e.metaKey;
        if(isCtrlPressed){
            onClosedDayClick(dayId)
            return
        }
        onEventDayClick(dayId)
    };

    const handleRightClick = (dayId: number) => {
        onClosedDayClick(dayId)
    };

    const daysOfMonth = Array.from(month.days.values()).map((day, index) => {
        return (
                <TableCell key={index}>
                    <Button
                        variant={'outlined'}
                        color={color}
                        style={{
                            padding: '10px',
                            textAlign: 'center',
                            width: '30px',
                            transition: 'background-color 0.5s ease',
                            backgroundColor: closedDays.some(d => d === index + 1) ?
                                colors.closed : eventDays.some(d => d === index + 1) ? colors.event : 'inherit',
                            color: closedDays.some(d => d === index + 1) || eventDays.some(d => d === index + 1) ? '#FFFFFF' : 'inherit',
                            cursor: 'pointer'
                        }}
                        onClick={(e) => handleLeftClick(e, index + 1)}
                        onContextMenu={(e) => {
                            e.preventDefault()
                            handleRightClick(index + 1);
                        }}
                    >
                        <Typography variant="body1">{index + 1}</Typography>
                    </Button>
                </TableCell>
        )
    })

    for(let dayOfWeek = 1; dayOfWeek <= 7; dayOfWeek++) {
        if(month.days.get(1)?.id !== dayOfWeek) {
            daysOfMonth.unshift(
                <TableCell key={daysOfMonth.length - 1 + dayOfWeek}>
                    <Paper></Paper>
                </TableCell>
            )
        } else {
            break
        }
    }

    const daysOfWeekHeaders = Day.All.map((day) => (
        <TableCell key={day.id}>
            <Typography variant="body2" style={{width: '100%', textAlign: 'center'}}>{day.shorthand}</Typography>
        </TableCell>
    ));

    const weeks: any[] = []
    for (let i = 0; i < daysOfMonth.length; i += 7) {
        const week = daysOfMonth.slice(i, i + 7);
        weeks.push(
            <TableRow key={i}>
                {week}
            </TableRow>
        );
    }

    return (
        <div>
            <TableContainer>
                <Table>
                    <TableBody>
                        <TableRow>{daysOfWeekHeaders}</TableRow>
                        {weeks}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default CalendarView;
