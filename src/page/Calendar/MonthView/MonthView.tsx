import './monthView.css';
import {Calendar} from "../../../class/class";
import {DayData, DayDataWithoutWeek, Month, WeekData} from "../../../type/type";
import {JSX, MutableRefObject, useContext, useEffect, useRef, useState} from "react";
import {motion} from 'framer-motion';
import {areObjectValuesEqual, handleSelectDayName} from "../../../utils/utils";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import {DayDataContext, MonthDataContext} from "../CalendarPage";
import {useDispatch} from "react-redux";
import {executeCalendarAction} from "../../../store/slices/actionTabFunctionSlices";

type FlagType = "SET_NEXT_MONTH" | "SET_PREV_MONTH";

const MonthView = (): JSX.Element => {
    const calendar: Calendar = new Calendar();
    const currentDate: DayDataWithoutWeek = calendar.getFormattedDate();
    const dispatch = useDispatch();

    const dayDataContextState = useContext(DayDataContext).setState;
    const montDataContextState = useContext(MonthDataContext);

    const [yearValue, setYearValue] = useState<number>(currentDate.yearValue);
    const [monthId, setMonthId] = useState<number>(currentDate.monthId);

    const weekData: WeekData[] = calendar.getCalendarData(yearValue).monthArray[monthId].weekArray;

    const handleSetCurrentMonth = () => {
        setMonthId(currentDate.monthId);
    };
    const handleChangeMonth = (flag: FlagType) => {
        switch (flag) {
            case "SET_NEXT_MONTH":
                setMonthId(monthId >= 11 ? 0 : monthId + 1);
                setYearValue(monthId >= 11 ? yearValue + 1 : yearValue);
                break;
            case "SET_PREV_MONTH":
                setMonthId(monthId <= 0 ? 11 : monthId - 1);
                setYearValue(monthId <= 0 ? yearValue - 1 : yearValue);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        montDataContextState.setState(monthId);
    }, [monthId]);

    const handleDayAction = () => {
        dispatch(executeCalendarAction({actionName: "viewAction", actionOption: "day"}));
    };

    return (
        <section className="calendar__viewContainer">
            <div className="calendar__titleContainer">
                <div className="calendar__dateContainer">
                    <button type="button" onClick={() => handleChangeMonth("SET_PREV_MONTH")}>
                        <ArrowLeftIcon/>
                    </button>
                    <p>
                        {`${Month[monthId]}, ${yearValue}`}
                    </p>

                    <button type="button" onClick={() => handleChangeMonth("SET_NEXT_MONTH")}>
                        <ArrowRightIcon/>
                    </button>
                </div>
                <button
                    type="button"
                    className="calendar__thisWeekBtn"
                    onClick={handleSetCurrentMonth}
                >
                    This Month
                </button>
                <div className="calendar__dayInfoContainer">
                    <p>Nothing planned this Month</p>
                </div>
            </div>
            <motion.section
                className="monthView"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.15}}
            >
                {weekData.map((week: WeekData, index: number) => <section
                    key={index}
                    className="monthView__weekContainer"
                >
                    {week.dayArray.map((day: DayData, index: number) => <div
                        key={index}
                        className="monthView__dayContainer"
                        style={{
                            background: (day.monthId < monthId)
                                ? "var(--colorDim01)"
                                : (day.monthId > monthId)
                                    ? "var(--colorDim02)"
                                    : "",
                        }}
                    >
                        {
                            week.weekId === 1 &&
                            <p className="monthView__dayName">
                                {handleSelectDayName(day.dayName).split('').slice(0, 3).join('')}
                            </p>
                        }
                        <button
                            type="button"
                            className="monthView__dayValue"
                            style={{
                                background: (currentDate.dayValue === day.dayValue && currentDate.monthId === day.monthId)
                                    ? "var(--backgroundGradient01)"
                                    : "",
                                color: (currentDate.dayValue === day.dayValue && currentDate.monthId === day.monthId)
                                    ? "var(--colorWhite)"
                                    : (day.monthId !== monthId)
                                        ? "var(--colorBlackTransparent50)"
                                        : "var(--colorBlackTransparent75)",
                            }}
                            onClick={() => {
                                dayDataContextState({
                                    yearValue: day.yearValue,
                                    monthId: day.monthId,
                                    monthName: day.monthName,
                                    dayName: day.dayName,
                                    dayValue: day.dayValue
                                });
                                handleDayAction();
                            }}
                        >
                            {day.dayValue}
                        </button>
                    </div>)}
                </section>)}
            </motion.section>
        </section>
    );
}

export default MonthView;