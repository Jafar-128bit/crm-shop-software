export interface FormattedDate {
    yearValue: number;
    monthId: number;
    monthName?: string;
    dayName: number;
    dayValue: number;
}

export interface FormattedDateExtended extends FormattedDate {
    monthName: string;
}

export interface DayData {
    dayValue: number;
    dayName: number;
    weekId: number;
    monthId: number;
    dayObjects: any[];
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
    taskData: string;
    isComplete: boolean;
    priorityLevel: number;
    createdAt: FormattedDate;
}

export interface TaskDataExtended extends TaskData {
    taskId: number;
}