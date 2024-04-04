import './dayView.css';
import {JSX, useContext, useEffect, useLayoutEffect, useRef, useState} from "react";
import {motion} from "framer-motion";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import {DayData, DayDataWithoutWeek, MonthData, WeekData} from "../../../type/type";
import useGetTimeInNumber from "../../../hooks/useGetTimeInNumber";
import {areObjectValuesEqual, convertHoursMinutesToMinutes} from "../../../utils/utils";
import {Calendar} from "../../../class/class";
import {DayDataContext, MonthDataContext} from "../CalendarPage";

type PropTimeSlot = {
    hours: number;
}

type FlagType = "SET_THIS_DAY" | "SET_NEXT_DAY" | "SET_PREV_DAY";

const DayView = (): JSX.Element => {
    const calendarData: Calendar = new Calendar();
    const currentDate: DayDataWithoutWeek = calendarData.getFormattedDate();

    const dayDataContextState = useContext(DayDataContext);
    const montDataContextState = useContext(MonthDataContext);

    const getFlatMonthData = (yearValue: number, monthId: number): DayData[] => {
        const monthArrayData: MonthData[] = calendarData.getCalendarData(yearValue).monthArray;
        const monthIndex: number = monthArrayData.findIndex(month => month.monthId === monthId);
        const flatMonthData: DayData[] = monthArrayData[monthIndex].weekArray.flatMap((week: WeekData) => week.dayArray);
        return flatMonthData.filter((day: DayData) => day.monthId === monthId);
    };

    const currentDayIndex: number = getFlatMonthData(currentDate.yearValue, currentDate.monthId).findIndex(
        (day: DayData) => day.dayValue === currentDate.dayValue && day.monthId === currentDate.monthId
    );

    const [dateState, setDateState] = useState<{
        yearValue: number;
        monthId: number;
        dayIndex: number;
    }>({
        yearValue: currentDate.yearValue,
        monthId: currentDate.monthId,
        dayIndex: currentDayIndex,
    });
    const [selectDayData, setSelectDayData] = useState<DayDataWithoutWeek>(currentDate);

    const handleChangeDay = (flag: FlagType) => {
        setDateState((prevDateState) => {
            const currentMonthData = getFlatMonthData(prevDateState.yearValue, prevDateState.monthId);
            let newYearValue = prevDateState.yearValue;
            let newMonthId = prevDateState.monthId;
            let newDayIndex = prevDateState.dayIndex;

            switch (flag) {
                case "SET_NEXT_DAY":
                    newDayIndex += 1;
                    if (newDayIndex >= currentMonthData.length) {
                        newDayIndex = 0;
                        newMonthId += 1;
                        if (newMonthId > 11) {
                            newMonthId = 0;
                            newYearValue += 1;
                        }
                    }
                    break;
                case "SET_PREV_DAY":
                    newDayIndex -= 1;
                    if (newDayIndex < 0) {
                        newMonthId -= 1;
                        if (newMonthId < 0) {
                            newMonthId = 11;
                            newYearValue -= 1;
                        }
                        newDayIndex = getFlatMonthData(newYearValue, newMonthId).length - 1;
                    }
                    break;
                case "SET_THIS_DAY":
                    newYearValue = dayDataContextState.state.yearValue;
                    newMonthId = dayDataContextState.state.monthId;
                    newDayIndex = getFlatMonthData(newYearValue, newMonthId).findIndex(
                        (day: DayData) => day.dayValue === dayDataContextState.state.dayValue && day.monthId === dayDataContextState.state.monthId
                    );
                    break;
                default:
                    break;
            }

            return {
                ...prevDateState,
                yearValue: newYearValue,
                monthId: newMonthId,
                dayIndex: newDayIndex,
            };
        });
    };

    useEffect(() => {
        setSelectDayData(getFlatMonthData(dateState.yearValue, dateState.monthId)[dateState.dayIndex]);
        montDataContextState.setState(dateState.monthId);
    }, [dateState]);
    useEffect(() => {
        handleChangeDay("SET_THIS_DAY");
    }, [dayDataContextState.state]);

    const handleSetCurrentDay = () => {
        setSelectDayData(currentDate);
    };

    const targetRef = useRef<HTMLDivElement>(null);
    const getTimeIn24HoursFormat: string = useGetTimeInNumber();
    const totalMinutes: number = convertHoursMinutesToMinutes(getTimeIn24HoursFormat);

    const [isDateEqual, setIsDateEqual] = useState<boolean>(areObjectValuesEqual(currentDate, selectDayData));
    const [minuteToPixel, setMinuteToPixel] = useState<number>(0);

    const timeArray: number[] = Array.from({length: 24}, (_, index) => index + 1);

    useEffect(() => {
        const minTime: number = 1;
        const maxTime: number = 1440;
        const percentage: number = ((totalMinutes - minTime) / (maxTime - minTime)) * 100;
        setMinuteToPixel(((59 * 24) + 24) * (percentage / 100));

        setIsDateEqual(areObjectValuesEqual(currentDate, selectDayData));

    }, [selectDayData, totalMinutes]);
    useLayoutEffect(() => {
        setTimeout(() => {
            if (targetRef.current) targetRef.current.scrollIntoView({behavior: 'smooth'});
        }, 250);
    }, []);

    const TimeSlot = (prop: PropTimeSlot): JSX.Element => {
        let period: string | null = prop.hours < 12 ? "am" : "pm"
        let hours: number | null = prop.hours < 13 ? prop.hours : prop.hours - 12;

        return <div className="calendar__dayView__timeSlotWrapper">
            <section className="calendar__dayView__timeSlotContainer">
                <div className="calendar__dayView__timeSlot">
                    {(prop.hours < 24) && <span>{`${hours} ${period}`}</span>}
                </div>
            </section>
            <section className="calendar__dayView__timeSlotAreaContainer" style={{
                borderBottom: (prop.hours < 24) ? "1px solid var(--colorBlackTransparent50)" : "none",
            }}>
                <div className="calendar__dayView__timeSlotArea" ref={targetRef}/>
            </section>
        </div>
    };

    return (
        <section className="calendar__viewContainer">
            <div className="calendar__titleContainer">
                <div className="calendar__dateContainer">
                    <button
                        type="button"
                        onClick={() => handleChangeDay("SET_PREV_DAY")}
                    >
                        <ArrowLeftIcon/>
                    </button>
                    <p>{`${selectDayData?.dayValue} ${selectDayData?.monthName}, ${selectDayData?.yearValue}`}</p>
                    <button
                        type="button"
                        onClick={() => handleChangeDay("SET_NEXT_DAY")}
                    >
                        <ArrowRightIcon/>
                    </button>
                </div>
                <button
                    type="button"
                    className="calendar__thisWeekBtn"
                    onClick={handleSetCurrentDay}
                >
                    Today
                </button>
                <div className="calendar__dayInfoContainer">
                    <p>Nothing planned Today</p>
                </div>
            </div>
            <motion.div
                className="calendar__dayView__timeLineContainer noScroll"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.15}}
            >
                {timeArray.map((value, index) => {
                    return <TimeSlot key={index} hours={value}/>
                })}
                {isDateEqual &&
                    <div className="calendar__dayView__timeMinuteHand" style={{top: `${minuteToPixel}px`}}/>}
                {isDateEqual &&
                    <div className="calendar__dayView__timeMinuteDot leftDot" style={{top: `${minuteToPixel - 7}px`}}/>}
                {isDateEqual && <div className="calendar__dayView__timeMinuteDot rightDot"
                                     style={{top: `${minuteToPixel - 7}px`}}/>}
            </motion.div>
        </section>
    );
}

export default DayView;