import './weekView.css';
import {JSX, useEffect, useRef, useState} from "react";
import {Calendar} from "../../../class/class";
import {DayData, DayDataWithoutWeek, Month, MonthData, WeekData} from "../../../type/type";
import {areObjectValuesEqual, convertHoursMinutesToMinutes, handleSelectDayName} from "../../../utils/utils";
import useGetTimeInNumber from "../../../hooks/useGetTimeInNumber";
import {motion} from 'framer-motion';
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

type PropDayData = {
    dayData: DayData;
    currentDate: DayDataWithoutWeek;
}

type PropTimeSlot = {
    hours: number;
}

type FlagType = "SET_NEXT_WEEK" | "SET_PREV_WEEK";

const calculateLeftPosition = (index: number) => `calc(((100% - 50px) / 7) * ${index} + 50px)`;

const DayList = ({dayData, currentDate}: PropDayData): JSX.Element => {
    return <div className="dayList">
        <p className="dayList__dayName">{handleSelectDayName(dayData.dayName).split('').slice(0, 3).join('')}</p>
        <button
            type="button"
            className="dayList__dayValueBtn"
            style={{
                background: (dayData.dayValue === currentDate.dayValue && dayData.monthId === currentDate.monthId)
                    ? "var(--backgroundGradient01)"
                    : "",
                color: (dayData.dayValue < currentDate.dayValue && dayData.monthId === currentDate.monthId)
                    ? "var(--colorBlackTransparent50)"
                    : (dayData.dayValue === currentDate.dayValue && dayData.monthId === currentDate.monthId)
                        ? "var(--colorWhite)"
                        : "var(--colorBlack)",
            }}
        >
            {dayData.dayValue}
        </button>
    </div>
}

const WeekView = (): JSX.Element => {
    const calendarData: Calendar = new Calendar();
    const currentDate: DayDataWithoutWeek = calendarData.getFormattedDate();

    const currentWeekIndex: number = calendarData
        .getCalendarData()
        .monthArray[currentDate.monthId].weekArray
        .findIndex((week: WeekData) => week.dayArray
            .some((day: DayData) => currentDate.dayValue === day.dayValue && currentDate.monthId === day.monthId));

    const [yearValue, setYearValue] = useState<number>(currentDate.yearValue);
    const [monthId, setMonthId] = useState<number>(currentDate.monthId);
    const [weekIndex, setWeekIndex] = useState<number>(currentWeekIndex);

    const generateWeekData = (): DayData[] => calendarData.getCalendarData(yearValue).monthArray[monthId].weekArray[weekIndex].dayArray;
    const [currentWeekData, setCurrentWeekData] = useState<DayData[]>(() => generateWeekData());

    const timeArray: number[] = Array.from({length: 24}, (_, index) => index + 1);
    const targetRef = useRef<HTMLDivElement>(null);

    const getTimeIn24HoursFormat: string = useGetTimeInNumber();
    const totalMinutes: number = convertHoursMinutesToMinutes(getTimeIn24HoursFormat);

    const [minuteToPixel, setMinuteToPixel] = useState<number>(0);

    const handleSetCurrentWeek = () => {
        setCurrentWeekData(calendarData.getCalendarData(yearValue).monthArray[currentDate.monthId].weekArray[currentWeekIndex].dayArray);
    }
    const calculateMinuteToPixel = (): number => {
        const minTime = 1;
        const maxTime = 1440;
        const percentageOfDayPassed = ((totalMinutes - minTime) / (maxTime - minTime)) * 100;
        return ((59 * 24) + 24) * (percentageOfDayPassed / 100);
    };

    useEffect(() => {
        setMinuteToPixel(calculateMinuteToPixel());
        setTimeout(() => {
            if (targetRef.current) targetRef.current.scrollIntoView({behavior: 'smooth', block: "center"});
        }, 250);
    }, []);

    const handleChangeWeek = (flagWeek: FlagType) => {
        switch (flagWeek) {
            case "SET_NEXT_WEEK":
                setWeekIndex(weekIndex >= 5 ? 0 : weekIndex + 1);
                setMonthId(weekIndex >= 5 ? (monthId >= 11 ? 0 : monthId + 1) : monthId);
                setYearValue(monthId >= 11 ? yearValue + 1 : yearValue);
                break;
            case "SET_PREV_WEEK":
                setWeekIndex(weekIndex <= 0 ? 5 : weekIndex - 1);
                setMonthId(weekIndex <= 0 ? (monthId <= 0 ? 11 : monthId - 1) : monthId);
                setYearValue(monthId <= 0 ? yearValue - 1 : yearValue);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        setCurrentWeekData(generateWeekData());
    }, [monthId, weekIndex]);

    const TimeSlot = ({hours}: PropTimeSlot): JSX.Element => {
        let period: string | null = hours < 12 ? "am" : "pm"
        let hour: number | null = hours < 13 ? hours : hours - 12;

        return <div className="weekView__timeSlotWrapper">
            <section className="weekView__timeSlotContainer">
                <div className="weekView__timeSlot">
                    {(hours < 24) && <span>{`${hour} ${period}`}</span>}
                </div>
            </section>
            {
                currentWeekData.map((dayData: DayData, index: number, array) => <section
                        key={dayData.dayValue + index}
                        className="weekView__timeSlotAreaContainer"
                        style={{
                            borderBottom: (hours < 24) ? "1px solid var(--colorBlackTransparent35)" : "none",
                            borderRight: array.length - 1 > index ? "1px solid var(--colorBlackTransparent35)" : "none",
                        }}
                    >
                        <div className="weekView__timeSlotArea" ref={targetRef}/>
                    </section>
                )}
        </div>
    };

    return <section className="calendar__viewContainer">
        <div className="calendar__titleContainer">
            <div className="calendar__dateContainer">
                <button type="button" onClick={() => handleChangeWeek("SET_PREV_WEEK")}>
                    <ArrowLeftIcon/>
                </button>
                <p>
                    {`${Month[monthId]}, ${yearValue}`}
                </p>

                <button type="button" onClick={() => handleChangeWeek("SET_NEXT_WEEK")}>
                    <ArrowRightIcon/>
                </button>
            </div>
            <button
                type="button"
                className="calendar__thisWeekBtn"
                onClick={handleSetCurrentWeek}
            >
                This Week
            </button>
            <div className="calendar__dayInfoContainer">
                <p>Nothing planned this Week</p>
            </div>
        </div>
        <motion.div
            className="weekView"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.15}}
        >
            <section className="weekView__dayListContainer">
                {currentWeekData.map((dayData: DayData, index: number) => <DayList
                    key={dayData.dayValue + index}
                    dayData={dayData}
                    currentDate={currentDate}
                />)}
            </section>
            <section className="weekView__dayTimeLineContainer noScroll">
                {timeArray.map((value, index) => <TimeSlot key={index} hours={value}/>)}
                {currentWeekData.map((dayData: DayData, index: number) => {
                    const isDateEqual: boolean = areObjectValuesEqual(
                        {dayValue: currentDate.dayValue, dayName: currentDate.dayName, monthId: currentDate.monthId},
                        {dayValue: dayData.dayValue, dayName: dayData.dayName, monthId: dayData.monthId}
                    );
                    return isDateEqual && (
                        <div
                            key={dayData.dayValue + index}
                            className="weekView__dayTimeLineContainer__timeMinuteHand"
                            style={{
                                display: "",
                                top: `${minuteToPixel}px`,
                                left: calculateLeftPosition(index),
                            }}
                        />
                    );
                })}
            </section>
        </motion.div>
    </section>
};

export default WeekView;