import './actionTab.css';

import {NodeDataType, TreeDataType} from "../../type/type";
import {createOptionTree} from "../../utils/utils";

import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {motion} from 'framer-motion';

const billingActionTab: NodeDataType[] = [
    {parentId: null, nodeId: 0, optionData: "Billing", action: null},
    {parentId: 0, nodeId: 1, optionData: "Orders", action: null},
    {parentId: 0, nodeId: 2, optionData: "Invoice", action: null},
    {parentId: 0, nodeId: 3, optionData: "Advance", action: null},
    {parentId: 1, nodeId: 4, optionData: "Create Order", action: null},
    {parentId: 1, nodeId: 5, optionData: "View Orders", action: null},
    {parentId: 1, nodeId: 6, optionData: "Edit Order", action: null},
    {parentId: 1, nodeId: 7, optionData: "Cancel Order", action: null},
    {parentId: 1, nodeId: 8, optionData: "Mark Order Fulfilled", action: null},
    {parentId: 2, nodeId: 9, optionData: "Generate Invoice", action: null},
    {parentId: 3, nodeId: 10, optionData: "Track Order", action: null},
    {parentId: 3, nodeId: 11, optionData: "Print Packing Slip", action: null},
    {parentId: 3, nodeId: 12, optionData: "Print Shipping label", action: null},
    {parentId: 3, nodeId: 13, optionData: "Return Management", action: null},
    {parentId: 3, nodeId: 14, optionData: "Order History", action: null},
    {parentId: 3, nodeId: 15, optionData: "Export Order", action: null},
    {parentId: 13, nodeId: 16, optionData: "Create Return Order", action: null},
    {parentId: 13, nodeId: 17, optionData: "View Return Orders", action: null},
    {parentId: 13, nodeId: 18, optionData: "Edit Return Order", action: null},
];

const ActionTab = () => {
    const actionTabState = useSelector((state: any) => state.actionTabSlice);

    const [optionTree, setOptionTree] = useState<TreeDataType | null>(null);
    const [openSubOption, setOpenSubOption] = useState<number | null>(null);
    const [openSubSubOption, setOpenSubSubOption] = useState<number | null>(null);

    const handleGetOptionTree = () => {
        if (actionTabState.billingActions) setOptionTree(createOptionTree(billingActionTab));
        else if (actionTabState.inventoryActions) setOptionTree(createOptionTree(billingActionTab));
        else if (actionTabState.employeeAction) setOptionTree(createOptionTree(billingActionTab));
        else if (actionTabState.calendarActions) setOptionTree(createOptionTree(billingActionTab));
        else if (actionTabState.paymentActions) setOptionTree(createOptionTree(billingActionTab));
        else setOptionTree(null);
    };

    useEffect(() => {
        handleGetOptionTree();
    }, [actionTabState]);

    const handleOptionAction = (childrenLength: number, action: (() => void) | null): void => {
        if (childrenLength > 0) return;
        if (action) action();
    };

    return <nav
        className="actionTab"
        onMouseLeave={() => {
            setOpenSubOption(null);
            setOpenSubSubOption(null);
        }}
    >
        <h2 className="actionTab__actionTitle">{optionTree?.optionData}</h2>
        <ul className="actionTab__mainOptionList">
            {optionTree?.children.map((value, index) => {
                return <li
                    key={value.nodeId + index}
                    className="actionTab__mainOptions"
                >
                    <button
                        type="button"
                        className="actionTab__mainOptionBtn"
                        onMouseOver={() => setOpenSubOption(index)}
                        onClick={() => handleOptionAction(value.children.length, value.action)}
                        style={{background: openSubOption === index ? "var(--colorWhite)" : "var(--colorTransparent)"}}
                    >
                        {value.optionData}
                    </button>
                    {openSubOption === index &&
                        value.children.length > 0 &&
                        <motion.ul
                            className="actionTab__subOptionList"
                            onMouseOver={() => setOpenSubOption(index)}
                            onMouseLeave={() => setOpenSubOption(null)}
                            initial={{opacity: 0,}}
                            animate={{opacity: 1,}}
                            transition={{duration: 0.15}}
                        >
                            {value.children.map((value, index) => <li key={value.nodeId + index}>
                                    <button
                                        type="button"
                                        className="actionTab__subOptions"
                                        onClick={() => handleOptionAction(value.children.length, value.action)}
                                        onMouseOver={() => setOpenSubSubOption(index)}
                                    >
                                        {value.optionData}
                                        {value.children.length > 0 && <ArrowRightIcon/>}
                                    </button>
                                    {openSubSubOption === index &&
                                        value.children.length > 0 &&
                                        <motion.ul
                                            className="actionTab__subSubOptionList"
                                            onMouseOver={() => setOpenSubSubOption(index)}
                                            onMouseLeave={() => setOpenSubSubOption(null)}
                                            initial={{opacity: 0,}}
                                            animate={{opacity: 1,}}
                                            transition={{duration: 0.15}}
                                        >
                                            {value.children.map((value, index) => <li key={value.nodeId + index}>
                                                <button
                                                    type="button"
                                                    className="actionTab__subOptions"
                                                    onClick={() => handleOptionAction(value.children.length, value.action)}
                                                >
                                                    {value.optionData}
                                                </button>
                                            </li>)}
                                        </motion.ul>}
                                </li>
                            )}
                        </motion.ul>}
                </li>
            })}
        </ul>
    </nav>
}

export default ActionTab;