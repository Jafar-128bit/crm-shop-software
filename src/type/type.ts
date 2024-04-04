import {ReactNode} from "react";

export interface DayData {
    yearValue: number;
    monthId: number;
    monthName: string;
    weekId: number;
    dayName: number;
    dayValue: number;
}

export interface DayDataWithoutWeek {
    yearValue: number;
    monthId: number;
    monthName: string;
    dayName: number;
    dayValue: number;
}

export interface WeekData {
    weekId: number;
    dayArray: DayData[];
}

export interface MonthData {
    monthId: number;
    monthName: string;
    weekArray: WeekData[];
}

export interface CalendarData {
    yearValue: number;
    monthArray: MonthData[];
}

export interface TaskData {
    taskId: number;
    taskData: string;
    isComplete: boolean;
    priorityLevel: number;
    createdAt: DayData;
}

export interface NodeDataType {
    parentId: number | null;
    nodeId: number;
    optionData: string;
    action: (() => void) | null;
}

export interface TreeDataType extends NodeDataType {
    children: TreeDataType[],
}

export interface CalendarContextProviderProps<T> {
    children: ReactNode;
    initialState: T;
}

export interface TransferContextProviderProps<T> {
    children: ReactNode;
    initialState: T;
}

export enum Month {
    January = 0,
    February = 1,
    March = 2,
    April = 3,
    May = 4,
    June = 5,
    July = 6,
    August = 7,
    September = 8,
    October = 9,
    November = 10,
    December = 11,
}

export type optionType = "SIDE_BAR"
    | "DATE_TIME_MENU"
    | "CREATE_INVENTORY"
    | "CREATE_BATCH"
    | "CREATE_PRODUCT_CATEGORY"
    | "CREATE_SUPPLIER"
    | "VIEW_PRODUCT_CATEGORIES"
    | "TRANSFER_INVENTORY"
    | "TRANSFER_BATCH"
    | "EDIT_INVENTORY"
    | "EDIT_BATCH"
    | "EDIT_PRODUCT"
    | "EDIT_PRODUCT_CATEGORIES"
    | "DELETE_INVENTORY"
    | "DELETE_BATCH"
    | "DELETE_PRODUCT"
    | "MARK_ORDER_FULFILLED"
    | "CREATE_TASK"
    | "CREATE_EVENT"
    | "VIEW_TASK"
    | "VIEW_EVENT"
    | "CREATE_REMINDER"
    | "VIEW_REMINDER";

export interface ActionType {
    actionState: boolean;
    optionName: optionType,
}

export interface InventoryDataList {
    id: number;
    inventoryName: string;
    type: "JIT" | "FIFO" | "LIFO";
    location: string;
    batchQty: number;
    productQty: number;
    outOfStock: number;
    productSold: number;
    inventoryCost: number;
}

export interface BatchDataList {
    id: number;
    batchId: string;
    inventoryId: number;
    productQty: number;
    outOfStock: number;
}

export interface ProductDataList {
    id: number;
    batchId: string;
    inventoryId: number;
    productName: string;
    variationDetails: string;
    price: number;
    expiryDate: string;
    quantity: number;
    sold: number;
    isActive: boolean;
}

export interface SortOptionType {
    sortOption: string;
    sortAction: (() => void) | null;
}