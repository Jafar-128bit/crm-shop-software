import './menu.css';

import {JSX} from "react";
import CloseIcon from "@mui/icons-material/Close";
import {motion} from 'framer-motion';

type PropMenuType = {
    children: JSX.Element,
    closeFunction: (() => void),
    menuTitle: string,
    menuHeight: number,
};

const Menu = ({children, closeFunction, menuTitle, menuHeight = 600}: PropMenuType): JSX.Element => {
    return <motion.section
        className="menu"
        style={{height: `${menuHeight}%`}}
        initial={{display: "none", opacity: 0}}
        animate={{display: "", opacity: 1}}
    >
        <div className="menu__topBar">
            <p className="menu__topBar__title">{menuTitle}</p>
            <button className="menu__closeBtn" onClick={closeFunction}>
                <CloseIcon/>
            </button>
        </div>
        <section className="menu__menuSection">
            {children}
        </section>
    </motion.section>
}

export default Menu;