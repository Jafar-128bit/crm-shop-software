import './todoMenu.css';

import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import AddIcon from '@mui/icons-material/Add';
import DownloadDoneRoundedIcon from '@mui/icons-material/DownloadDoneRounded';

import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';

import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

import {JSX, useEffect, useState} from "react";
import {motion} from 'framer-motion';
import {DayData, FormattedDate, TaskData, WeekData} from "../../../type/type";
import {useDispatch, useSelector} from "react-redux";
import {clearTaskData, updateTaskData} from "../../../store/slices/todoDataSlice";
import {deepClone} from "../../../utils/utils";

type Prop = {
    calendarData: any;
    taskData: any;
}

interface Month {
    id: number;
    name?: string;
}

interface TaskEditInfo {
    isTaskEdit: false;
    editedTaskId: undefined | number;
}

type PropMonth = {
    isMonth: boolean;
    setMonth: any;
    setIsMonth: any;
    monthDataArray: any[];
}

type PropDay = {
    handleSelectDay: any;
    weekData: WeekData;
    dayData: DayData;
    handleOpenDayList: any;
    remainingTask: any;
    currentMonthId: number;
    monthName?: string;
    currentYear: number;
}

type PropTask = {
    taskData: TaskData;
    handleTask: any;
    setIsTaskValue: any;
    setIsEdit: any;
}

const MonthList = (prop: PropMonth): JSX.Element => {
    const handleSetMonth = (monthName: Month): void => {
        prop.setMonth(monthName);
        prop.setIsMonth(false);
    }

    return <motion.div
        className="todoMenu__monthList"
        initial={{display: "none", opacity: 0}}
        animate={prop.isMonth ? {display: "flex", opacity: 1} : {display: "none", opacity: 0}}
    >
        {prop.monthDataArray.map((value, index) =>
            <motion.button
                key={index}
                type="button"
                className="todoMenu__monthList__month"
                onClick={() => handleSetMonth({id: value.monthId, name: value.monthName})}
                whileTap={{
                    scale: 1,
                }}
                whileHover={{
                    background: "var(--backgroundGradient03)",
                    scale: 1.1,
                }}
            >
                {value.monthName}
            </motion.button>
        )}
    </motion.div>
}
const DayButton = (prop: PropDay): JSX.Element => {
    const handleSelectDate = (value: DayData): void => {
        if (value.dayValue > 0) {
            prop.handleSelectDay({dayValue: value.dayValue, dayName: value.dayName});
            prop.handleOpenDayList();
        } else return;
    }

    return (
        <li className="todoMenu__DayContainer__Week">
            {prop.weekData.dayArray.map((value: DayData, index: number) => <motion.button
                key={index}
                type="button"
                className="todoMenu__DayContainer__day"
                onClick={() => handleSelectDate(value)}
                style={{
                    background: (value.dayValue === prop.dayData.dayValue && value.dayName === prop.dayData.dayName)
                        ? "var(--backgroundGradient02)"
                        : "transparent",
                    cursor: value.dayValue === 0 ? "auto" : "pointer",
                }}
                whileTap={{
                    scale: 1,
                }}
                whileHover={
                    (value.dayValue === prop.dayData.dayValue && value.dayName === prop.dayData.dayName)
                        ? {scale: 1,}
                        : {scale: 1.1}
                }
                transition={{duration: 0.1}}
            >
                <p className="todoMenu__DayContainer__day__dayNumber" style={{
                    color: (value.dayValue === prop.dayData.dayValue && value.dayName === prop.dayData.dayName)
                        ? "var(--colorWhite)"
                        : value.monthId === prop.currentMonthId ? "var(--colorBlack)" : "var(--colorBlackTransparent50)",
                    fontWeight: (value.dayValue === prop.dayData.dayValue && value.dayName === prop.dayData.dayName)
                        ? "600"
                        : "400",
                }}>
                    {value.dayValue < 10
                        ? value.dayValue === 0
                            ? ``
                            : `0${value.dayValue}`
                        : `${value.dayValue}`
                    }
                </p>
                {prop.remainingTask({
                        yearValue: prop.currentYear,
                        monthId: prop.currentMonthId,
                        dayName: value.dayName,
                        dayValue: value.dayValue,
                    }) > 0 &&
                    <p className="todoMenu__DayContainer__day__remainingTask">
                        {prop.remainingTask({
                            yearValue: prop.currentYear,
                            monthId: prop.currentMonthId,
                            dayName: value.dayName,
                            dayValue: value.dayValue,
                        })}
                    </p>
                }
            </motion.button>)}
        </li>
    )
}
const TaskList = (prop: PropTask): JSX.Element => {

    const [isPriorityMenu, setIsPriorityMenu] = useState<boolean>(false);
    const handleOpenPriorityMenu = (): void => setIsPriorityMenu(!isPriorityMenu);
    const handleSetPriority = (priorityLevel: number): void => {
        prop.handleTask("CHANGE_TASK_PRIORITY", prop.taskData.taskId, priorityLevel);
        setIsPriorityMenu(false);
    }
    const handleTaskEdit = (): void => {
        prop.setIsTaskValue(prop.taskData.taskData);
        prop.setIsEdit({
            isTaskEdit: true,
            editedTaskId: prop.taskData.taskId,
        });
    }
    const handleChangeTaskStatus = () => prop.handleTask("UPDATE_TASK_STATUS", prop.taskData.taskId);

    const iconStyle = {
        height: "20px",
        color: "var(--colorBlack)",
        fontSize: "22px",
    };

    return (
        <div
            className="todoMenu__todoContainer"
            style={{
                background: `linear-gradient(-225deg, var(--priority-level-${prop.taskData.priorityLevel}) 0%, var(--colorWhite) 50%)`,
                border: `1px solid var(--priority-level-${prop.taskData.priorityLevel})`
            }}
        >
            <motion.div
                className="todoMenu__todoContainer__priorityMenu"
                initial={{display: "none", opacity: 0}}
                animate={isPriorityMenu ? {display: "flex", opacity: 1} : {display: "none", opacity: 0}}
            >
                <h3 className="todoMenu__todoContainer__priorityTitle">Select Priority</h3>
                <section className="todoMenu__todoContainer__priorityList">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(value =>
                        <motion.button
                            key={value}
                            type="button"
                            className="todoMenu__todoContainer__priority"
                            style={{background: `var(--priority-level-${value})`,}}
                            onClick={() => handleSetPriority(value)}
                            whileHover={{scale: 1.1,}}
                            whileTap={{scale: 0.95,}}
                            transition={{duration: 0.1}}
                        >
                            {value}
                        </motion.button>)}
                </section>
            </motion.div>
            <button
                type="button"
                className="todoMenu__todoContainer__statusBtn"
                onClick={handleChangeTaskStatus}
            >
                {
                    prop.taskData.isComplete
                        ? <RadioButtonCheckedIcon style={iconStyle}/>
                        : <RadioButtonUncheckedIcon style={iconStyle}/>
                }
            </button>
            <div className="todoMenu__todoContainer__content">
                <p style={{textDecoration: prop.taskData.isComplete ? "line-through" : "none"}}>
                    {prop.taskData.taskData}
                </p>
            </div>
            <div className="todoMenu__todoContainer__btnContainer">
                <button
                    type="button"
                    className="todoMenu__todoContainer__priorityBtn"
                    style={{background: `var(--priority-level-${prop.taskData.priorityLevel})`,}}
                    onClick={handleOpenPriorityMenu}
                >
                    {prop.taskData.priorityLevel}
                </button>
                <button
                    type="button"
                    className="todoMenu__todoContainer__editButton"
                    onClick={handleTaskEdit}
                >
                    <BorderColorRoundedIcon style={iconStyle}/>
                </button>
                <button
                    type="button"
                    className="todoMenu__todoContainer__deleteBtn"
                    onClick={() => prop.handleTask("REMOVE_TASK", prop.taskData.taskId)}
                >
                    <DeleteOutlineRoundedIcon style={iconStyle}/>
                </button>
            </div>
        </div>
    );
};

const TodoMenu = (prop: Prop): JSX.Element => {
    const dispatch = useDispatch();
    const taskDataList = useSelector((state: any) => state.todoDataSlice);
    console.log(taskDataList.taskData);

    const todayDate: FormattedDate = prop.calendarData.getFormattedDate();

    const [isMonth, setIsMonth] = useState<boolean>(false);
    const [month, setMonth] = useState<Month>({
        id: todayDate.monthId,
        name: todayDate.monthName
    });
    const [year, setYear] = useState<number>(prop.calendarData.getCalendarData().yearValue);
    const [dayData, setDayData] = useState<DayData>({
        dayValue: todayDate.dayValue,
        dayName: todayDate.dayName,
        weekId: 0,
        monthId: month.id,
        dayObjects: [],
    });
    const [isDayList, setIsDayList] = useState<boolean>(false);

    const [isTaskValue, setIsTaskValue] = useState<string>("");
    // const [isTaskData, setIsTaskData] = useState<TaskData[]>([]);
    const [isEdit, setIsEdit] = useState<TaskEditInfo>({
        isTaskEdit: false,
        editedTaskId: undefined,
    });

    const handleOpenMonthList = (): void => setIsMonth(!isMonth);
    const handleOpenDayList = (): void => setIsDayList(!isDayList);
    const handleChangeYear = (flag: string): void => {
        if (flag === "dec") setYear(year - 1);
        else if (flag === "inc") setYear(year + 1);
    }
    const handleSelectDay = (dayData: DayData): void => setDayData({
        dayValue: dayData.dayValue,
        dayName: dayData.dayName,
        weekId: dayData.weekId,
        monthId: dayData.monthId,
        dayObjects: []
    });
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
    const handleTaskInputChange = (e: any): void => {
        e.preventDefault();
        setIsTaskValue(e.target.value);
    }
    const handleCheckTaskDate = (): TaskData[] => {
        const selectedDate: FormattedDate = {
            yearValue: year,
            monthId: month.id,
            monthName: month.name,
            dayName: dayData.dayName,
            dayValue: dayData.dayValue,
        };
        return prop.taskData.getTaskByDate(selectedDate);
    }

    const handleGetCompletedTask = (): number => prop.taskData.sortTaskByStatus(handleCheckTaskDate(), "complete")[0].length;
    const handleRemainingTask = (taskDate: FormattedDate): number => {
        return prop.taskData.getTaskByDate(taskDate).length - prop.taskData.sortTaskByStatus(handleCheckTaskDate(), "complete")[0].length;
    }

    const handleTask = (flag: string, taskId: number = 0, newPriorityLevel: number = 0): void => {

        const resetInput = (): void => {
            setIsTaskValue("");
            setIsEdit({
                isTaskEdit: false,
                editedTaskId: undefined,
            });
        };
        const setTaskData = () => {
            dispatch(clearTaskData());
            const newData: Array<TaskData> = deepClone<Array<TaskData>>(prop.taskData.getAllTask());
            dispatch(updateTaskData(newData));
        }

        switch (flag) {
            case "ADD_TASK":
                if (isTaskValue !== "") {
                    prop.taskData.addTask(isTaskValue);
                    setTaskData();
                    resetInput();
                }
                break;
            case "UPDATE_TASK_CONTENT":
                prop.taskData.updateTaskData(taskId, isTaskValue);
                setTaskData();
                resetInput();
                break;
            case "CHANGE_TASK_PRIORITY":
                prop.taskData.changeTaskPriority(taskId, newPriorityLevel);
                setTaskData();
                break;
            case "UPDATE_TASK_STATUS":
                prop.taskData.changeTaskStatus(taskId, !prop.taskData.getTaskById(taskId).isComplete);
                setTaskData();
                break;
            case "REMOVE_TASK":
                prop.taskData.removeTask(taskId);
                setTaskData();
                break;
            case "CLEAR_TASK":
                break;
            default:
                break;
        }
    };

    return (
        <div className="todoMenu">
            <section className="todoMenu__titleContainer">
                <h2 className="todoMenu__title">Todo Menu</h2>
                <p className="todoMenu__todoCounter">
                    {
                        handleCheckTaskDate().length === 0
                            ? "No Task Available Today" : `Task Completed ${handleGetCompletedTask()} of ${handleCheckTaskDate().length}`
                    }
                </p>
            </section>
            <section className="todoMenu__DateContainer">
                <button type="button" className="todoMenu__dayBtn" onClick={handleOpenDayList}>
                    {`${handleSelectDayName(dayData.dayName)}, ${dayData.dayValue}`}
                    <ArrowDropDownRoundedIcon
                        style={{
                            color: "var(--color03)",
                            fontSize: "26px",
                            transform: isDayList ? "rotate(-180deg)" : "rotate(0deg)",
                        }}
                    />
                </button>
                <button type="button" className="todoMenu__monthBtn" onClick={handleOpenMonthList}>
                    {month.name}
                    <ArrowDropDownRoundedIcon
                        style={{
                            color: "var(--color03)",
                            fontSize: "26px",
                            transform: isMonth ? "rotate(-180deg)" : "rotate(0deg)",
                        }}
                    />
                </button>
                <MonthList isMonth={isMonth} setMonth={setMonth} setIsMonth={setIsMonth}
                           monthDataArray={prop.calendarData.getCalendarData().monthArray}/>
                <div className="todoMenu__yearContainer">
                    <button type="button" className="todoMenu__yearBtn" onClick={() => handleChangeYear("dec")}>
                        <ArrowLeftIcon style={{color: "var(--color03)", fontSize: "26px"}}/>
                    </button>
                    <p className="todoMenu__year">{year}</p>
                    <button type="button" className="todoMenu__yearBtn" onClick={() => handleChangeYear("inc")}>
                        <ArrowRightIcon style={{color: "var(--color03)", fontSize: "26px"}}/>
                    </button>
                </div>
            </section>
            <motion.section
                className="todoMenu__DayContainer"
                initial={{display: "none", opacity: 0}}
                animate={
                    isDayList
                        ? {display: "flex", opacity: 1}
                        : {display: "none", opacity: 0}
                }
            >
                <ul className="todoMenu__DayContainer__dayNameList">
                    {
                        ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]
                            .map((dayName: string, index: number) => <li
                                    key={index}
                                    className="todoMenu__DayContainer__dayName">
                                    {dayName}
                                </li>
                            )
                    }
                </ul>
                <ul className="todoMenu__DayContainer__dayList noScroll">
                    {
                        prop.calendarData.getCalendarData().monthArray[month.id].weekArray
                            .map((value: WeekData, index: number) => <DayButton
                                    key={index}
                                    dayData={dayData}
                                    weekData={value}
                                    handleSelectDay={handleSelectDay}
                                    handleOpenDayList={handleOpenDayList}
                                    remainingTask={handleRemainingTask}
                                    currentMonthId={month.id}
                                    monthName={month.name}
                                    currentYear={year}
                                />
                            )
                    }
                </ul>
            </motion.section>
            <section className="todoMenu__inputContainer">
                <input type="text" placeholder="Your task" value={isTaskValue} onChange={handleTaskInputChange}/>
                <button
                    type="button"
                    className="todoMenu__inputSubmitBtn"
                    onClick={() => {
                        if (isEdit.isTaskEdit) handleTask("UPDATE_TASK_CONTENT", isEdit.editedTaskId);
                        else handleTask("ADD_TASK");
                    }}
                >
                    {
                        isEdit.isTaskEdit
                            ? <DownloadDoneRoundedIcon/>
                            : <AddIcon/>
                    }
                </button>
            </section>
            <section className="todoMenu__todoListContainer">
                {
                    handleCheckTaskDate().length === 0
                        ? <p>No Task Available</p>
                        : handleCheckTaskDate().map((value: TaskData, index: number) => <TaskList
                            key={index}
                            taskData={value}
                            handleTask={handleTask}
                            setIsTaskValue={setIsTaskValue}
                            setIsEdit={setIsEdit}
                        />)
                }
            </section>
        </div>
    );
}

export default TodoMenu;