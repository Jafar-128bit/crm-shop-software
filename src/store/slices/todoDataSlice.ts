import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TaskDataExtended} from "../../type/type";
import produce from 'immer';

interface InitialValue {
    taskData: Array<TaskDataExtended>;
}

const initialState: InitialValue = {
    taskData: [],
};

const todoDataSlice = createSlice({
    name: "todoDataSlice",
    initialState: initialState,
    reducers: {
        updateTaskData: (state, action: PayloadAction<Array<TaskDataExtended>>) => {
            state.taskData = [...action.payload];
        },

        clearTaskData: (state) => {
            state.taskData = [];
        }

    }
});

export const {
    updateTaskData,
    clearTaskData,
} = todoDataSlice.actions;

export default todoDataSlice.reducer;