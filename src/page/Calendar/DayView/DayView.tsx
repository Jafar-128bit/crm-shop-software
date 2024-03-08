import './dayView.css';
import {JSX, useEffect, useLayoutEffect, useRef, useState} from "react";
import {motion} from "framer-motion";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import {useSelector} from "react-redux";
import {DayData, DayDataWithoutWeek} from "../../../type/type";
import useGetTimeInNumber from "../../../hooks/useGetTimeInNumber";
import {
    areObjectValuesEqual,
    convertHoursMinutesToMinutes,
    generateCalendarDataLinear
} from "../../../utils/utils";
import {Calendar} from "../../../class/class";

type PropTimeSlot = {
    hours: number;
}

type FlagType = "SET_THIS_DAY" | "SET_NEXT_DAY" | "SET_PREV_DAY";

const DayView = (): JSX.Element => {
    const calendarData: Calendar = new Calendar();
    const todayDate: DayDataWithoutWeek = calendarData.getFormattedDate();

    const day = generateCalendarDataLinear(todayDate.yearValue, todayDate.monthId);
    const defaultIndex: number = day.findIndex((element) => element.dayValue === todayDate.dayValue && element.dayName === todayDate.dayName);
    const [calendarDayDataIndex, setCalendarDayDataIndex] = useState<number>(defaultIndex);

    const targetRef = useRef<HTMLDivElement>(null);
    const getTimeIn24HoursFormat: string = useGetTimeInNumber();
    const totalMinutes: number = convertHoursMinutesToMinutes(getTimeIn24HoursFormat);

    const dayData = {
        yearValue: todayDate.yearValue,
        monthId: todayDate.monthId,
        monthName: todayDate.monthName,
        dayName: day[calendarDayDataIndex].dayName,
        dayValue: day[calendarDayDataIndex].dayValue,
    }

    const [isDateEqual, setIsDateEqual] = useState<boolean>(areObjectValuesEqual(todayDate, dayData));
    const [minuteToPixel, setMinuteToPixel] = useState<number>(0);

    const timeArray: number[] = Array.from({length: 24}, (_, index) => index + 1);

    useEffect(() => {
        const minTime: number = 1;
        const maxTime: number = 1440;
        const percentage: number = ((totalMinutes - minTime) / (maxTime - minTime)) * 100;
        setMinuteToPixel(((59 * 24) + 24) * (percentage / 100));

        setIsDateEqual(areObjectValuesEqual(todayDate, dayData));

    }, [dayData, totalMinutes]);

    useLayoutEffect(() => {
        setTimeout(() => {
            if (targetRef.current) targetRef.current.scrollIntoView({behavior: 'smooth'});
        }, 250);
    }, []);

    const handleSetDay = (flag: FlagType, dayIndex?: number): void => {
        const setIndex = (direction: "next" | "prev"): void => {
            const newIndex = direction === "next"
                ? (calendarDayDataIndex + 1) % day.length
                : (calendarDayDataIndex - 1 + day.length) % day.length;
            setCalendarDayDataIndex(newIndex);
        };
        const getData = (index: number = defaultIndex) => day[index];
        switch (flag) {
            case "SET_THIS_DAY":

                break;
            case "SET_PREV_DAY":
                setIndex("prev");
                break;
            case "SET_NEXT_DAY":
                setIndex("next");
                break;
            default:
                break;
        }
    };

    const handleSetCurrentDay = () => {
        setCalendarDayDataIndex(defaultIndex);
    }

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
                        onClick={() => handleSetDay("SET_PREV_DAY")}
                    >
                        <ArrowLeftIcon/>
                    </button>
                    <p>{`${day[calendarDayDataIndex].dayValue} ${todayDate.monthName}, ${todayDate.yearValue}`}</p>
                    <button
                        type="button"
                        onClick={() => handleSetDay("SET_NEXT_DAY")}
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
                {isDateEqual && <div className="calendar__dayView__timeMinuteHand" style={{top: `${minuteToPixel}px`}}/>}
                {isDateEqual && <div className="calendar__dayView__timeMinuteDot leftDot" style={{top: `${minuteToPixel - 7}px`}}/>}
                {isDateEqual && <div className="calendar__dayView__timeMinuteDot rightDot" style={{top: `${minuteToPixel - 7}px`}}/>}
            </motion.div>
        </section>
    );
}

export default DayView;