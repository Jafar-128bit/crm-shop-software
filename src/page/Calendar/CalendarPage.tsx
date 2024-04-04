import './calendarPage.css';
import './calendarControlles.css';

import React, {JSX, useState} from "react";
import TimeDate from "../../components/TimeDate/TimeDate";
import CalendarWidget from "../../components/CalendarWidget/CalendarWidget";
import {createCalendarContext} from "../../Context/CalendarContext";
import {CalendarContextProviderProps, DayDataWithoutWeek} from "../../type/type";
import {Calendar} from "../../class/class";
import {Outlet} from "react-router-dom";

const calendar = new Calendar();
const initialDate: DayDataWithoutWeek = calendar.getFormattedDate();
export const DayDataContext = createCalendarContext<DayDataWithoutWeek>(initialDate);
export const MonthDataContext = createCalendarContext<number>(initialDate.monthId);

const CalendarDayDataContext: React.FC<CalendarContextProviderProps<DayDataWithoutWeek>> = ({children, initialState}) => {
    const [dayDataState, setDayDataState] = useState<DayDataWithoutWeek>(initialState);
    return <DayDataContext.Provider value={{state: dayDataState, setState: setDayDataState}}>
        {children}
    </DayDataContext.Provider>
};
const CalendarMonthDataContext: React.FC<CalendarContextProviderProps<number>> = ({children, initialState}) => {
    const [monthDataState, setMonthDataState] = useState<number>(initialState);
    return <MonthDataContext.Provider value={{state: monthDataState, setState: setMonthDataState}}>
        {children}
    </MonthDataContext.Provider>
}

const CalendarPage = (): JSX.Element => {
    return <CalendarDayDataContext initialState={calendar.getFormattedDate()}>
        <CalendarMonthDataContext initialState={calendar.getFormattedDate().monthId}>
            <section className="calendar">
                <section className="calendar__sidePanel">
                    <TimeDate/>
                    <CalendarWidget/>
                </section>
                <Outlet/>
            </section>
        </CalendarMonthDataContext>
    </CalendarDayDataContext>
}

export default CalendarPage;