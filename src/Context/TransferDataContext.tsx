import { createContext, Dispatch, SetStateAction } from 'react';

interface TransferDataContextProps<T> {
    state: T;
    setState: Dispatch<SetStateAction<T>>;
}

const createTransferDataContext = <T,>(initialState: T) => {
    return createContext<TransferDataContextProps<T>>({ state: initialState, setState: () => {} });
};

export { createTransferDataContext };