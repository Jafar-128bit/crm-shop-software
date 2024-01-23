import './todoMenu.css';

import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import DownloadDoneRoundedIcon from '@mui/icons-material/DownloadDoneRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';

import {JSX, useState} from "react";
import {motion} from 'framer-motion';
import {bool} from "yup";

interface Month {
    id: number;
    name: string;
}

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

type Prop = {
    isMonth: boolean;
    setMonth: any;
    setIsMonth: any;
}

const MonthList = (prop: Prop): JSX.Element => {
    const handleSetMonth = (monthName: string): void => {
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
                onClick={() => handleSetMonth(value.name)}
                whileTap={{
                    scale: 1,
                }}
                whileHover={{
                    background: "var(--backgroundGradient03)",
                    backgroundSize: "100% 100%",
                    scale: 1.1,
                }}
            >
                {value.name}
            </motion.button>
        )}
    </motion.div>
}

const TodoMenu = (): JSX.Element => {
    const [isMonth, setIsMonth] = useState<boolean>(false);
    const [month, setMonth] = useState<string>("January");
    const [year, setYear] = useState<number>(2024);

    const handleOpenMonthList = (): void => setIsMonth(!isMonth);

    const handleChangeYear = (flag: string) => {
        if (flag === "dec") setYear(year + 1);
        else if (flag == "inc") setYear(year + 1);
    }

    const taskData = [];

    return (
        <div className="todoMenu">
            <section className="todoMenu__titleContainer">
                <h2 className="todoMenu__title">Todo Menu</h2>
                <div className="todoMenu__todoCounter">
                    Task Complete 1 of 3
                </div>
            </section>
            <section className="todoMenu__DateContainer">
                <button className="todoMenu__monthBtn" onClick={handleOpenMonthList}>
                    {month}
                    <ArrowDropDownRoundedIcon style={{color: "var(--color03)", fontSize: "26px"}}/>
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
        </div>
    );
}

export default TodoMenu;