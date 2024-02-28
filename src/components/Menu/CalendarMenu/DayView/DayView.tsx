import './dayView.css';
import {JSX, useEffect, useState} from "react";
import {FormattedDate} from "../../../../type/type";
import useGetTimeInNumber from "../../../../hooks/useGetTimeInNumber";
import {areObjectValuesEqual, convertHoursMinutesToMinutes} from "../../../../utils/utils";
import {motion} from "framer-motion";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

type PropTimeSlot = {
    hours: number;
}

interface PropDayView {
    dayData: FormattedDate;
    handleSetDay: any;
    todayDate: FormattedDate;
}

const TimeSlot = (prop: PropTimeSlot): JSX.Element => {
    let period: string | null = prop.hours < 12 ? "am" : "pm"
    let hours: number | null = prop.hours < 13 ? prop.hours : prop.hours - 12;

    return <div className="calendarMenu__dayView__timeSlotWrapper">
        <section className="calendarMenu__dayView__timeSlotContainer">
            <div className="calendarMenu__dayView__timeSlot">
                {(prop.hours < 24) && <span>{`${hours} ${period}`}</span>}
            </div>
        </section>
        <section className="calendarMenu__dayView__timeSlotAreaContainer" style={{
            borderBottom: (prop.hours < 24) ? "1px solid var(--colorBlackTransparent50)" : "none",
        }}>
            <div className="calendarMenu__dayView__timeSlotArea"/>
        </section>
    </div>
};

const DayView = (prop: PropDayView): JSX.Element => {
    const todayDate: FormattedDate = prop.todayDate;
    const getTimeIn24HoursFormat: string = useGetTimeInNumber();
    const totalMinutes: number = convertHoursMinutesToMinutes(getTimeIn24HoursFormat);

    const [isDateEqual, setIsDateEqual] = useState<boolean>(areObjectValuesEqual(todayDate, prop.dayData));
    const [minuteToPixel, setMinuteToPixel] = useState<number>(0);

    const timeArray: number[] = Array.from({length: 24}, (_, index) => index + 1);
    const handleSelectDayName = (dayIndex: number): string => {
        switch (dayIndex) {
            case 0:
                return "Monday";
            case 1:
                return "Tuesday";
            case 2:
                return "Wednesday";
            case 3:
                return "Thursday";
            case 4:
                return "Friday";
            case 5:
                return "Saturday";
            case 6:
                return "Sunday";
            default:
                return "";
        }
    }

    useEffect(() => {
        const minTime: number = 1;
        const maxTime: number = 1440;
        const percentage: number = ((totalMinutes - minTime) / (maxTime - minTime)) * 100;
        setMinuteToPixel(((59 * 24) + 24) * (percentage / 100));

        setIsDateEqual(areObjectValuesEqual(todayDate, prop.dayData));

    }, [prop.dayData, totalMinutes]);

    return (
        <div className="calendarMenu__dayView">
            <section className="calendarMenu__dayView__titleContainer">
                <motion.div className="calendarMenu__dayView__dateContainer">
                    <button
                        type="button"
                        onClick={() => prop.handleSetDay("SET_PREV_DAY")}
                    >
                        <ArrowLeftIcon/>
                    </button>
                    {
                        prop.dayData &&
                        <p>{`${handleSelectDayName(prop.dayData.dayName)} ${prop.dayData.dayValue}, ${prop.dayData.monthName}`}</p>
                    }
                    <button
                        type="button"
                        onClick={() => prop.handleSetDay("SET_NEXT_DAY")}
                    >
                        <ArrowRightIcon/>
                    </button>
                </motion.div>
                <div className="calendarMenu__dayView__dayInfoContainer">
                    <p>Nothing planned. Click Add</p>
                </div>
            </section>
            <section className="calendarMenu__dayView__timeLineContainer noScroll">
                {timeArray.map((value, index) => {
                    return <TimeSlot key={index} hours={value}/>
                })}
                {
                    isDateEqual &&
                    <div className="calendarMenu__dayView__timeMinuteHand" style={{
                        top: `${minuteToPixel}px`,
                    }}/>
                }
            </section>
        </div>
    );
}

export default DayView;