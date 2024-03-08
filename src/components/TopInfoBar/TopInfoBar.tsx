import './topInfoBar.css';

import {JSX} from "react";
import useGetTime from "../../hooks/useGetTime";
import {DayDataWithoutWeek} from "../../type/type";
import ActionTab from "../ActionTab/ActionTab";
import {Calendar} from "../../class/class";

const DateAndTime = (): JSX.Element => {
    const calendarData = new Calendar();

    const todayDate: DayDataWithoutWeek = calendarData.getFormattedDate();
    const getTime: string = useGetTime();
    
    return <section className="topInfoBar__sectionContainer section02">
        <p className="topInfoBar__time">
            {getTime}
        </p>
        <p className="topInfoBar__date">
            {`${todayDate.dayValue} ${todayDate.monthName?.split('').slice(0, 3).join('')}, ${todayDate.yearValue}`}
        </p>
    </section>
};

const TopInfoBar = (): JSX.Element => {

    return (
        <div className="topInfoBar">
            <section className="topInfoBar__sectionContainer section01">
                <ActionTab/>
            </section>
            <DateAndTime/>
        </div>
    );
}

export default TopInfoBar;