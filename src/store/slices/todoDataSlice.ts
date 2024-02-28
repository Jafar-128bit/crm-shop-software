import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TaskData} from "../../type/type";
import produce from 'immer';

interface InitialValue {
    taskData: Array<TaskData>;
    taskDataByDate: Array<TaskData>;
}

const initialState: InitialValue = {
    taskData: [],
    taskDataByDate: [],
};

const todoDataSlice = createSlice({
    name: "todoDataSlice",
    initialState: initialState,
    reducers: {
        updateTaskData: (state, action: PayloadAction<Array<TaskData>>) => {
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