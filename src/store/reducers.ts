import {combineReducers} from 'redux';
import menuSlices from "./slices/menuSlices";
import themeSlices from "./slices/themeSlices";
import todoDataSlice from "./slices/todoDataSlice";

const rootReducer = combineReducers({
    menuSlice: menuSlices,
    themeSlice: themeSlices,
    todoDataSlice: todoDataSlice,
});

export default rootReducer;
