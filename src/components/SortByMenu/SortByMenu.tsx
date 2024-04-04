import './sortByMenu.css';

import SortIcon from '@mui/icons-material/Sort';
import CheckIcon from '@mui/icons-material/Check';

import {SortOptionType} from "../../type/type";
import {useState} from "react";
import {motion} from 'framer-motion';

const iconStyle = {
    margin: "0 10px 0 0",
    fontSize: "18px",
    fontWeight: "500",
};

const checkIconStyle = {
    fontSize: "16px",
}

type SortOptionsProp = {
    sortOptionData: SortOptionType[];
}

const SortByMenu = ({sortOptionData}: SortOptionsProp) => {

    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [selectSortOptionIndex, setSelectSortOptionIndex] = useState<number | null>(null);
    const [selectOrderOptionIndex, setSelectOrderOptionIndex] = useState<number | null>(null);

    const handleSortAction = (index: null | number, sortAction: (() => void) | null) => {
        setSelectSortOptionIndex(index);
        if (sortAction) sortAction();
    };

    const handleOrderAction = (index: null | number, orderAction: (() => void) | null) => {
        setSelectOrderOptionIndex(index);
        if (orderAction) orderAction();
    };

    return <div className="sortByMenu__container">
        <button type="button" className="sortByMenu__btn" onClick={() => setShowMenu(!showMenu)}>
            <SortIcon style={iconStyle}/>
            Sort by
        </button>
        {showMenu && <motion.div
            className="sortByMenu"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.15}}
        >
            <section className="sortByMenu__sortOptions">
                {sortOptionData.map((value: SortOptionType, index: number) => <button
                    key={index}
                    type="button"
                    className="sortByMenu__sortOptionBtn"
                    onClick={() => handleSortAction(index, value.sortAction)}
                >
                    <span className="sortByMenu__sortOptions__iconContainer">
                        {selectSortOptionIndex === index && <CheckIcon style={checkIconStyle}/>}
                    </span>
                    {value.sortOption}
                </button>)}
            </section>
            <div className="sortByMenu__separate"/>
            <section className="sortByMenu__orderOptions">
                <button
                    type="button"
                    className="sortByMenu__orderOptionBtn"
                    onClick={() => handleOrderAction(1, null)}
                >
                     <span className="sortByMenu__sortOptions__iconContainer">
                        {selectOrderOptionIndex === 1 && <CheckIcon style={checkIconStyle}/>}
                    </span>
                    Ascending
                </button>
                <button
                    type="button"
                    className="sortByMenu__orderOptionBtn"
                    onClick={() => handleOrderAction(2, null)}
                >
                     <span className="sortByMenu__sortOptions__iconContainer">
                        {selectOrderOptionIndex === 2 && <CheckIcon style={checkIconStyle}/>}
                    </span>
                    Descending
                </button>
            </section>
        </motion.div>}
    </div>
}

export default SortByMenu;