import './actionTab.css';

import {NodeDataType, TreeDataType} from "../../type/type";
import {createOptionTree} from "../../utils/utils";

import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {motion} from 'framer-motion';
import {toggleMenuState} from "../../store/slices/menuSlices";
import {useNavigate, useLocation} from "react-router-dom";

type InventoryViewType = "viewInventoryList"
    | "viewBatchList"
    | "viewProductList"
    | "viewSupplierList"
    | "viewPurchaseOrder"
    | "viewReturnPurchaseOrder"
    | "addProduct"
    | "createPurchaseOrder"
    | "createReturnPurchaseOrder";

type InventoryMenuType = "createInventory"
    | "createBatch"
    | "createProductCategory"
    | "viewProductCategories"
    | "createSupplier";

type CalendarMenuType = "addTask" | "addReminder" | "addEvent" | "viewTask" | "viewReminder" | "viewEvent";
type CalendarViewType = "dayView" | "weekView" | "monthView" | "yearView";

const ActionTab = () => {
    const actionTabState = useSelector((state: any) => state.actionTabSlice);
    const location = useLocation().pathname.split('/')[1];

    const dispatch = useDispatch();
    const navigate = useNavigate();

    /* Billing Tab Function List */
    const billingFunctionData = {
        menuAction: (): void => {},
        viewAction: (): void => {}
    };
    /* Inventory Tab Function List */
    const inventoryFunctionData = {
        menuAction: (menu: InventoryMenuType): void => {
            switch (menu) {
                case "createInventory":
                    dispatch(toggleMenuState({actionState: true, optionName: "CREATE_INVENTORY"}));
                    break;
                case "createBatch":
                    dispatch(toggleMenuState({actionState: true, optionName: "CREATE_BATCH"}));
                    break;
                case "createProductCategory":
                    dispatch(toggleMenuState({actionState: true, optionName: "CREATE_PRODUCT_CATEGORY"}));
                    break;
                case "viewProductCategories":
                    dispatch(toggleMenuState({actionState: true, optionName: "VIEW_PRODUCT_CATEGORIES"}));
                    break;
                case "createSupplier":
                    dispatch(toggleMenuState({actionState: true, optionName: "CREATE_SUPPLIER"}));
                    break;
                default:
                    break;
            }
        },
        viewAction: (view: InventoryViewType): void => {
            switch (view) {
                case "viewInventoryList":
                    navigate("/inventory/inventory-list");
                    break;
                case "viewBatchList":
                    navigate("/inventory/batches");
                    break;
                case "viewProductList":
                    navigate("/inventory/products");
                    break;
                case "viewSupplierList":
                    navigate("/inventory/suppliers");
                    break;
                case "viewPurchaseOrder":
                    navigate("/inventory/purchase-order");
                    break;
                case "viewReturnPurchaseOrder":
                    navigate("/inventory/return-purchase-order");
                    break;
                case "addProduct":
                    navigate("/inventory/add-products");
                    break;
                case "createPurchaseOrder":
                    navigate("/inventory/create-purchase-order");
                    break;
                case "createReturnPurchaseOrder":
                    navigate("/inventory/create-return-purchase-order");
                    break;
                default:
                    break;
            }
        }
    };
    /* Employee Tab Function List */
    const employeeFunctionData = {

    };
    /* Accounting Tab Function List */
    const accountingFunctionData = {

    };
    /* Action Tab Function List */
    const calendarFunctionData = {
       menuAction: (menu: CalendarMenuType): void => {
           switch (menu) {
               case "addTask":
                   dispatch(toggleMenuState({actionState: true, optionName:"CREATE_TASK"}))
                   break;
               case "addReminder":
                   dispatch(toggleMenuState({actionState: true, optionName:"CREATE_REMINDER"}))
                   break;
               case "addEvent":
                   dispatch(toggleMenuState({actionState: true, optionName:"CREATE_EVENT"}))
                   break;
               case "viewTask":
                   dispatch(toggleMenuState({actionState: true, optionName:"VIEW_TASK"}))
                   break;
               case "viewReminder":
                   dispatch(toggleMenuState({actionState: true, optionName:"VIEW_REMINDER"}))
                   break;
               case "viewEvent":
                   dispatch(toggleMenuState({actionState: true, optionName:"VIEW_EVENT"}))
                   break;
               default:
                   break;
           }
       },
       viewAction: (view: CalendarViewType): void => {
           switch (view) {
               case "dayView":
                   navigate("/calendar");
                   break;
               case "weekView":
                   navigate("/calendar/week");
                   break;
               case "monthView":
                   navigate("/calendar/month");
                   break;
               case "yearView":
                   navigate("/calendar/year");
                   break;
               default:
                   break;
           }
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
        {parentId: 1, nodeId: 6, optionData: "Mark Order Fulfilled", action: null},

        {parentId: 2, nodeId: 7, optionData: "Generate Invoice", action: null},

        {parentId: 3, nodeId: 8, optionData: "Track Order", action: null},
        {parentId: 3, nodeId: 9, optionData: "Print Packing Slip", action: null},
        {parentId: 3, nodeId: 10, optionData: "Print Shipping label", action: null},
        {parentId: 3, nodeId: 11, optionData: "Return Management", action: null},
        {parentId: 3, nodeId: 12, optionData: "Order History", action: null},
        {parentId: 3, nodeId: 13, optionData: "Export Order", action: null},

        {parentId: 11, nodeId: 14, optionData: "Create Return Order", action: null},
        {parentId: 11, nodeId: 15, optionData: "View Return Orders", action: null},
    ];
    const inventoryActionTab: NodeDataType[] = [
        {parentId: null, nodeId: 0, optionData: "Inventory", action: null},
        {parentId: 0, nodeId: 1, optionData: "Inventory", action: null},
        {parentId: 0, nodeId: 2, optionData: "Batch", action: null},
        {parentId: 0, nodeId: 3, optionData: "Product", action: null},
        {parentId: 0, nodeId: 4, optionData: "Supplier", action: null},
        {parentId: 0, nodeId: 5, optionData: "Purchase Order", action: null},

        {parentId: 1, nodeId: 6, optionData: "Create New Inventory", action: () => inventoryFunctionData.menuAction("createInventory")},
        {parentId: 1, nodeId: 7, optionData: "View All Inventory", action: () => inventoryFunctionData.viewAction("viewInventoryList")},

        {parentId: 2, nodeId: 8, optionData: "Add Batch", action: () => inventoryFunctionData.menuAction("createBatch")},
        {parentId: 2, nodeId: 9, optionData: "View all Batch", action: () => inventoryFunctionData.viewAction("viewBatchList")},

        {parentId: 3, nodeId: 10, optionData: "Add New Product", action: () => inventoryFunctionData.viewAction("addProduct")},
        {parentId: 3, nodeId: 11, optionData: "Product Categories", action: null},
        {parentId: 3, nodeId: 12, optionData: "View All Product", action: () => inventoryFunctionData.viewAction("viewProductList")},

        {parentId: 11, nodeId: 13, optionData: "Create New Category", action: () => inventoryFunctionData.menuAction("createProductCategory")},
        {parentId: 11, nodeId: 14, optionData: "View Category List", action: () => inventoryFunctionData.menuAction("viewProductCategories")},

        {parentId: 4, nodeId: 15, optionData: "Add New Supplier", action: () => inventoryFunctionData.menuAction("createSupplier")},
        {parentId: 4, nodeId: 16, optionData: "View all Supplier", action: () => inventoryFunctionData.viewAction("viewSupplierList")},

        {parentId: 5, nodeId: 17, optionData: "Create Purchase Order", action: () => inventoryFunctionData.viewAction("createPurchaseOrder")},
        {parentId: 5, nodeId: 18, optionData: "View Purchase Order", action: () => inventoryFunctionData.viewAction("viewPurchaseOrder")},
        {parentId: 5, nodeId: 19, optionData: "Return Management", action: null},

        {parentId: 19, nodeId: 20, optionData: "Create Return Order", action: () => inventoryFunctionData.viewAction("createReturnPurchaseOrder")},
        {parentId: 19, nodeId: 21, optionData: "View All Return Order", action: () => inventoryFunctionData.viewAction("viewReturnPurchaseOrder")},
    ];
    const employeeActionTab: NodeDataType[] = [
        {parentId: null, nodeId: 0, optionData: "Employee", action: null},
        {parentId: 0, nodeId: 1, optionData: "Manage Employee", action: null},
        {parentId: 0, nodeId: 2, optionData: "Attendance", action: null},
        {parentId: 0, nodeId: 3, optionData: "Leave Management", action: null},
        {parentId: 0, nodeId: 4, optionData: "Payroll & Salary", action: null},

        {parentId: 1, nodeId: 5, optionData: "Add New Employee", action: null},
        {parentId: 1, nodeId: 6, optionData: "Manage User Permission", action: null},

        {parentId: 2, nodeId: 7, optionData: "Take Attendance", action: null},
        {parentId: 2, nodeId: 8, optionData: "View Attendance Report", action: null},

        {parentId: 3, nodeId: 9, optionData: "Submit Leave Request", action: null},
        {parentId: 3, nodeId: 10, optionData: "Leave Application History", action: null},
        {parentId: 3, nodeId: 11, optionData: "View Leave Report", action: null},

        {parentId: 4, nodeId: 12, optionData: "Assign New Salary", action: null},
        {parentId: 4, nodeId: 13, optionData: "View Salary Data", action: null},
        {parentId: 4, nodeId: 14, optionData: "Generate Payslip", action: null},
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
        {parentId: 15, nodeId: 19, optionData: "View all Customers", action: null},

        {parentId: 3, nodeId: 20, optionData: "View Outstanding Bills", action: null},
        {parentId: 3, nodeId: 21, optionData: "Schedule Payments", action: null},
        {parentId: 3, nodeId: 22, optionData: "View All Suppliers", action: null},

        {parentId: 4, nodeId: 23, optionData: "Balance Sheet", action: null},
        {parentId: 4, nodeId: 24, optionData: "Income Statement", action: null},
        {parentId: 4, nodeId: 25, optionData: "Cash Flow Statement", action: null},
    ];
    const calendarActionTab: NodeDataType[] = [
        {parentId: null, nodeId: 0, optionData: "Calendar", action: null},
        {parentId: 0, nodeId: 1, optionData: "Calendar View", action: null},
        {parentId: 0, nodeId: 2, optionData: "Task", action: null},
        {parentId: 0, nodeId: 3, optionData: "Reminder", action: null},
        {parentId: 0, nodeId: 4, optionData: "Event", action: null},

        {parentId: 1, nodeId: 6, optionData: "Day View", action: () => calendarFunctionData.viewAction("dayView")},
        {parentId: 1, nodeId: 7, optionData: "Week View", action: () => calendarFunctionData.viewAction("weekView")},
        {parentId: 1, nodeId: 8, optionData: "Month View", action: () => calendarFunctionData.viewAction("monthView")},
        {parentId: 1, nodeId: 9, optionData: "Year View", action: () => calendarFunctionData.viewAction("yearView")},

        {parentId: 2, nodeId: 10, optionData: "Add New Task", action: () => calendarFunctionData.menuAction("addTask")},
        {parentId: 2, nodeId: 11, optionData: "View All Task", action: () => calendarFunctionData.menuAction("viewTask")},

        {parentId: 3, nodeId: 12, optionData: "Add Reminder", action: () => calendarFunctionData.menuAction("addReminder")},
        {parentId: 3, nodeId: 13, optionData: "View All Reminders", action: () => calendarFunctionData.menuAction("viewReminder")},

        {parentId: 4, nodeId: 14, optionData: "Add New Event", action: () => calendarFunctionData.menuAction("addEvent")},
        {parentId: 4, nodeId: 15, optionData: "View All Events", action: () => calendarFunctionData.menuAction("viewEvent")},
    ];

    const [optionTree, setOptionTree] = useState<TreeDataType | null>(null);
    const [openSubOption, setOpenSubOption] = useState<number | null>(null);
    const [openSubSubOption, setOpenSubSubOption] = useState<number | null>(null);

    const handleGetOptionTree = () => {
        if (location === "billing") setOptionTree(createOptionTree(billingActionTab));
        else if (location === "inventory") setOptionTree(createOptionTree(inventoryActionTab));
        else if (location === "employee") setOptionTree(createOptionTree(employeeActionTab));
        else if (location === "accounting") setOptionTree(createOptionTree(accountingActionTab));
        else if (location === "calendar") setOptionTree(createOptionTree(calendarActionTab));
        else setOptionTree(null);
    };

    useEffect(() => {
        handleGetOptionTree();
    }, [location]);

    const handleOptionAction = (childrenLength: number, action: (() => void) | null): void => {
        if (childrenLength > 0) return;
        if (action) action();
    };

    //TODO: Make it dynamic level instead of hard coded level

    return <nav className="actionTab" onMouseLeave={() => {
        setOpenSubOption(null);
        setOpenSubSubOption(null);
    }}>
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