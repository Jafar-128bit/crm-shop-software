import './topInfoBar.css';

import userProfilePicture from "../../assets/image/userProfilePicture.jpeg";

import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import MessageIcon from '@mui/icons-material/Message';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

import {JSX, useState} from "react";
import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import {useDispatch} from "react-redux";
import {
    toggleDateAndTimeMenu,
    toggleEmailMenu,
    toggleMessageMenu,
    toggleTodoMenu
} from
        "../../store/slices/menuSlices";
import useGetTime from "../../hooks/useGetTime";
import {FormattedDateExtended} from "../../type/type";

type Prop = {
    calendarData: any;
}

const TopInfoBar = (prop: Prop): JSX.Element => {
    const todayDate: FormattedDateExtended = prop.calendarData.getFormattedDate();
    const getTime: string = useGetTime();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isImageHover, setIsImageHover] = useState<boolean>(false);
    const handleGoto = (path: string): void => navigate(path);
    const handleOpenMenu = (menu: string): void => {
        switch (menu) {
            case "email":
                dispatch(toggleEmailMenu(true));
                break;
            case "message":
                dispatch(toggleMessageMenu(true));
                break;
            case "todo":
                dispatch(toggleTodoMenu(true));
                break;
            case "dateAndTime":
                dispatch(toggleDateAndTimeMenu(true));
                break;
            default:
                break;
        }
    }

    return (
        <div className="topInfoBar">
            <section className="topInfoBar__sectionContainer section01">
                <div
                    className="topInfoBar__imageContainer"
                    onClick={() => handleGoto("/users")}
                    onMouseOver={() => setIsImageHover(true)}
                    onMouseLeave={() => setIsImageHover(false)}
                >
                    <motion.img
                        src={userProfilePicture}
                        alt="profile picture"
                        whileTap={{width: "100%"}}
                        animate={isImageHover ? {width: "140%",} : {width: "100%",}}
                    />
                </div>
                <div className="topInfoBar__userInfoContainer">
                    <p
                        className="topInfoBar__userName"
                        onClick={() => handleGoto("/users")}
                    >
                        John Watson
                    </p>
                    <p
                        className="topInfoBar__userEmail"
                        onClick={() => handleGoto("/users")}
                    >
                        johnwatson99@gmail.com
                    </p>
                </div>
            </section>
            <section
                className="topInfoBar__sectionContainer section02"
                onClick={() => handleOpenMenu("dateAndTime")}
            >
                <p className="topInfoBar__time">
                    {getTime}
                </p>
                <p className="topInfoBar__date">
                    {`${todayDate.dayValue} ${todayDate.monthName.split('').slice(0, 3).join('')}, ${todayDate.yearValue}`}
                </p>
            </section>
            <section className="topInfoBar__sectionContainer section03">
                <button
                    type="button"
                    className="topInfoBar__actionBtn"
                    onClick={() => handleOpenMenu("email")}
                >
                    <LocalPostOfficeIcon style={{color: "var(--colorBlack)"}}/>
                </button>
                <button
                    type="button"
                    className="topInfoBar__actionBtn"
                    onClick={() => handleOpenMenu("message")}
                >
                    <MessageIcon style={{color: "var(--colorBlack)"}}/>
                </button>
                <button
                    type="button"
                    className="topInfoBar__actionBtn"
                    onClick={() => handleOpenMenu("todo")}
                >
                    <TaskAltIcon style={{color: "var(--colorBlack)"}}/>
                </button>
            </section>
        </div>
    );
}

export default TopInfoBar;