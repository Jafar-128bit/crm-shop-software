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

import {JSX, Key, useEffect, useState} from "react";
import {motion} from 'framer-motion';
import {dayArrayData, generateCalendarDataLinear, getFormattedDate} from "../../../utils/utils";

interface Month {
    id: number;
    name: string;
}

interface DayData {
    day: number;
    dayName: number;
}

interface FormattedDate {
    year: number;
    monthId: number;
    month: string;
    dayName: number;
    day: number;
}

interface TaskData {
    taskId: number;
    taskData: string;
    isComplete: boolean;
    priorityLevel: number;
    createdAt: FormattedDate;
}

interface TaskEditInfo {
    isTaskEdit: false;
    editedTaskId: undefined | number;
}

type PropMonth = {
    isMonth: boolean;
    setMonth: any;
    setIsMonth: any;
}

type PropDay = {
    handleSelectDay: any;
    dayData: DayData;
    day: DayData;
    handleOpenDayList: any;
    remainingTask: number;
}

type PropTask = {
    taskData: TaskData;
    handleTask: any;
    setIsTaskValue: any;
    setIsEdit: any;
}

let taskData: TaskData[] = [];

const monthData: Month[] = [
    {id: 0, name: "January"},
    {id: 1, name: "February"},
    {id: 2, name: "March"},
    {id: 3, name: "April"},
    {id: 4, name: "May"},
    {id: 5, name: "June"},
    {id: 6, name: "July"},
    {id: 7, name: "August"},
    {id: 8, name: "September"},
    {id: 9, name: "October"},
    {id: 10, name: "November"},
    {id: 11, name: "December"},
];

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
        {monthData.map((value, index) =>
            <motion.button
                key={index}
                type="button"
                className="todoMenu__monthList__month"
                onClick={() => handleSetMonth({id: value.id, name: value.name})}
                whileTap={{
                    scale: 1,
                }}
                whileHover={{
                    background: "var(--backgroundGradient03)",
                    scale: 1.1,
                }}
            >
                {value.name}
            </motion.button>
        )}
    </motion.div>
}
const DayButton = (prop: PropDay): JSX.Element => {
    const handleSelectDate = (): void => {
        if (prop.dayData.day > 0) {
            prop.handleSelectDay({day: prop.dayData.day, dayName: prop.dayData.dayName});
            prop.handleOpenDayList();
        } else return;
    }

    return (
        <motion.button
            type="button"
            className="todoMenu__DayContainer__day"
            onClick={handleSelectDate}
            style={{
                background: (prop.dayData.day === prop.day.day && prop.dayData.dayName === prop.day.dayName)
                    ? "var(--backgroundGradient02)"
                    : "transparent",
                cursor: prop.dayData.day === 0 ? "auto" : "pointer",
            }}
            whileTap={{
                scale: 1,
            }}
            whileHover={
                (prop.dayData.day === prop.day.day && prop.dayData.dayName === prop.day.dayName)
                    ? {scale: 1,}
                    : {scale: 1.1}
            }
            transition={{duration: 0.1}}
        >
            <p className="todoMenu__DayContainer__day__dayNumber" style={{
                color: (prop.dayData.day === prop.day.day && prop.dayData.dayName === prop.day.dayName)
                    ? "var(--colorWhite)"
                    : "var(--colorBlack)",
                fontWeight: (prop.dayData.day === prop.day.day && prop.dayData.dayName === prop.day.dayName)
                    ? "600"
                    : "400",
            }}>
                {prop.dayData.day < 10
                    ? prop.dayData.day === 0
                        ? ``
                        : `0${prop.dayData.day}`
                    : `${prop.dayData.day}`
                }
            </p>
            {prop.remainingTask > 0 &&
                <p className="todoMenu__DayContainer__day__remainingTask">
                    {prop.remainingTask}
                </p>
            }
        </motion.button>
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
                onClick={() => prop.handleTask("UPDATE_TASK_STATUS", prop.taskData.taskId)}
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

const TodoMenu = (): JSX.Element => {
    const todayDate: FormattedDate = getFormattedDate();

    const [isMonth, setIsMonth] = useState<boolean>(false);
    const [month, setMonth] = useState<Month>({
        id: todayDate.monthId,
        name: todayDate.month
    });
    const [year, setYear] = useState<number>(todayDate.year);
    const [day, setDay] = useState<DayData>({
        day: todayDate.day,
        dayName: todayDate.dayName
    });
    const [isDayList, setIsDayList] = useState<boolean>(false);
    const dayData: DayData[] = generateCalendarDataLinear(year, month.id);

    const [isTaskValue, setIsTaskValue] = useState<string>("");
    const [isTaskData, setIsTaskData] = useState<TaskData[]>([]);
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
    const handleSelectDay = (dayData: DayData): void => setDay({day: dayData.day, dayName: dayData.dayName});
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
            year: year,
            monthId: month.id,
            month: month.name,
            dayName: day.dayName,
            day: day.day,
        };

        return isTaskData.filter((task: TaskData) => {
            if (
                task.createdAt.year === selectedDate.year &&
                task.createdAt.monthId === selectedDate.monthId &&
                task.createdAt.month === selectedDate.month &&
                task.createdAt.dayName === selectedDate.dayName &&
                task.createdAt.day === selectedDate.day
            ) return task;
        });
    };
    const handleGetCompletedTask = (): number => handleCheckTaskDate().filter((element: TaskData) => element.isComplete).length;
    const handleRemainingTask = (taskDate: FormattedDate): number => {
        const selectedDateTask = isTaskData.filter((task: TaskData) => {
            if (
                task.createdAt.year === taskDate.year &&
                task.createdAt.monthId === taskDate.monthId &&
                task.createdAt.month === taskDate.month &&
                task.createdAt.dayName === taskDate.dayName &&
                task.createdAt.day === taskDate.day
            ) return task;
        });

        return selectedDateTask.length - selectedDateTask.filter((element: TaskData) => element.isComplete).length;
    }

    const handleTask = (
        flag: string,
        taskId?: number,
        priorityLevel: number = 1,
    ): void => {

        const getIndex = (): number => taskData.findIndex((element: TaskData) => element.taskId === taskId);
        const resetInput = (): void => {
            setIsTaskValue("");
            setIsEdit({
                isTaskEdit: false,
                editedTaskId: undefined,
            });
        };
        const updateTaskData = (): void => {
            setIsTaskData([]);
            setIsTaskData([...taskData]);
        };

        switch (flag) {
            case "ADD_TASK":
                if (isTaskValue !== "") {
                    taskData.push({
                        taskId: taskData.length !== 0 ? taskData[taskData.length - 1].taskId + 1 : 0,
                        taskData: isTaskValue,
                        isComplete: false,
                        priorityLevel: priorityLevel,
                        createdAt: {
                            year: year,
                            monthId: month.id,
                            month: month.name,
                            dayName: day.dayName,
                            day: day.day,
                        },
                    });
                    updateTaskData();
                    resetInput();
                }
                break;
            case "UPDATE_TASK_CONTENT":
                if (getIndex() !== -1) {
                    taskData[getIndex()].taskData = isTaskValue;
                    updateTaskData();
                    resetInput();
                }
                break;
            case "CHANGE_TASK_PRIORITY":
                if (getIndex() !== -1) {
                    taskData[getIndex()].priorityLevel = priorityLevel;
                    updateTaskData();
                }
                break;
            case "UPDATE_TASK_STATUS":
                if (getIndex() !== -1) {
                    taskData[getIndex()].isComplete
                        ? taskData[getIndex()].isComplete = false
                        : taskData[getIndex()].isComplete = true;
                    updateTaskData();
                }
                break;
            case "REMOVE_TASK":
                taskData = taskData.filter((task: TaskData) => task.taskId !== taskId);
                setIsTaskData([...taskData]);
                break;
            case "CLEAR_TASK":
                setIsTaskData([]);
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
                    {`${handleSelectDayName(day.dayName)}, ${day.day}`}
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
                <MonthList isMonth={isMonth} setMonth={setMonth} setIsMonth={setIsMonth}/>
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
                        dayArrayData(dayData)
                            .map((value: DayData, index: number) => <DayButton
                                    key={index}
                                    day={day}
                                    dayData={value}
                                    handleSelectDay={handleSelectDay}
                                    handleOpenDayList={handleOpenDayList}
                                    remainingTask={handleRemainingTask({
                                        year: year,
                                        monthId: month.id,
                                        month: month.name,
                                        dayName: value.dayName,
                                        day: value.day,
                                    })}
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