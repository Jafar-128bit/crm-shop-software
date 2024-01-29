import './sidebar.css';

import logo from "../../assets/logo/logoNormal.svg";

import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import BookIcon from '@mui/icons-material/Book';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SupportIcon from '@mui/icons-material/Support';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

import {useState} from "react";
import type {JSX} from 'react';
import {motion} from "framer-motion";
// import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const Sidebar = (): JSX.Element => {
    const navigate = useNavigate();
    // const sidebar = useSelector((state: any) => state.menuSlice.sidebarState);

    const [selectStore, setSelectStore] = useState<boolean>(false);
    const [isDark, setIsDark] = useState<boolean>(false);
    const handleSelectStore = (): void => setSelectStore(!selectStore);
    const handleTheme = (): void => setIsDark(!isDark);
    const handleOptionNavigate = (url: string): void => navigate(url);

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
        {id: 0, optionName: "Dashboard", url: "", icon: <SpaceDashboardIcon style={iconStyle}/>,},
        {id: 1, optionName: "Billing", url: "billing", icon: <ReceiptLongIcon style={iconStyle}/>,},
        {id: 2, optionName: "Orders", url: "orders", icon: <ShoppingCartIcon style={iconStyle}/>,},
        {id: 3, optionName: "Products", url: "products", icon: <Inventory2Icon style={iconStyle}/>,},
        {id: 4, optionName: "Analytics", url: "analytics", icon: <AnalyticsIcon style={iconStyle}/>,},
        {id: 5, optionName: "Users", url: "users", icon: <SupervisedUserCircleIcon style={iconStyle}/>,},
        {id: 6, optionName: "Reservation", url: "reservation", icon: <BookIcon style={iconStyle}/>,},
        {id: 7, optionName: "Delivery", url: "delivery", icon: <DeliveryDiningIcon style={iconStyle}/>,},
        {id: 8, optionName: "Shipping", url: "shipping", icon: <LocalShippingIcon style={iconStyle}/>,},
        {id: 9, optionName: "Help & Support", url: "help&support", icon: <SupportIcon style={iconStyle}/>,},
    ];

    return (
        <aside className="sidebar noScroll">
            <div className="sidebar__logoContainer">
                <div className="sidebar__logoContainer__logo">
                    <img src={logo} alt="store sync pro logo"/>
                </div>
                <button type="button" className="sidebar__logoContainer__menuButton">
                    <MenuIcon style={{
                        fontSize: "28px",
                        color: "var(--colorWhite)",
                    }}/>
                </button>
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
                        onClick={() => handleOptionNavigate(option.url)}
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
                    onClick={() => handleOptionNavigate("setting")}
                >
                    <SettingsRoundedIcon/>
                    <p>Setting</p>
                </motion.div>
                <div className="sidebar__settingOptions__btnContainer">
                    <button
                        type="button"
                        className="sidebar__settingOptions__btn"
                        onClick={() => handleOptionNavigate("/login")}
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