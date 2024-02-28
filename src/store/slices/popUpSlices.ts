import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface PopUpState {
    PopUpMenu: string;
}

const initialState: PopUpState = {
    PopUpMenu: "",
};

const popUpSlice = createSlice({
    name: 'popUpSlice',
    initialState,
    reducers: {
        toggleAddProperty: (state, action: PayloadAction<string>): void => {
            state.PopUpMenu = action.payload;
        },
    },
});

export const {
    toggleAddProperty,
} = popUpSlice.actions;

export default popUpSlice.reducer;
