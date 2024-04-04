import { createContext, Dispatch, SetStateAction } from 'react';

interface CalendarContextProps<T> {
    state: T;
    setState: Dispatch<SetStateAction<T>>;
}

const createCalendarContext = <T,>(initialState: T) => {
    return createContext<CalendarContextProps<T>>({ state: initialState, setState: () => {} });
};

export { createCalendarContext };
