import './calendarWidget.css';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import {DayDataWithoutWeek, WeekData} from "../../type/type";
import {Calendar} from "../../class/class";
import {JSX, useState} from "react";

interface Month {
    id: number;
    monthName: string;
}

type WeekProp = {
    weekData: WeekData;
    dayData: DayDataWithoutWeek;
    currentMonthId: number;
}

const btnStyle = {
    color: "var(--colorBlackTransparent50)",
    fontSize: "28px",
    fontWeight: 700,
}

const Week = ({weekData, dayData, currentMonthId}: WeekProp): JSX.Element => {
    return <section className="calendarWidget__monthContainer__weekContainer">
        {
            weekData.dayArray.map((value, index) => <button
                key={value.dayValue + index}
                type="button"
                className="calendarWidget__monthContainer__dayContainer"
                style={{
                    background: (dayData.dayValue === value.dayValue && dayData.monthId === value.monthId) ? "var(--backgroundGradient01)" : "",
                    color: (dayData.dayValue === value.dayValue && dayData.monthId === value.monthId) ? "var(--colorWhite)" : (value.monthId !== currentMonthId) ? "var(--colorBlackTransparent50)" : "var(--colorBlack)",
                }}
            >
                {value.dayValue >= 10 ? `${value.dayValue}` : `0${value.dayValue}`}
            </button>)
        }
    </section>
}

/* TODO: Make this change month only when the month is changed */
const CalendarWidget = (): JSX.Element => {
    const calendarData = new Calendar();
    const currentDate: DayDataWithoutWeek = calendarData.getFormattedDate();

    const [yearValue, setYearValue] = useState<number>(currentDate.yearValue);
    const [month, setMonth] = useState<Month>({
        id: currentDate.monthId,
        monthName: currentDate.monthName
    });
    const [dayData, setDayData] = useState<DayDataWithoutWeek>({
        yearValue: currentDate.yearValue,
        monthId: month.id,
        monthName: month.monthName,
        dayName: currentDate.dayName,
        dayValue: currentDate.dayValue
    });

    const handleChangeMonth = (flag: "NEXT_MONTH" | "PREV_MONTH") => {
        const currentMonth: Month = month;

        const getUpdatedMonth = (id: number) => {
            const monthData = calendarData.getCalendarData().monthArray[id];
            return {id, monthName: monthData.monthName};
        };

        switch (flag) {
            case "NEXT_MONTH":
                setMonth(getUpdatedMonth(currentMonth.id + 1));
                break;
            case "PREV_MONTH":
                setMonth(getUpdatedMonth(currentMonth.id - 1));
                break;
            default:
                break;
        }
    };


    return (
        <div className="calendarWidget">

            <section className="calendarWidget__InfoContainer">
                <p className="calendarWidget__monthName">{month.monthName}, {yearValue}</p>
                <div className="calendarWidget__BtnContainer">
                    <button
                        type="button"
                        className="calendarWidget__btn"
                        onClick={() => handleChangeMonth("PREV_MONTH")}
                    >
                        <NavigateBeforeIcon style={btnStyle}/>
                    </button>
                    <button
                        type="button"
                        className="calendarWidget__btn"
                        onClick={() => handleChangeMonth("NEXT_MONTH")}
                    >
                        <NavigateNextIcon style={btnStyle}/>
                    </button>
                </div>
            </section>

            <section className="calendarWidget__monthContainer">
                <ul className="calendarWidget__monthContainer__dayNameList">
                    {
                        ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]
                            .map((dayName: string, index: number) => <li
                                    key={index}
                                    className="calendarWidget__monthContainer__dayName"
                                >
                                    {dayName}
                                </li>
                            )
                    }
                </ul>
                <ul className="calendarWidget__monthContainer__dayList">
                    {
                        calendarData.getCalendarData().monthArray[month.id].weekArray
                            .map((value: WeekData, index: number) => <Week
                                key={value.weekId + index}
                                weekData={value}
                                dayData={dayData}
                                currentMonthId={month.id}
                            />)
                    }
                </ul>
            </section>
        </div>
    );
}

export default CalendarWidget;