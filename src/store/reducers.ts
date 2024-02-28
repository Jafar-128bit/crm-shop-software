import {combineReducers} from 'redux';
import menuSlices from "./slices/menuSlices";
import themeSlices from "./slices/themeSlices";
import todoDataSlice from "./slices/todoDataSlice";
import popUpSlices from "./slices/popUpSlices";

const rootReducer = combineReducers({
    menuSlice: menuSlices,
    themeSlice: themeSlices,
    todoDataSlice: todoDataSlice,
    popUpSlice: popUpSlices,
});

export default rootReducer;
