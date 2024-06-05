import { useEffect, useMemo, useState } from "react";
import './styles.css'

const DAYS = [
    'SU',
    'MO',
    'TU',
    'WE',
    'TH',
    'FR',
    'SA',
];

const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];


// Gets all the days for 6 weeks to also show the following dates of
//  the week which is part of next or previous month.
const getCalendarDays = (selectionDate, currentDate, dayNameOfFirstDay, firstDayOfMonth, onSetCurrentDays) => {
    const _currentDays = [];
    for (let day = 0; day < 42; day++) {
        if (day === 0 && dayNameOfFirstDay === 0) {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
        } else if (day === 0) {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (day - dayNameOfFirstDay));
        } else {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
        }
        let calendarDay = {
            currentMonth: (firstDayOfMonth.getMonth() === selectionDate.getMonth()),
            date: new Date(firstDayOfMonth),
            month: firstDayOfMonth.getMonth(),
            number: firstDayOfMonth.getDate(),
            selected: firstDayOfMonth.toDateString() === currentDate.toDateString?.(),
            year: firstDayOfMonth.getFullYear()
        }
    
        _currentDays.push(calendarDay);
    }
    onSetCurrentDays([..._currentDays]);
};
                   
const CalendarDays = ({ selectionDate, currentDate, onChangeCurrentDate }) => {
    const firstDayOfMonth = new Date(selectionDate.getFullYear(), selectionDate.getMonth(), 1);
    const dayNameOfFirstDay = firstDayOfMonth.getDay();
    const [currentDays, setCurrentDays] = useState([]);

    useEffect(() => {
        getCalendarDays(selectionDate, currentDate, dayNameOfFirstDay, firstDayOfMonth, setCurrentDays);
    }, [selectionDate, currentDate])

    const renderDays = useMemo(() => (
        currentDays.map((selectionDate, index) => {
            return (
                <div
                    key={`${index}-${selectionDate.getDay?.()}`}
                    className={"calendar-day" + (selectionDate.currentMonth ? " current" : "") + (selectionDate.selected ? " selected" : "")}
                    onClick={() => onChangeCurrentDate(selectionDate)}
                >
                    {selectionDate.number}
                </div>
            )
        })
    ), [currentDate, currentDays, onChangeCurrentDate])

    return (
        <div className="table-content">
            {renderDays}
        </div>
    );   
}

const Calendar = ({ selectedDate = new Date(), onChangeSelectedDate }) => {

    const [selectionDate, setSelectionDate] = useState(selectedDate);
    const changeCurrentDate = (day) => {
        onChangeSelectedDate(new Date(day.year, day.month, day.number));
    };

    const handleRightArrowClick = () =>{
        const isLastMonth = selectionDate.getMonth() === 11;
        const _selectionDate = new Date(selectionDate.getFullYear(), selectionDate.getMonth(), selectionDate.getDay());
        if (isLastMonth) {
            _selectionDate.setFullYear(selectionDate.getFullYear() + 1);
            _selectionDate.setMonth(0);
        } else {
            _selectionDate.setMonth(selectionDate.getMonth() + 1);
        }

        setSelectionDate(new Date(_selectionDate.getFullYear(), _selectionDate.getMonth(), _selectionDate.getDay()));
    };

    const handleLeftArrowClick = () => {
        const isFirstMonth = selectionDate.getMonth() === 0;
        const _selectionDate = new Date(selectionDate.getFullYear(), selectionDate.getMonth(), selectionDate.getDay());
        if (isFirstMonth) {
            _selectionDate.setFullYear(selectionDate.getFullYear() - 1);
            _selectionDate.setMonth(11);
        } else {
            _selectionDate.setMonth(selectionDate.getMonth() - 1);
        }
        setSelectionDate(new Date(_selectionDate.getFullYear(), _selectionDate.getMonth(), _selectionDate.getDay()));
    };

    const handleCalendarHeaderClick = () => {};

    const renderCalendarHeader = useMemo(() => {
        return (
            <div className="calendar-header">
                <div onClick={handleLeftArrowClick} className="clickable">{'<'}</div>
                <div onClick={handleCalendarHeaderClick} className="clickable">{MONTHS[selectionDate.getMonth()]} {selectionDate.getFullYear()}</div>
                <div onClick={handleRightArrowClick} className="clickable">{'>'}</div>
            </div>
        );
    }, [selectionDate]);

    return (
        <div className="calendar">
            {renderCalendarHeader}
            <div className="calendar-body">
                <div className="table-header">
                    {DAYS.map((dayName) => {
                        return (
                            <div key={dayName} className="day-name">
                                <p>{dayName}</p>
                            </div>
                        )
                    })}
                </div>
                <CalendarDays
                    selectionDate={selectionDate}
                    currentDate={selectedDate}
                    onChangeSelectionDate={setSelectionDate}
                    onChangeCurrentDate={changeCurrentDate}
                />
            </div>
        </div>
    );
};

export default Calendar;