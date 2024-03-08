import './timeDate.css';
import {Calendar} from "../../class/class";
import {DayDataWithoutWeek} from "../../type/type";
import useGetTime from "../../hooks/useGetTime";
import {JSX} from "react";

const TimeDate = (): JSX.Element => {
    const calendarData = new Calendar();

    const todayDate: DayDataWithoutWeek = calendarData.getFormattedDate();
    const getTime: string = useGetTime();

    return <div className="timeDate">
        <p className="timeDate__time">
            {getTime}
        </p>
        <p className="timeDate__date">
            {`${todayDate.dayValue} ${todayDate.monthName?.split('').slice(0, 3).join('')}, ${todayDate.yearValue}`}
        </p>
    </div>
}

export default TimeDate;