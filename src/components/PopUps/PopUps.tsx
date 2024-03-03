import './popUps.css';

import {useSelector} from "react-redux";
import {motion} from 'framer-motion';

const PopUps = () => {
    const PopUpScreen = useSelector((state: any) => state.popUpSlice).PopUpScreen;

    return <motion.div
        className="popups"
        initial={{zIndex: -2, opacity: 0}}
        animate={{zIndex: !PopUpScreen ? -2 : 80, opacity: !PopUpScreen ? 0 : 1}}
    />
};

export default PopUps;