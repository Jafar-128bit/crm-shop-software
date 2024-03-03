import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface PopUpState {
    PopUpMenu: string;
    PopUpScreen: boolean;
}

const initialState: PopUpState = {
    PopUpMenu: "",
    PopUpScreen: false
};

const popUpSlice = createSlice({
    name: 'popUpSlice',
    initialState,
    reducers: {
        toggleAddProperty: (state, action: PayloadAction<string>): void => {
            state.PopUpMenu = action.payload;
        },
        togglePopUpScreen: (state, action) => {
            state.PopUpScreen = action.payload;
        }
    },
});

export const {
    toggleAddProperty,
    togglePopUpScreen
} = popUpSlice.actions;

export default popUpSlice.reducer;
