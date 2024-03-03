import {combineReducers} from 'redux';
import menuSlices from "./slices/menuSlices";
import themeSlices from "./slices/themeSlices";
import todoDataSlice from "./slices/todoDataSlice";
import popUpSlices from "./slices/popUpSlices";
import actionTabSlices from "./slices/actionTabSlices";

const rootReducer = combineReducers({
    menuSlice: menuSlices,
    themeSlice: themeSlices,
    todoDataSlice: todoDataSlice,
    popUpSlice: popUpSlices,
    actionTabSlice: actionTabSlices,
});

export default rootReducer;
