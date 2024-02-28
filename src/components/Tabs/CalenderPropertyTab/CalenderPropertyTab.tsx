import './calenderPropertyTab.css';
import {JSX} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toggleAddProperty} from "../../../store/slices/popUpSlices";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import AddAlertRoundedIcon from "@mui/icons-material/AddAlertRounded";

const CalenderPropertyTab = (): JSX.Element => {
    const dispatch = useDispatch();
    const propertyTitle = useSelector((state: any) => state.popUpSlice).PopUpMenu;

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
            <button
                type="button"
                onClick={() => handleChangeCalenderProperty("addEvent")}
                style={{
                    background: propertyTitle === "addEvent" ? "var(--color01)" : "var(--colorWhite)",
                    color: propertyTitle === "addEvent" ? "var(--colorWhite)" : "var(--color01)",
                    cursor: propertyTitle === "addEvent" ? "none" : "pointer",
                }}
            >
                <EventRoundedIcon style={{
                    color: propertyTitle === "addEvent" ? "var(--colorWhite)" : "var(--color01)",
                    fontSize: "24px",
                    marginRight: "10px",
                }}/>
                Add Event
            </button>
            <button
                type="button"
                onClick={() => handleChangeCalenderProperty("addTask")}
                style={{
                    background: propertyTitle === "addTask" ? "var(--color01)" : "var(--colorWhite)",
                    color: propertyTitle === "addTask" ? "var(--colorWhite)" : "var(--color01)",
                    cursor: propertyTitle === "addTask" ? "none" : "pointer",
                }}
            >

                <TaskAltIcon style={{
                    color: propertyTitle === "addTask" ? "var(--colorWhite)" : "var(--color01)",
                    fontSize: "24px",
                    marginRight: "10px",
                }}/>
                Add Task
            </button>
            <button
                type="button"
                onClick={() => handleChangeCalenderProperty("addReminder")}
                style={{
                    background: propertyTitle === "addReminder" ? "var(--color01)" : "var(--colorWhite)",
                    color: propertyTitle === "addReminder" ? "var(--colorWhite)" : "var(--color01)",
                    cursor: propertyTitle === "addReminder" ? "none" : "pointer",
                }}
            >
                <AddAlertRoundedIcon style={{
                    color: propertyTitle === "addReminder" ? "var(--colorWhite)" : "var(--color01)",
                    fontSize: "24px",
                    marginRight: "10px",
                }}/>
                Add Reminder
            </button>
        </section>
        <section className="calendarPropertyTab__tabIndicator">

        </section>
    </div>
}

export default CalenderPropertyTab;