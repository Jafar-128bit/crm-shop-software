import {combineReducers} from 'redux';
import menuSlices from "./slices/menuSlices";
import themeSlices from "./slices/themeSlices";

const rootReducer = combineReducers({
    menuSlice: menuSlices,
    themeSlice: themeSlices,
});

export default rootReducer;
