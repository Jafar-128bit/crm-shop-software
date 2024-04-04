import './calendarWidget.css';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import {DayData, DayDataWithoutWeek, MonthData, WeekData} from "../../type/type";
import {Calendar} from "../../class/class";
import React, {JSX, useState, useContext, useEffect} from "react";
import {DayDataContext, MonthDataContext} from "../../page/Calendar/CalendarPage";

interface Month {
    id: number;
    monthName: string;
}

type HandleUpdateDayDataState = (dayData: DayData) => void;

type WeekProp = {
    weekData: WeekData;
    dayData: DayDataWithoutWeek;
    currentMonthId: number;
    onUpdateDayDataState: HandleUpdateDayDataState;
}

const btnStyle: { color: string, fontSize: string, fontWeight: number } = {
    color: "var(--colorBlackTransparent50)",
    fontSize: "28px",
    fontWeight: 700,
}

const Week = ({weekData, dayData, currentMonthId, onUpdateDayDataState}: WeekProp): JSX.Element => {
    return <section className="calendarWidget__monthContainer__weekContainer">
        {
            weekData.dayArray.map((value: DayData, index: number) => <button
                key={value.dayValue + index}
                type="button"
                className="calendarWidget__monthContainer__dayContainer"
                style={{
                    background: (dayData.dayValue === value.dayValue && dayData.monthId === value.monthId) ? "var(--backgroundGradient01)" : "",
                    color: (dayData.dayValue === value.dayValue && dayData.monthId === value.monthId) ? "var(--colorWhite)" : (value.monthId !== currentMonthId)
                        ? "var(--colorBlackTransparent50)"
                        : "var(--colorBlack)",
                }}
                onClick={() => onUpdateDayDataState(value)}
            >
                {value.dayValue >= 10 ? `${value.dayValue}` : `0${value.dayValue}`}
            </button>)
        }
    </section>
};

/* TODO: Make this change month only when the month is changed */
const CalendarWidget = (): JSX.Element => {
    const dayDataContextState = useContext(DayDataContext).setState;
    const montDataContextState = useContext(MonthDataContext);

    const calendarData = new Calendar();
    const currentDate: DayDataWithoutWeek = calendarData.getFormattedDate();

    const [yearValue, setYearValue] = useState<number>(currentDate.yearValue);
    const [month, setMonth] = useState<Month>({
        id: currentDate.monthId,
        monthName: currentDate.monthName
    });

    const getUpdatedMonth = (id: number) => {
        const monthData: MonthData = calendarData.getCalendarData(yearValue).monthArray[id];
        return {id, monthName: monthData.monthName};
    };
    const handleChangeMonth = (flag: "NEXT_MONTH" | "PREV_MONTH") => {
        const currentMonth: Month = month;
        const isValidMonthId = (id: number) => id >= 0 && id < 12;
        switch (flag) {
            case "NEXT_MONTH": {
                const nextMonthId = currentMonth.id + 1;
                if (isValidMonthId(nextMonthId)) {
                    setMonth(getUpdatedMonth(nextMonthId));
                }
                break;
            }
            case "PREV_MONTH": {
                const prevMonthId = currentMonth.id - 1;
                if (isValidMonthId(prevMonthId)) {
                    setMonth(getUpdatedMonth(prevMonthId));
                }
                break;
            }
            default:
                break;
        }
    };
    const handleUpdateDayDataState = (dayData: DayData) => {
        const selectedDate: DayDataWithoutWeek = {
            yearValue: dayData.yearValue,
            monthId: dayData.monthId,
            monthName: dayData.monthName,
            dayName: dayData.dayName,
            dayValue: dayData.dayValue
        };
        setMonth(getUpdatedMonth(dayData.monthId));
        dayDataContextState(selectedDate);
    };

    useEffect(() => {
        setMonth(getUpdatedMonth(montDataContextState.state));
    }, [montDataContextState.state]);

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
                                dayData={currentDate}
                                currentMonthId={month.id}
                                onUpdateDayDataState={handleUpdateDayDataState}
                            />)
                    }
                </ul>
            </section>
        </div>
    );
}

export default CalendarWidget;