import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
    themeState: boolean;
}

const initialState: ThemeState = {
    themeState: true,
};

const themeSlice = createSlice({
    name: 'themeSlice',
    initialState,
    reducers: {
        toggleTheme: (state, action: PayloadAction<boolean>) => {
            state.themeState = action.payload;
        },
    },
});

export const {
    toggleTheme,
} = themeSlice.actions;

export default themeSlice.reducer;
