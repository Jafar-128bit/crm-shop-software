import './sidebar.css';

import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import BadgeIcon from '@mui/icons-material/Badge';
import PaymentIcon from '@mui/icons-material/Payment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SupportIcon from '@mui/icons-material/Support';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

import {useState} from "react";
import type {JSX} from 'react';
import {motion} from "framer-motion";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import userProfilePicture from "../../assets/image/userProfilePicture.jpeg";
import {toggleAction} from "../../store/slices/actionTabSlices";

const Sidebar = (): JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isImageHover, setIsImageHover] = useState<boolean>(false);
    // const sidebar = useSelector((state: any) => state.menuSlice.sidebarState);

    const [selectStore, setSelectStore] = useState<boolean>(false);
    const [isDark, setIsDark] = useState<boolean>(false);
    const handleSelectStore = (): void => setSelectStore(!selectStore);
    const handleTheme = (): void => setIsDark(!isDark);
    const handleOptionNavigate = (url: string): void => navigate(url);
    const handleActivateActionTab = (url: string) => {
        dispatch(toggleAction(url));
    }

    interface IconStyle {
        color: string;
        fontSize: string;
    }

    const iconStyle: IconStyle = {
        color: "var(--colorBlack)",
        fontSize: "20px",
    }

    interface OptionsData {
        id: number;
        optionName: string;
        url: string;
        icon: JSX.Element;
    }

    const optionsData: OptionsData[] = [
        {id: 1, optionName: "Dashboard", url: "", icon: <SpaceDashboardIcon style={iconStyle}/>,},
        {id: 2, optionName: "Billing", url: "billing", icon: <ReceiptLongIcon style={iconStyle}/>,},
        {id: 3, optionName: "Inventory", url: "inventory", icon: <Inventory2Icon style={iconStyle}/>,},
        {id: 4, optionName: "Analytics", url: "analytics", icon: <AnalyticsIcon style={iconStyle}/>,},
        {id: 5, optionName: "Employee", url: "employee", icon: <BadgeIcon style={iconStyle}/>,},
        {id: 6, optionName: "Accounting", url: "accounting", icon: <PaymentIcon style={iconStyle}/>,},
        {id: 7, optionName: "Calendar", url: "calendar", icon: <CalendarMonthIcon style={iconStyle}/>,},
        {id: 8, optionName: "Shipping", url: "shipping", icon: <LocalShippingIcon style={iconStyle}/>,},
        {id: 9, optionName: "Help & Support", url: "help&support", icon: <SupportIcon style={iconStyle}/>,},
    ];

    return (
        <aside className="sidebar noScroll">
            <div className="sidebar__userContainer">
                <div
                    className="sidebar__imageContainer"
                    onClick={() => {
                        handleOptionNavigate("employee");
                        handleActivateActionTab("employee");
                    }}
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
                <div className="sidebar__userInfoContainer">
                    <p
                        className="sidebar__userName"
                        onClick={() => {
                            handleOptionNavigate("employee");
                            handleActivateActionTab("employee");
                        }}
                    >
                        John Watson
                    </p>
                    <p
                        className="sidebar__userEmail"
                        onClick={() => {
                            handleOptionNavigate("employee");
                            handleActivateActionTab("employee");
                        }}
                    >
                        johnwatson99@gmail.com
                    </p>
                </div>
            </div>
            <div className="sidebar__shopListContainer">
                <p className="sidebar__shopListContainer__title">
                    Select Store
                </p>
                <div className="sidebar__shopList">
                    <p className="sidebar__shopList__name">Shop One Name</p>
                    <button
                        type="button"
                        className="sidebar__shopListBtn"
                        onClick={handleSelectStore}
                    >
                        {selectStore
                            ? <ArrowDropUpIcon
                                style={{color: "var(--colorBlack)", fontSize: "30px"}}
                            />
                            : <ArrowDropDownIcon
                                style={{color: "var(--colorBlack)", fontSize: "30px"}}
                            />
                        }
                    </button>
                </div>
            </div>
            <div className="sidebar__optionsList">
                <p className="sidebar__optionsList__title">Store Options</p>
                {optionsData.map((option, index) =>
                    <motion.div
                        key={option.id + index}
                        className="sidebar__option"
                        whileTap={{
                            scale: 1,
                        }}
                        whileHover={{
                            background: "var(--backgroundGradient03)",
                            scale: 1.05,
                        }}
                        onClick={() => {
                            handleOptionNavigate(option.url);
                            handleActivateActionTab(option.url);
                        }}
                    >
                        {option.icon}
                        <p>{option.optionName}</p>
                    </motion.div>
                )}
            </div>
            <div className="sidebar__settingOptions">
                <p className="sidebar__settingOptions__title">Store Setting</p>
                <motion.div
                    className="sidebar__option"
                    whileTap={{scale: 1,}}
                    whileHover={{
                        background: "var(--backgroundGradient03)",
                        scale: 1.05,
                    }}
                    onClick={() => {
                        handleOptionNavigate("setting");
                        handleActivateActionTab("setting");
                    }}
                >
                    <SettingsRoundedIcon/>
                    <p>Setting</p>
                </motion.div>
                <div className="sidebar__settingOptions__btnContainer">
                    <button
                        type="button"
                        className="sidebar__settingOptions__btn"
                        onClick={() => {
                            handleOptionNavigate("login");
                            handleActivateActionTab("login");
                        }}
                    >
                        <LogoutRoundedIcon/> Logout
                    </button>
                    <button
                        type="button"
                        className="sidebar__settingOptions__btn"
                        onClick={handleTheme}
                    >
                        {isDark ? <ModeNightRoundedIcon/> : <LightModeRoundedIcon/>}
                        {isDark ? "Dark Mode" : "Light Mode"}
                    </button>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;