import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface MenuState {
    sidebarState: boolean;
    todoMenu: boolean;
    dateAndTimeMenu: boolean;
    messageMenu: boolean;
    emailMenu: boolean;
}

const initialState: MenuState = {
    sidebarState: true,
    todoMenu: false,
    dateAndTimeMenu: false,
    messageMenu: false,
    emailMenu: false,
};

const menuSlice = createSlice({
    name: 'menuSlice',
    initialState,
    reducers: {
        toggleSidebar: (state, action: PayloadAction<boolean>): void => {
            state.sidebarState = action.payload;
        },
        toggleTodoMenu: (state, action: PayloadAction<boolean>): void => {
            state.todoMenu = action.payload;
        },
        toggleDateAndTimeMenu: (state, action: PayloadAction<boolean>): void => {
            state.dateAndTimeMenu = action.payload;
        },
        toggleMessageMenu: (state, action: PayloadAction<boolean>): void => {
            state.messageMenu = action.payload;
        },
        toggleEmailMenu: (state, action: PayloadAction<boolean>): void => {
            state.emailMenu = action.payload;
        },
    },
});

export const {
    toggleSidebar,
    toggleTodoMenu,
    toggleDateAndTimeMenu,
    toggleMessageMenu,
    toggleEmailMenu
} = menuSlice.actions;

export default menuSlice.reducer;
