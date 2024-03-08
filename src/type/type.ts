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

export interface TreeDataType extends NodeDataType{
    children: TreeDataType[],
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