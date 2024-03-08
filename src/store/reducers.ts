import {combineReducers} from 'redux';
import menuSlices from "./slices/menuSlices";
import themeSlices from "./slices/themeSlices";
import todoDataSlice from "./slices/todoDataSlice";
import popUpSlices from "./slices/popUpSlices";
import actionTabSlices from "./slices/actionTabSlices";
import actionTabFunctionSlices from "./slices/actionTabFunctionSlices";

const rootReducer = combineReducers({
    menuSlice: menuSlices,
    themeSlice: themeSlices,
    todoDataSlice: todoDataSlice,
    popUpSlice: popUpSlices,
    actionTabSlice: actionTabSlices,
    actionTabFunctionSlices: actionTabFunctionSlices,
});

export default rootReducer;
