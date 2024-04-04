import './app.css';

import {Outlet} from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import type {JSX} from "react";
import TopInfoBar from "./components/TopInfoBar/TopInfoBar";
import PopUps from "./components/PopUps/PopUps";
import CalendarProperties from "./components/PopUps/CalendarProperties/CalendarProperties";
import {useSelector} from "react-redux";
import {motion} from 'framer-motion';

function App(): JSX.Element {
    const isSidebarOpen = useSelector((state: any) => state.menuSlice.sidebarState);

    const sidebarAreaAnimation = {
        animate: {
            width: !isSidebarOpen ? "calc(100% - 110px - 15px)" : "calc(100% - 400px - 15px)",
            transition: {
                duration: 0.15
            },
        }
    }

    return (
        <main className="app">
            <Sidebar/>
            <motion.section className="app__container" variants={sidebarAreaAnimation} animate="animate">
                <TopInfoBar/>
                <Outlet/>
            </motion.section>
            <PopUps/>
            <CalendarProperties/>
        </main>
    );
}

export default App;
