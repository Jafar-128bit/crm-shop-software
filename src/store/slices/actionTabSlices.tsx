import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ActionTabState {
    billingActions: boolean;
    inventoryActions: boolean;
    employeeAction: boolean;
    calendarActions: boolean;
    paymentActions: boolean;
}

const ActionTabState: ActionTabState = {
    billingActions: false,
    inventoryActions: false,
    employeeAction: false,
    calendarActions: false,
    paymentActions: false,
};

const disableAllActionCenter = (state: ActionTabState) => {
    state.billingActions = false;
    state.inventoryActions = false;
    state.employeeAction = false;
    state.calendarActions = false;
    state.paymentActions = false;
};

const actionTabSlices = createSlice({
    name: "actionTabSlices",
    initialState: ActionTabState,
    reducers: {
        toggleAction: (state, action: PayloadAction<string>): void => {
            const actionMap = new Map([
                ["billing", (state: ActionTabState) => { state.billingActions = true; }],
                ["inventory", (state: ActionTabState) => { state.inventoryActions = true; }],
                ["employee", (state: ActionTabState) => { state.employeeAction = true; }],
                ["calendar", (state: ActionTabState) => { state.calendarActions = true; }],
                ["payment", (state: ActionTabState) => { state.paymentActions = true; }],
            ]);

            const toggleAction = actionMap.get(action.payload);
            if (toggleAction) {
                disableAllActionCenter(state);
                toggleAction(state);
            } else {
                disableAllActionCenter(state);
            }
        },
    },
});

export const {
    toggleAction
} = actionTabSlices.actions;

export default actionTabSlices.reducer;
