import './calendarPage.css';
import './calendarControlles.css';

import DayView from "./DayView/DayView";
import {useEffect, JSX} from "react";
import {useDispatch, useSelector} from "react-redux";
import TimeDate from "../../components/TimeDate/TimeDate";
import CalendarWidget from "../../components/CalendarWidget/CalendarWidget";
import {toggleAction} from "../../store/slices/actionTabSlices";
import WeekView from "./WeekView/WeekView";
import MonthView from "./MonthView/MonthView";
import YearView from "./YearView/YearView";


const CalendarPage = (): JSX.Element => {
    const actionTabState = useSelector((state: any) => state.actionTabSlice);
    const viewState = useSelector((state: any) => state.actionTabFunctionSlices).calendarActions.viewAction;
    const dispatch = useDispatch();

    useEffect(() => {
        if (!actionTabState.calendarActions) dispatch(toggleAction("calendar"));
    }, []);

    return (
        <section className="calendar">
            <section className="calendar__sidePanel">
                <TimeDate/>
                <CalendarWidget/>
            </section>
            {viewState === "day" && <DayView />}
            {viewState === "week" && <WeekView/>}
            {viewState === "month" && <MonthView/>}
            {viewState === "year" && <YearView/>}
        </section>
    );
}

export default CalendarPage;