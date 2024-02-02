import './calendarMenu.css';

import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import ViewDayIcon from '@mui/icons-material/ViewDay';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import TaskAltIcon from '@mui/icons-material/TaskAlt';
import EventRoundedIcon from '@mui/icons-material/EventRounded';
import AddAlertRoundedIcon from '@mui/icons-material/AddAlertRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

import {motion} from 'framer-motion';
import {JSX, useState} from "react";
import {DayData, generateCalendarDataLinear} from "../../../utils/utils";
import {FormattedDate} from "../../../type/type";

type Prop = {
    calendarData: any;
}

interface PropDayView {
    dayData: FormattedDate | null;
    handleSetDay: any;
}

type CalendarViewType = "month" | "day" | "week" | null;
type FlagType = "SET_THIS_DAY" | "SET_NEXT_DAY" | "SET_PREV_DAY";

const DayView = (prop: PropDayView): JSX.Element => {
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
                <section className="calendarMenu__dayView__timeSlotContainer">
                    <div className="calendarMenu__dayView__timeSlot">
                        <span>1 am</span>
                    </div>
                </section>
                <section className="calendarMenu__dayView__timeSlotAreaContainer">
                    <div className="calendarMenu__dayView__timeSlotArea">

                    </div>
                </section>
            </section>
        </div>
    );
}

const CalendarMenu = (prop: Prop): JSX.Element => {
    const todayDate: FormattedDate = prop.calendarData.getFormattedDate();

    const day: DayData[] = generateCalendarDataLinear(todayDate.yearValue, todayDate.monthId);
    const defaultIndex: number = day.findIndex((element: DayData) => element.dayValue === todayDate.dayValue && element.dayName === todayDate.dayName);

    const [calendarDayDataIndex, setCalendarDayDataIndex] = useState<number>(defaultIndex);
    const [calendarInfoView, setCalendarInfoView] = useState<CalendarViewType>(null);
    const [isAddBtn, setIsAddBtn] = useState<boolean>(false);

    const handleAddBtn = (): void => setIsAddBtn(!isAddBtn);
    const handleSetDay = (flag: FlagType, dayIndex: number): void => {
        const setIndex = (direction: "next" | "prev"): void => {
            const newIndex = direction === "next"
                ? (calendarDayDataIndex + 1) % day.length
                : (calendarDayDataIndex - 1 + day.length) % day.length;
            setCalendarDayDataIndex(newIndex);
        };
        const getData = (index: number = defaultIndex): DayData => day[index];
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


    return (
        <div className="calendarMenu">
            <motion.section
                className="calendarMenu__addPropertyBtnList"
                initial={{x: 65, opacity: 0}}
                animate={isAddBtn ? {x: 0, opacity: 1} : {x: 65, opacity: 0}}
            >
                <button type="button" className="calendarMenu__addPropertyBtn">
                    <TaskAltIcon style={{color: "var(--color03)", fontSize: "24px"}}/>
                </button>
                <button type="button" className="calendarMenu__addPropertyBtn">
                    <EventRoundedIcon style={{color: "var(--color03)", fontSize: "24px"}}/>
                </button>
                <button type="button" className="calendarMenu__addPropertyBtn">
                    <AddAlertRoundedIcon style={{color: "var(--color03)", fontSize: "24px"}}/>
                </button>
            </motion.section>
            <motion.button
                type="button"
                className="calendarMenu__addBtn"
                onClick={handleAddBtn}
                initial={{rotate: 0}}
                animate={isAddBtn ? {rotate: 180} : {rotate: 0}}
            >
                {isAddBtn
                    ? <ClearRoundedIcon style={{color: "var(--colorWhite)", fontSize: "32px"}}/>
                    : <AddRoundedIcon style={{color: "var(--colorWhite)", fontSize: "36px"}}/>
                }
            </motion.button>
            <section className="calendarMenu__titleContainer">
                <h2 className="calendarMenu__title">Calendar</h2>
                {calendarInfoView &&
                    <motion.p
                        className="calendarMenu__calendarViewInfo"
                        initial={{display: "none", opacity: 0}}
                        animate={calendarInfoView ? {display: "inline-block", opacity: 1} : {
                            display: "none",
                            opacity: 0
                        }}
                        transition={{duration: 0.15}}
                    >
                        {calendarInfoView} View
                    </motion.p>}
                <div className="calendarMenu__calendarViewBtnContainer">
                    <motion.button
                        type="button"
                        className="calendarMenu__calendarViewBtn"
                        onMouseOver={() => setCalendarInfoView("day")}
                        onMouseLeave={() => setCalendarInfoView(null)}
                        whileHover={{background: "var(--backgroundGradient02)", color: "var(--colorWhite)"}}
                        transition={{duration: 0.15}}
                    >
                        <ViewDayIcon style={{fontSize: "22px",}}/>
                    </motion.button>
                    <motion.button
                        type="button"
                        className="calendarMenu__calendarViewBtn"
                        onMouseOver={() => setCalendarInfoView("week")}
                        onMouseLeave={() => setCalendarInfoView(null)}
                        whileHover={{background: "var(--backgroundGradient02)", color: "var(--colorWhite)"}}
                        transition={{duration: 0.15}}
                    >
                        <CalendarViewWeekIcon style={{fontSize: "22px",}}/>
                    </motion.button>
                    <motion.button
                        type="button"
                        className="calendarMenu__calendarViewBtn"
                        onMouseOver={() => setCalendarInfoView("month")}
                        onMouseLeave={() => setCalendarInfoView(null)}
                        whileHover={{background: "var(--backgroundGradient02)", color: "var(--colorWhite)"}}
                        transition={{duration: 0.15}}
                    >
                        <CalendarViewMonthIcon style={{fontSize: "22px",}}/>
                    </motion.button>
                </div>
            </section>
            <section className="calendarMenu__viewContainer">
                <DayView dayData={{
                    yearValue: todayDate.yearValue,
                    monthId: todayDate.monthId,
                    monthName: todayDate.monthName,
                    dayName: day[calendarDayDataIndex].dayName,
                    dayValue: day[calendarDayDataIndex].dayValue,
                }} handleSetDay={handleSetDay}/>
            </section>
        </div>
    );
}

export default CalendarMenu;