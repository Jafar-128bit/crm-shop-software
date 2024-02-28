import './app.css';

import {Outlet} from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import type {JSX} from "react";
import TopInfoBar from "./assets/TopInfoBar/TopInfoBar";
import {motion} from 'framer-motion';
import {useDispatch, useSelector} from "react-redux";
import Menu from "./components/Menu/Menu";
import CloseIcon from "@mui/icons-material/Close";
import {toggleDateAndTimeMenu, toggleEmailMenu, toggleMessageMenu, toggleTodoMenu} from "./store/slices/menuSlices";
import {Calendar, Task} from "./class/class";
import PopUps from "./components/PopUps/PopUps";

function App(): JSX.Element {
    const calendarData = new Calendar();
    const taskData = new Task();

    const dispatch = useDispatch();
    const menuState = useSelector((state: any) => state.menuSlice);
    const handleSelectMenu = (): "todoMenu" | "dateMenu" | null => {
        if (menuState.dateAndTimeMenu) return "dateMenu";
        else if (menuState.messageMenu) return null;
        else if (menuState.emailMenu) return null;
        else if (menuState.todoMenu) return "todoMenu";
        else return null;
    }

    const handleCloseMenu = (): void => {
        dispatch(toggleEmailMenu(false));
        dispatch(toggleMessageMenu(false));
        dispatch(toggleTodoMenu(false));
        dispatch(toggleDateAndTimeMenu(false));
    }

    return (
        <main className="app">
            <motion.section
                className="app__menu"
                animate={
                    (
                        menuState.dateAndTimeMenu ||
                        menuState.messageMenu ||
                        menuState.emailMenu ||
                        menuState.todoMenu
                    )
                        ? {display: "flex", x: 0}
                        : {display: "none", x: 500}
                }
                transition={{duration: 0.25, ease: "easeOut"}}
            >
                <button className="app__closeBtn" onClick={handleCloseMenu}>
                    <CloseIcon/>
                </button>
                <Menu name={handleSelectMenu()} calendarData={calendarData} taskData={taskData}/>
            </motion.section>
            <Sidebar/>
            <section className="app__container">
                <TopInfoBar calendarData={calendarData}/>
                <Outlet/>
            </section>
            <PopUps/>
        </main>
    );
}

export default App;
