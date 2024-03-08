import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface BillingActionTabType {
    orderAction: "create" | "view" | "edit" | "cancel" | "markFulfilled" | null;
    invoiceAction: "generate" | null;
    advanceAction: "trackOrder" | "printPackingSlip" | "printShippingLabel" | "orderHistory" | "exportOrder" | null;
    returnAction: "create" | "view" | "edit" | null;
}
interface InventoryActionTabType {
    inventoryAction: "create" | "edit" | "close" | null;
    batchAction: "add" | "edit" | "delete" | "view" | null;
    productAction: "add" | "edit" | "deactivate" | "view" | null;
    productCategoriesAction: "create" | "edit" | "delete" | "view" | null;
    supplierAction: "add" | "edit" | "deactivate" | null;
    purchaseOrderAction: "create" | "edit" | "view" | null;
    returnAction: "create" | "edit" | "delete" | null;
}
interface EmployeeActionTabType {
    employeeAction: "add" | "edit" | "deactivate" | "manage" | null;
    attendanceAction: "take" | "report" | null;
    leaveAction: "submit" | "leave" | "view" | null;
    salaryAction: "assign" | "edit" | "generate" | "view" | null;
}
interface AccountingActionTabType {
    accountAction: "view" | "cash" | "bank" | "sales" | "purchase" | "fixed" | "indirect" | "direct" | null;
    accountsReceivable: "createInvoice" | "viewInvoice" | "sendPayment" | null;
    customerAction: "create" | "edit" | "deactivate" | "view" | null;
    accountsPayable: "viewBills" | "schedulePayment" | null;
    supplierAction: "add" | "edit" | "deactivate" | null;
    generateReports: "balanceSheet" | "incomeStatement" | "cashFlowStatement" | null;
}
interface CalendarActionTabType {
    viewAction: "day" | "week" | "month" | "year" | null;
    taskAction: "add" | "edit" | "remove" | "viewTask" | null;
    reminderAction: "add" | "delete" | null;
    eventAction: "add" | "edit" | "delete" | "view" | null;
}

const billingActions: BillingActionTabType = {
    orderAction: "view",
    invoiceAction: null,
    advanceAction: null,
    returnAction: null,
};
const inventoryActions: InventoryActionTabType = {
    inventoryAction: null,
    batchAction: null,
    productAction: null,
    productCategoriesAction: null,
    supplierAction: null,
    purchaseOrderAction: null,
    returnAction: null

};
const employeeActions: EmployeeActionTabType = {
    employeeAction: null,
    attendanceAction: null,
    leaveAction: null,
    salaryAction: null,
};
const accountingActions: AccountingActionTabType = {
    accountAction: "view",
    accountsReceivable: null,
    customerAction: null,
    accountsPayable: null,
    supplierAction: null,
    generateReports: null,
};
const calendarActions: CalendarActionTabType = {
    viewAction: "day",
    taskAction: null,
    reminderAction: null,
    eventAction: null,
};

const initialState = {
    billingActions,
    inventoryActions,
    employeeActions,
    accountingActions,
    calendarActions
};

type billingActionPayloadType = {
    actionName: "orderAction" | "invoiceAction" | "advanceAction" | "returnAction";
    actionOption: any | null;
};
type inventoryActionPayloadType = {
    actionName: "inventoryAction" | "batchAction" | "productAction" | "productCategoriesAction" | "supplierAction" | "purchaseOrderAction" | "returnAction";
    actionOption: any | null;
};
type employeeActionPayloadType = {
    actionName: "employeeAction" | "attendanceAction" | "leaveAction" | "salaryAction";
    actionOption: any | null;
};
type accountingActionPayloadType = {
    actionName: "accountAction" | "accountsReceivable" | "customerAction" | "accountsPayable" | "supplierAction" | "generateReports";
    actionOption: any | null;
}
type calendarActionPayloadType = {
    actionName: "viewAction" | "taskAction" | "reminderAction" | "eventAction";
    actionOption: any | null;
}

const actionTabFunctionSlices = createSlice({
    name: 'actionTabFunctionSlices',
    initialState: initialState,
    reducers: {
        executeBillingAction: (state, action: PayloadAction<billingActionPayloadType>) => {
            const {actionName, actionOption} = action.payload;
            state.billingActions[actionName] = actionOption;
        },
        executeInventoryAction: (state, action: PayloadAction<inventoryActionPayloadType>) => {
            const {actionName, actionOption} = action.payload;
            state.inventoryActions[actionName] = actionOption;
        },
        executeEmployeeAction: (state, action: PayloadAction<employeeActionPayloadType>) => {
            const {actionName, actionOption} = action.payload;
            state.employeeActions[actionName] = actionOption;
        },
        executeAccountingAction: (state, action: PayloadAction<accountingActionPayloadType>) => {
            const {actionName, actionOption} = action.payload;
            state.accountingActions[actionName] = actionOption;
        },
        executeCalendarAction: (state, action: PayloadAction<calendarActionPayloadType>) => {
            const {actionName, actionOption} = action.payload;
            state.calendarActions[actionName] = actionOption;
        },
    }
});

export const {
    executeBillingAction,
    executeInventoryAction,
    executeEmployeeAction,
    executeAccountingAction,
    executeCalendarAction
} = actionTabFunctionSlices.actions;
export default actionTabFunctionSlices.reducer;