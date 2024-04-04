import './sidebar.css';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import StoreIcon from '@mui/icons-material/Store';

import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import BadgeIcon from '@mui/icons-material/Badge';
import PaymentIcon from '@mui/icons-material/Payment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SupportIcon from '@mui/icons-material/Support';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

import {useState} from "react";
import type {JSX} from 'react';
import {motion} from "framer-motion";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import userProfilePicture from "../../assets/image/userProfilePicture.jpeg";
import {toggleMenuState} from "../../store/slices/menuSlices";

interface OptionsData {
    id: number;
    optionName: string;
    url: string;
    icon: JSX.Element;
}

interface IconStyle {
    color: string;
    fontSize: string;
}

const iconStyle: IconStyle = {
    color: "var(--colorBlack)",
    fontSize: "20px",
};

const Sidebar = (): JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSidebarOpen = useSelector((state: any) => state.menuSlice.sidebarState);
    const [isImageHover, setIsImageHover] = useState<boolean>(false);
    // const sidebar = useSelector((state: any) => state.menuSlice.sidebarState);

    const [selectStore, setSelectStore] = useState<boolean>(false);
    const [isDark, setIsDark] = useState<boolean>(false);

    const handleSelectStore = (): void => setSelectStore(!selectStore);
    const handleTheme = (): void => setIsDark(!isDark);
    const handleOptionNavigate = (url: string): void => navigate(url);

    const handleToggleSidebar = (): void => {
        dispatch(toggleMenuState({actionState: !isSidebarOpen, optionName: "SIDE_BAR"}));
    }

    const optionsData: OptionsData[] = [
        {id: 1, optionName: "Dashboard", url: "", icon: <SpaceDashboardIcon style={iconStyle}/>,},
        {id: 2, optionName: "Billing", url: "billing", icon: <ReceiptLongIcon style={iconStyle}/>,},
        {id: 3, optionName: "Inventory", url: "inventory", icon: <Inventory2Icon style={iconStyle}/>,},
        {id: 4, optionName: "Employee", url: "employee", icon: <BadgeIcon style={iconStyle}/>,},
        {id: 5, optionName: "Accounting", url: "accounting", icon: <PaymentIcon style={iconStyle}/>,},
        {id: 6, optionName: "Calendar", url: "calendar", icon: <CalendarMonthIcon style={iconStyle}/>,},
        {id: 7, optionName: "Help & Support", url: "help&support", icon: <SupportIcon style={iconStyle}/>,},
    ];

    const userContainerAnimation = {
        animate: {
            width: !isSidebarOpen ? "110px" : "100%",
            transition: {
                duration: 0.15
            },
        },
    };
    const sidebarContainerAnimation = {
        animate: {
            width: !isSidebarOpen ? "110px" : "400px",
            transition: {
                duration: 0.15
            },
        }
    };
    const shopListContainerAnimation = {
        animate: {
            border: !isSidebarOpen ? "none" : "1px solid var(--colorBlackTransparent35)",
            transition: {
                duration: 0.15
            },
        }
    };
    const shopListButtonAnimation = {
        animate: {
            width: !isSidebarOpen ? "50px" : "40px",
            height: !isSidebarOpen ? "40px" : "35px",
            transition: {
                duration: 0.15
            },
        }
    };
    const sidebarOptionAnimation = {
        animate: {
            width: !isSidebarOpen ? "100%" : "100%",
            height: !isSidebarOpen ? "40px" : "35px",
            justifyContent: !isSidebarOpen ? "center" : "flex-start",
            padding: !isSidebarOpen ? "0" : "0 0 0 10px",
            transition: {
                duration: 0.15
            },
        }
    };
    const settingOptionsAnimation = {
        animate: {
            width: isSidebarOpen ? "calc(50% - 5px)" : "100%",
            height: isSidebarOpen ? "45px" : "40px",
            justifyContent: isSidebarOpen ? "space-between" : "center",
            margin: isSidebarOpen ? "0" : "10px 0 0 0",
            padding: isSidebarOpen ? "0 15px" : "0",
            transition: {
                duration: 0.15
            },
        },
    }

    return (
        <motion.aside className="sidebar noScroll" variants={sidebarContainerAnimation} animate="animate">
            <motion.div className="sidebar__userContainer" variants={userContainerAnimation} animate="animate">
                <div
                    className="sidebar__imageContainer"
                    onClick={() => handleOptionNavigate("employee")}
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
                {isSidebarOpen && <div className="sidebar__userInfoContainer">
                    <p
                        className="sidebar__userName"
                        onClick={() => handleOptionNavigate("employee")}
                    >
                        John Watson
                    </p>
                    <p
                        className="sidebar__userEmail"
                        onClick={() => handleOptionNavigate("employee")}
                    >
                        johnwatson99@gmail.com
                    </p>
                </div>}
                <button
                    type="button"
                    className="sidebar__toggleBtn"
                    onClick={handleToggleSidebar}
                >
                    {isSidebarOpen ? <CloseIcon/> : <MenuIcon/>}
                </button>
            </motion.div>
            <div className="sidebar__shopListContainer">
                {isSidebarOpen && <p className="sidebar__shopListContainer__title">
                    Select Store
                </p>}
                <motion.div className="sidebar__shopList" variants={shopListContainerAnimation} animate="animate">
                    {isSidebarOpen && <p className="sidebar__shopList__name">Shop One Name</p>}
                    <motion.button
                        type="button"
                        className="sidebar__shopListBtn"
                        onClick={handleSelectStore}
                        variants={shopListButtonAnimation}
                        animate="animate"
                    >
                        {selectStore
                            ? <ArrowLeftIcon
                                style={{color: "var(--colorBlack)", fontSize: "30px"}}
                            />
                            : <StoreIcon
                                style={{color: "var(--colorBlack)", fontSize: "30px"}}
                            />
                        }
                    </motion.button>
                </motion.div>
            </div>
            <div className="sidebar__optionsList">
                {isSidebarOpen && <p className="sidebar__optionsList__title">Store Options</p>}
                {optionsData.map((option, index) =>
                    <motion.div
                        key={option.id + index}
                        className="sidebar__option"
                        variants={sidebarOptionAnimation}
                        animate="animate"
                        whileTap={{
                            scale: 1,
                        }}
                        whileHover={{
                            background: "var(--backgroundGradient03)",
                            scale: 1.05,
                        }}
                        onClick={() => handleOptionNavigate(option.url)}
                    >
                        {option.icon}
                        {isSidebarOpen && <p>{option.optionName}</p>}
                    </motion.div>
                )}
            </div>
            <div className="sidebar__settingOptions">
                {isSidebarOpen && <p className="sidebar__settingOptions__title">Store Setting</p>}
                <motion.div
                    className="sidebar__option"
                    variants={sidebarOptionAnimation}
                    animate="animate"
                    whileTap={{scale: 1,}}
                    whileHover={{
                        background: "var(--backgroundGradient03)",
                        scale: 1.05,
                    }}
                    onClick={() => handleOptionNavigate("setting")}
                >
                    <SettingsRoundedIcon/>
                    {isSidebarOpen && <p>Setting</p>}
                </motion.div>
                <div className="sidebar__settingOptions__btnContainer"
                     style={{flexDirection: isSidebarOpen ? "row" : "column"}}>
                    <motion.button
                        type="button"
                        className="sidebar__settingOptions__btn"
                        onClick={() => handleOptionNavigate("login")}
                        variants={settingOptionsAnimation}
                        animate="animate"
                        whileTap={{
                            scale: 1,
                        }}
                        whileHover={{
                            background: "var(--backgroundGradient03)",
                            scale: 1.05,
                        }}
                    >
                        <LogoutRoundedIcon/> {isSidebarOpen && "Logout"}
                    </motion.button>
                    <motion.button
                        type="button"
                        className="sidebar__settingOptions__btn"
                        onClick={handleTheme}
                        variants={settingOptionsAnimation}
                        animate="animate"
                        whileTap={{
                            scale: 1,
                        }}
                        whileHover={{
                            background: "var(--backgroundGradient03)",
                            scale: 1.05,
                        }}
                    >
                        {isDark ? <ModeNightRoundedIcon/> : <LightModeRoundedIcon/>}
                        {isSidebarOpen && (isDark ? "Dark Mode" : "Light Mode")}
                    </motion.button>
                </div>
            </div>
        </motion.aside>
    );
}

export default Sidebar;