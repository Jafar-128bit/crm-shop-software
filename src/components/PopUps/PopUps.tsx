import './popUps.css';
import {JSX} from "react";
import AddEventMenu from "./AddEventMenu/AddEventMenu";
import {useDispatch, useSelector} from "react-redux";
import {motion} from 'framer-motion';
import {toggleAddProperty} from "../../store/slices/popUpSlices";
import Tabs from "../Tabs/Tabs";
import CloseIcon from "@mui/icons-material/Close";

const PopUps = () => {
    const dispatch = useDispatch();
    const menuOption = useSelector((state: any) => state.popUpSlice).PopUpMenu;

    const handleClosePopMenu = () => {
        dispatch(toggleAddProperty(""));
    }

    const CalendarPropertyMenu = ({Component}: { Component: JSX.Element }) => (
        <section className="popups__calenderPropertyMenu">
            <button className="app__closeBtn popups__calenderPropertyMenu__closeBtn" onClick={handleClosePopMenu}>
                <CloseIcon/>
            </button>
            <Tabs tabName="calenderPropertyTab"/>
            {Component}
        </section>
    );

    const handleSelectPopupMenu = (menuName: string): JSX.Element | null => {
        switch (menuName) {
            case "addEvent":
                return <CalendarPropertyMenu Component={<AddEventMenu/>}/>;
            case "addReminder":
                return <CalendarPropertyMenu Component={<div>Add a Reminder</div>}/>;
            case "addTask":
                return <CalendarPropertyMenu Component={<div>Add a Task</div>}/>;
            default:
                return null;
        }
    };

    return <motion.div
        className="popups"
        initial={{zIndex: -2, opacity: 0}}
        animate={{zIndex: menuOption === "" ? -2 : 99, opacity: menuOption === "" ? 0 : 1}}
    >
        {handleSelectPopupMenu(menuOption)}
    </motion.div>
};

export default PopUps;