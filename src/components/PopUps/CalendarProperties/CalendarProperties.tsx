import './calenderProperties.css';
import './calendarPropertyTab.css';

import TaskAltIcon from "@mui/icons-material/TaskAlt";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import AddAlertRoundedIcon from "@mui/icons-material/AddAlertRounded";

import {toggleAddProperty} from "../../../store/slices/popUpSlices";

import {JSX, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import CloseIcon from "@mui/icons-material/Close";
import DockIcon from '@mui/icons-material/Dock';
import {motion} from 'framer-motion';

const CalenderPropertyTab = (): JSX.Element => {
    const dispatch = useDispatch();
    const propertyTitle = useSelector((state: any) => state.popUpSlice).PopUpMenu;
    const [isHovered, setIsHovered] = useState<string>("");

    const getCalenderPropertyTitle = (propertyName: string): string | null => {
        switch (propertyName) {
            case "addEvent":
                return "Add Event";
            case "addReminder":
                return "Add Reminder";
            case "addTask":
                return "Add Task"
            default:
                return null;
        }
    };
    const handleChangeCalenderProperty = (propertyName: string): void => {
        if (propertyName === propertyTitle) return;
        dispatch(toggleAddProperty(propertyName));
    }

    return <div className="calendarPropertyTab">
        <section className="calendarPropertyTab__optionTitle">
            {getCalenderPropertyTitle(propertyTitle) && <h1>{getCalenderPropertyTitle(propertyTitle)}</h1>}
        </section>
        <section className="calendarPropertyTab__tabOptions">
            {propertyTitle !== "addEvent" && <button
                type="button"
                onClick={() => handleChangeCalenderProperty("addEvent")}
                onMouseEnter={() => setIsHovered("addEvent")}
                onMouseLeave={() => setIsHovered("")}
            >
                <EventRoundedIcon style={{
                    color: isHovered === "addEvent" ? "var(--colorWhite)" : "var(--color01)",
                    fontSize: "24px",
                    marginRight: "10px",
                }}/>
                Add Event
            </button>}
            {propertyTitle !== "addTask" && <button
                type="button"
                onClick={() => handleChangeCalenderProperty("addTask")}
                onMouseEnter={() => setIsHovered("addTask")}
                onMouseLeave={() => setIsHovered("")}
            >

                <TaskAltIcon style={{
                    color: isHovered === "addTask" ? "var(--colorWhite)" : "var(--color01)",
                    fontSize: "24px",
                    marginRight: "10px",
                }}/>
                Add Task
            </button>}
            {propertyTitle !== "addReminder" && <button
                type="button"
                onClick={() => handleChangeCalenderProperty("addReminder")}
                onMouseEnter={() => setIsHovered("addReminder")}
                onMouseLeave={() => setIsHovered("")}
            >
                <AddAlertRoundedIcon style={{
                    color: isHovered === "addReminder" ? "var(--colorWhite)" : "var(--color01)",
                    fontSize: "24px",
                    marginRight: "10px",
                }}/>
                Add Reminder
            </button>}
        </section>
    </div>
};

const CalendarProperties = (): JSX.Element | null => {
    const dispatch = useDispatch();
    const menuOption = useSelector((state: any) => state.popUpSlice).PopUpMenu;
    const [showDockIndicator, setShowDockIndicator] = useState<boolean>(false);
    const [isMenuDock, setIsMenuDock] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const handleClosePopMenu = () => {
        dispatch(toggleAddProperty(""));
    };

    const handleDockButton = (isHovered: boolean) => {
        if (isHovered) {
            setShowDockIndicator(true);
            setIsHovered(true);
        } else {
            setShowDockIndicator(false);
            setIsHovered(false);
        }
    };

    const handleDock = () => {
        setIsMenuDock(!isMenuDock);
    };

    return menuOption !== ""
        ? <>
            <motion.div
                className="calenderProperties__dockIndicator"
                initial={{opacity: 0, zIndex: -2}}
                animate={{opacity: showDockIndicator ? 1 : 0, zIndex: showDockIndicator ? 80 : -2,}}
                transition={{duration: 0.15}}
            />
            <motion.section
                className="calenderProperties"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.15}}
            >
                <section className="calenderProperties__Tab">
                    <button
                        type="button"
                        className="calenderProperties__BtnS"
                        onClick={handleClosePopMenu}
                    >
                        <CloseIcon style={{color: "var(--color02)", fontSize: "20px"}}/>
                    </button>
                    <button
                        type="button"
                        className="calenderProperties__BtnS"
                        onClick={handleDock}
                        onMouseOver={() => handleDockButton(true)}
                        onMouseLeave={() => handleDockButton(false)}
                    >
                        <motion.p
                            initial={{opacity: 0,}}
                            animate={{
                                opacity: isHovered ? 1 : 0,
                            }}
                            transition={{duration: 0.15, delay: 0.3}}
                        >
                            Dock the Menu
                        </motion.p>
                        <DockIcon style={{color: "var(--color02)", fontSize: "20px"}}/>
                    </button>
                </section>
                <CalenderPropertyTab/>
                {menuOption === "addEvent" && <div>Add Event</div>}
                {menuOption === "addTask" && <div>Add a Task</div>}
                {menuOption === "addReminder" && <div>Add a Reminder</div>}
            </motion.section>
        </>
        : null
};

export default CalendarProperties;