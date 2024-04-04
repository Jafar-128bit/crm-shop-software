import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ActionType} from "../../type/type";

interface MenuState {
    sidebarState: boolean;
    dateAndTimeMenu: boolean;
    /* Inventory Menu State */
    createInventoryMenu: boolean;
    createBatchMenu: boolean;
    createProductCategoryMenu: boolean;
    viewProductCategoryMenu: boolean;
    createSupplierMenu: boolean;
    //Transfer Menu
    inventoryTransferMenu: boolean;
    batchTransferMenu: boolean;
    //Edit Menu
    editInventoryMenu: boolean;
    editBatchMenu: boolean;
    editProductMenu: boolean;
    editProductCategoryMenu: boolean;
    //Delete Menu
    deleteInventoryMenu: boolean;
    deleteBatchMenu: boolean;
    deleteProductMenu: boolean;
    /* Billing Menu State */
    markOrderFulfilledMenu: boolean;
    /* Employee Menu State */

    /* Account Menu State */

    /* Calendar Menu State */
    createTaskMenu: boolean;
    viewTaskMenu: boolean;
    createEventMenu: boolean;
    viewEventMenu: boolean;
    createReminderMenu: boolean;
    viewReminderMenu: boolean;
}

const initialState: MenuState = {
    sidebarState: false,
    dateAndTimeMenu: false,

    createInventoryMenu: false,
    createBatchMenu: false,
    createProductCategoryMenu: false,
    viewProductCategoryMenu: false,
    createSupplierMenu: false,

    inventoryTransferMenu: false,
    batchTransferMenu: false,

    editInventoryMenu: false,
    editBatchMenu: false,
    editProductMenu: false,
    editProductCategoryMenu: false,

    deleteInventoryMenu: false,
    deleteBatchMenu: false,
    deleteProductMenu: false,

    markOrderFulfilledMenu: false,

    createTaskMenu: false,
    createEventMenu: false,
    viewTaskMenu: false,
    viewEventMenu: false,
    createReminderMenu: false,
    viewReminderMenu: false,
};

const menuSlice = createSlice({
    name: 'menuSlice',
    initialState,
    reducers: {
        toggleMenuState: (state, action: PayloadAction<ActionType>): void => {
            const {actionState, optionName} = action.payload;
            switch (optionName) {
                case "SIDE_BAR":
                    state.sidebarState = actionState;
                    break;
                case "DATE_TIME_MENU":
                    state.dateAndTimeMenu = actionState;
                    break;
                case "CREATE_INVENTORY":
                    state.createInventoryMenu = actionState;
                    break;
                case "CREATE_BATCH":
                    state.createBatchMenu = actionState;
                    break;
                case "CREATE_PRODUCT_CATEGORY":
                    state.createProductCategoryMenu = actionState;
                    break;
                case "CREATE_SUPPLIER":
                    state.createSupplierMenu = actionState;
                    break;
                case "VIEW_PRODUCT_CATEGORIES":
                    state.viewProductCategoryMenu = actionState;
                    break;
                case "TRANSFER_INVENTORY":
                    state.inventoryTransferMenu = actionState;
                    break;
                case "TRANSFER_BATCH":
                    state.batchTransferMenu = actionState;
                    break;
                case "EDIT_INVENTORY":
                    state.editInventoryMenu = actionState;
                    break;
                case "EDIT_BATCH":
                    state.editBatchMenu = actionState;
                    break;
                case "EDIT_PRODUCT":
                    state.editProductMenu = actionState;
                    break;
                case "EDIT_PRODUCT_CATEGORIES":
                    state.editProductCategoryMenu = actionState;
                    break;
                case "DELETE_INVENTORY":
                    state.deleteInventoryMenu = actionState;
                    break;
                case "DELETE_BATCH":
                    state.deleteBatchMenu = actionState;
                    break;
                case "DELETE_PRODUCT":
                    state.deleteProductMenu = actionState;
                    break;
                case "MARK_ORDER_FULFILLED":
                    state.markOrderFulfilledMenu = actionState;
                    break;
                case "CREATE_TASK":
                    state.createTaskMenu = actionState;
                    break;
                case "CREATE_EVENT":
                    state.createEventMenu = actionState;
                    break;
                case "VIEW_TASK":
                    state.viewTaskMenu = actionState;
                    break;
                case "VIEW_EVENT":
                    state.viewEventMenu = actionState;
                    break;
                case "CREATE_REMINDER":
                    state.createReminderMenu = actionState;
                    break;
                case "VIEW_REMINDER":
                    state.viewReminderMenu = actionState;
                    break;
                default:
                    break;
            }
        },
    },
});

export const {
    toggleMenuState,
} = menuSlice.actions;

export default menuSlice.reducer;
