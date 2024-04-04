import './yearView.css';
import {Calendar} from "../../../class/class";
import {CalendarData, DayData, DayDataWithoutWeek, MonthData, WeekData} from "../../../type/type";
import CloseIcon from '@mui/icons-material/Close';
import {JSX, useContext, useState} from "react";
import {motion} from 'framer-motion';
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import {areObjectValuesEqual} from "../../../utils/utils";
import {executeCalendarAction} from "../../../store/slices/actionTabFunctionSlices";
import {DayDataContext} from "../CalendarPage";
import {useDispatch} from "react-redux";

interface PropMonthType {
    monthData: MonthData;
}

const YearView = (): JSX.Element => {
    const calendar: Calendar = new Calendar();
    const currentDate: DayDataWithoutWeek = calendar.getFormattedDate();
    const dispatch = useDispatch();
    const dayDataContextState = useContext(DayDataContext);

    const [yearValue, setYearValue] = useState<number>(currentDate.yearValue);
    const currentCalendarData: CalendarData = calendar.getCalendarData(yearValue);
    const [dayClickCounter, setDayClickCounter] = useState<"open_menu" | "open_dayView">("open_menu");

    const handleChangeYear = (flag: "PREV_YEAR" | "NEXT_YEAR") => {
        switch (flag) {
            case "NEXT_YEAR":
                setYearValue(yearValue + 1);
                break;
            case "PREV_YEAR":
                setYearValue(yearValue - 1);
                break;
            default:
                break;
        }
    };

    const handleSetCurrentYear = () => {
        setYearValue(currentDate.yearValue);
    };

    const handleDayAction = (flag: "OPEN__MENU" | "CLOSE__MENU") => {
        switch (flag) {
            case "OPEN__MENU":
                if (dayClickCounter === "open_menu") {
                    setDayClickCounter("open_dayView");
                    // menu action
                } else if (dayClickCounter === "open_dayView") {
                    //close menu
                    setDayClickCounter("open_menu");
                    dispatch(executeCalendarAction({actionName: "viewAction", actionOption: "day"}));
                }
                break;
            case "CLOSE__MENU":
                setDayClickCounter("open_menu");
                // menu function
                break;
            default:
                break;
        }
    };

    const MonthViewCalendar = ({monthData}: PropMonthType) => {
        return <div className="yearView__monthViewCalendar">
            <p className="yearView__monthViewCalendar__monthName">{monthData.monthName}</p>
            <section className="yearView__monthViewCalendar__dayNameContainer">
                {["M", "T", "W", "T", "F", "S", "S"].map((dayName: string, index: number) => <p
                        key={index}
                        className="yearView__monthViewCalendar__dayName"
                    >
                        {dayName}
                    </p>
                )}
            </section>
            <section className="yearView__monthViewCalendar__weekContainer">
                {monthData.weekArray.map((week: WeekData, index: number) => <section
                        key={index}
                        className="yearView__monthViewCalendar__week"
                    >
                        {week.dayArray.map((day: DayData, index: number) => <button
                                key={index}
                                type="button"
                                className="yearView__monthViewCalendar__dayContainer"
                                style={{
                                    background: (
                                        currentDate.dayValue === day.dayValue &&
                                        currentDate.monthId === day.monthId &&
                                        monthData.monthId === day.monthId &&
                                        currentDate.yearValue === yearValue
                                    ) ? "var(--backgroundGradient01)"
                                        : "",
                                    color: (
                                        currentDate.dayValue === day.dayValue &&
                                        currentDate.monthId === day.monthId &&
                                        monthData.monthId === day.monthId &&
                                        currentDate.yearValue === yearValue
                                    ) ? "var(--colorWhite)"
                                        : day.monthId !== monthData.monthId
                                            ? "var(--colorBlackTransparent50)"
                                            : "var(--colorBlack)",
                                }}
                                onClick={() => {
                                    dayDataContextState.setState({
                                        yearValue: day.yearValue,
                                        monthId: day.monthId,
                                        monthName: day.monthName,
                                        dayName: day.dayName,
                                        dayValue: day.dayValue
                                    });
                                    handleDayAction("OPEN__MENU");
                                }}
                            >
                                {/*{day.dayValue >= 10 ? `${day.dayValue}` : `0${day.dayValue}`}*/}
                                {day.dayValue}
                            </button>
                        )}

                    </section>
                )}
            </section>
        </div>
    };

    return (
        <section className="calendar__viewContainer">
            <div className="calendar__titleContainer">
                <div className="calendar__dateContainer">
                    <button type="button" onClick={() => handleChangeYear("PREV_YEAR")}>
                        <ArrowLeftIcon/>
                    </button>
                    <p>
                        {`${yearValue}`}
                    </p>

                    <button type="button" onClick={() => handleChangeYear("NEXT_YEAR")}>
                        <ArrowRightIcon/>
                    </button>
                </div>
                <button
                    type="button"
                    className="calendar__thisWeekBtn"
                    onClick={handleSetCurrentYear}
                >
                    This Year
                </button>
            </div>
            <motion.section
                className="yearView"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.15}}
            >
                <section className="yearView__monthContainer noScroll">
                    {currentCalendarData.monthArray.map((month: MonthData, index: number) => <MonthViewCalendar
                        key={index}
                        monthData={month}
                    />)}
                </section>
            </motion.section>
        </section>
    );
}

export default YearView;