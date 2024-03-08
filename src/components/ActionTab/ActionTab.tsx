import './actionTab.css';

import {NodeDataType, TreeDataType} from "../../type/type";
import {createOptionTree} from "../../utils/utils";

import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {motion} from 'framer-motion';
import {
    executeBillingAction,
    executeInventoryAction,
    executeEmployeeAction,
    executeAccountingAction,
    executeCalendarAction
} from "../../store/slices/actionTabFunctionSlices";

const ActionTab = () => {
    const actionTabState = useSelector((state: any) => state.actionTabSlice);
    const dispatch = useDispatch();

    /* Action Tab Function List */
    const calendarFunctionData = {
        viewTabFunction: (actionFlag: "day" | "week" | "month" | "year"): void | null => {
            dispatch(executeCalendarAction({actionName: "viewAction", actionOption: actionFlag,}));
        },
        taskTabFunction: (actionFlag: "add" | "edit" | "remove" | "viewTask" | null): void => {
            dispatch(executeCalendarAction({actionName: "taskAction", actionOption: actionFlag,}));
        },
        reminderTabFunction: (actionFlag: "add" | "delete" | null): void => {
            dispatch(executeCalendarAction({actionName: "reminderAction", actionOption: actionFlag,}));
        },
        eventTabFunction: (actionFlag: "add" | "edit" | "delete" | "view" | null): void => {
            dispatch(executeCalendarAction({actionName: "eventAction", actionOption: actionFlag,}));
        }
    };

    /* Action Tab Data */
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
    const inventoryActionTab: NodeDataType[] = [
        {parentId: null, nodeId: 0, optionData: "Inventory", action: null},
        {parentId: 0, nodeId: 1, optionData: "Inventory", action: null},
        {parentId: 0, nodeId: 2, optionData: "Batch", action: null},
        {parentId: 0, nodeId: 3, optionData: "Product", action: null},
        {parentId: 0, nodeId: 4, optionData: "Supplier", action: null},
        {parentId: 0, nodeId: 5, optionData: "Purchase Order", action: null},

        {parentId: 1, nodeId: 6, optionData: "Create New Inventory", action: null},
        {parentId: 1, nodeId: 7, optionData: "Edit Inventory", action: null},
        {parentId: 1, nodeId: 8, optionData: "Close Inventory", action: null},

        {parentId: 2, nodeId: 9, optionData: "Add Batch", action: null},
        {parentId: 2, nodeId: 10, optionData: "Edit Batch", action: null},
        {parentId: 2, nodeId: 11, optionData: "Delete Batch", action: null},
        {parentId: 2, nodeId: 12, optionData: "View all Batch", action: null},

        {parentId: 3, nodeId: 13, optionData: "Add New Product", action: null},
        {parentId: 3, nodeId: 14, optionData: "Edit Product", action: null},
        {parentId: 3, nodeId: 15, optionData: "Deactivate Product", action: null},
        {parentId: 3, nodeId: 16, optionData: "Product Categories", action: null},
        {parentId: 3, nodeId: 17, optionData: "View All Product", action: null},

        {parentId: 16, nodeId: 18, optionData: "Create New Category", action: null},
        {parentId: 16, nodeId: 19, optionData: "Edit Category", action: null},
        {parentId: 16, nodeId: 19, optionData: "Delete Category", action: null},
        {parentId: 16, nodeId: 19, optionData: "View Category List", action: null},

        {parentId: 4, nodeId: 20, optionData: "Add New Supplier", action: null},
        {parentId: 4, nodeId: 21, optionData: "Edit Supplier", action: null},
        {parentId: 4, nodeId: 22, optionData: "Deactivate Supplier", action: null},

        {parentId: 5, nodeId: 23, optionData: "Create Purchase Order", action: null},
        {parentId: 5, nodeId: 24, optionData: "Edit Purchase Order", action: null},
        {parentId: 5, nodeId: 25, optionData: "View Purchase Order", action: null},
        {parentId: 5, nodeId: 26, optionData: "Return Management", action: null},

        {parentId: 26, nodeId: 27, optionData: "Create Return Order", action: null},
        {parentId: 26, nodeId: 27, optionData: "Edit Return Order", action: null},
        {parentId: 26, nodeId: 28, optionData: "Delete Return Order", action: null},
    ];
    const employeeActionTab: NodeDataType[] = [
        {parentId: null, nodeId: 0, optionData: "Employee", action: null},
        {parentId: 0, nodeId: 1, optionData: "Manage Employee", action: null},
        {parentId: 0, nodeId: 2, optionData: "Attendance", action: null},
        {parentId: 0, nodeId: 3, optionData: "Leave Management", action: null},
        {parentId: 0, nodeId: 4, optionData: "Payroll & Salary", action: null},

        {parentId: 1, nodeId: 5, optionData: "Add New Employee", action: null},
        {parentId: 1, nodeId: 5, optionData: "Edit Employee Data", action: null},
        {parentId: 1, nodeId: 5, optionData: "Deactivate Employee", action: null},
        {parentId: 1, nodeId: 5, optionData: "Manage User Permission", action: null},

        {parentId: 2, nodeId: 6, optionData: "Take Attendance", action: null},
        {parentId: 2, nodeId: 7, optionData: "Attendance Report", action: null},

        {parentId: 3, nodeId: 8, optionData: "Submit Leave Request", action: null},
        {parentId: 3, nodeId: 8, optionData: "Leave Application History", action: null},
        {parentId: 3, nodeId: 9, optionData: "View Leave Report", action: null},

        {parentId: 4, nodeId: 9, optionData: "Assign New Salary", action: null},
        {parentId: 4, nodeId: 10, optionData: "Edit Salary Data", action: null},
        {parentId: 4, nodeId: 11, optionData: "Generate Payslip", action: null},
        {parentId: 4, nodeId: 12, optionData: "View Salary Data", action: null},
    ];
    const calendarActionTab: NodeDataType[] = [
        {parentId: null, nodeId: 0, optionData: "Calendar", action: null},
        {parentId: 0, nodeId: 1, optionData: "Calendar View", action: null},
        {parentId: 0, nodeId: 2, optionData: "Task", action: null},
        {parentId: 0, nodeId: 3, optionData: "Reminder", action: null},
        {parentId: 0, nodeId: 4, optionData: "Event", action: null},

        {parentId: 1, nodeId: 6, optionData: "Day View", action: () => calendarFunctionData.viewTabFunction("day")},
        {parentId: 1, nodeId: 7, optionData: "Week View", action: () => calendarFunctionData.viewTabFunction("week")},
        {parentId: 1, nodeId: 8, optionData: "Month View", action: () => calendarFunctionData.viewTabFunction("month")},
        {parentId: 1, nodeId: 9, optionData: "Year View", action: () => calendarFunctionData.viewTabFunction("year")},

        {parentId: 2, nodeId: 10, optionData: "Add New Task", action: () => calendarFunctionData.taskTabFunction("add")},
        {parentId: 2, nodeId: 11, optionData: "Edit Task", action: () => calendarFunctionData.taskTabFunction("edit")},
        {parentId: 2, nodeId: 12, optionData: "Remove Task", action: () => calendarFunctionData.taskTabFunction("remove")},
        {parentId: 2, nodeId: 13, optionData: "View Task List", action: () => calendarFunctionData.taskTabFunction("viewTask")},

        {parentId: 3, nodeId: 14, optionData: "Add Reminder", action: () => calendarFunctionData.reminderTabFunction("add")},
        {parentId: 3, nodeId: 15, optionData: "Delete Reminder", action: () => calendarFunctionData.reminderTabFunction("delete")},

        {parentId: 4, nodeId: 16, optionData: "Add New Event", action: () => calendarFunctionData.eventTabFunction("add")},
        {parentId: 4, nodeId: 17, optionData: "Edit Event", action: () => calendarFunctionData.eventTabFunction("edit")},
        {parentId: 4, nodeId: 18, optionData: "Delete Event", action: () => calendarFunctionData.eventTabFunction("delete")},
        {parentId: 4, nodeId: 19, optionData: "View All Events", action: () => calendarFunctionData.eventTabFunction("view")},
    ];
    const accountingActionTab: NodeDataType[] = [
        {parentId: null, nodeId: 0, optionData: "Accounting", action: null},
        {parentId: 0, nodeId: 1, optionData: "Accounts", action: null},
        {parentId: 0, nodeId: 2, optionData: "Accounts Receivable", action: null},
        {parentId: 0, nodeId: 3, optionData: "Accounts Payable", action: null},
        {parentId: 0, nodeId: 4, optionData: "Generate Reports", action: null},

        {parentId: 1, nodeId: 5, optionData: "View All Accounts", action: null},
        {parentId: 1, nodeId: 6, optionData: "Cash Account", action: null},
        {parentId: 1, nodeId: 7, optionData: "Bank Account", action: null},
        {parentId: 1, nodeId: 8, optionData: "Sales Account", action: null},
        {parentId: 1, nodeId: 9, optionData: "Purchase Account", action: null},
        {parentId: 1, nodeId: 10, optionData: "Expense Account", action: null},
        {parentId: 1, nodeId: 11, optionData: "Fixed Assets Account", action: null},

        {parentId: 10, nodeId: 12, optionData: "Indirect Expense Account", action: null},
        {parentId: 10, nodeId: 13, optionData: "Direct Expense Account", action: null},

        {parentId: 2, nodeId: 14, optionData: "Create Invoices", action: null},
        {parentId: 2, nodeId: 15, optionData: "Customer Management", action: null},
        {parentId: 2, nodeId: 16, optionData: "View Outstanding Invoices", action: null},
        {parentId: 2, nodeId: 17, optionData: "Send Payment Reminders", action: null},

        {parentId: 15, nodeId: 18, optionData: "Create New Customer", action: null},
        {parentId: 15, nodeId: 19, optionData: "Edit Customer", action: null},
        {parentId: 15, nodeId: 20, optionData: "Deactivate Customer", action: null},
        {parentId: 15, nodeId: 21, optionData: "View all Customers", action: null},

        {parentId: 3, nodeId: 22, optionData: "View Outstanding Bills", action: null},
        {parentId: 3, nodeId: 23, optionData: "Schedule Payments", action: null},
        {parentId: 3, nodeId: 24, optionData: "Supplier Management", action: null},

        {parentId: 24, nodeId: 25, optionData: "Add New Supplier", action: null},
        {parentId: 24, nodeId: 26, optionData: "Edit Supplier", action: null},
        {parentId: 24, nodeId: 27, optionData: "Deactivate Supplier", action: null},

        {parentId: 4, nodeId: 28, optionData: "Balance Sheet", action: null},
        {parentId: 4, nodeId: 29, optionData: "Income Statement", action: null},
        {parentId: 4, nodeId: 30, optionData: "Cash Flow Statement", action: null},
    ];

    const [optionTree, setOptionTree] = useState<TreeDataType | null>(null);
    const [openSubOption, setOpenSubOption] = useState<number | null>(null);
    const [openSubSubOption, setOpenSubSubOption] = useState<number | null>(null);

    const handleGetOptionTree = () => {
        if (actionTabState.billingActions) setOptionTree(createOptionTree(billingActionTab));
        else if (actionTabState.inventoryActions) setOptionTree(createOptionTree(inventoryActionTab));
        else if (actionTabState.employeeAction) setOptionTree(createOptionTree(employeeActionTab));
        else if (actionTabState.calendarActions) setOptionTree(createOptionTree(calendarActionTab));
        else if (actionTabState.accountingActions) setOptionTree(createOptionTree(accountingActionTab));
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
                        style={{
                            background: openSubOption === index ? "var(--color01)" : "var(--colorWhite)",
                            color: openSubOption === index ? "var(--colorWhite)" : "var(--colorBlack)",
                        }}
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
                                                    className="actionTab__subSubOptions"
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