import {FormattedDate, TaskData} from "../type/type";

export interface DayData {
    dayValue: number;
    dayName: number;
}

export const generateCalendarDataLinear = (year: number, month: number): DayData[] => {
    const dayIndex: number[] = [6, 0, 1, 2, 3, 4, 5];
    const data: DayData[] = [];

    for (const day of dayIndex) {
        const daysInMonth: number = new Date(year, month, 0).getDate();
        for (let i: number = 1; i <= daysInMonth; i++) {
            const currentDate: Date = new Date(year, month, i);
            if (currentDate.getDay() === dayIndex.indexOf(day)) {
                const dayData: DayData = {
                    dayValue: i,
                    dayName: dayIndex[currentDate.getDay()],
                };
                data.push(dayData);
                data.sort((a: DayData, b: DayData) => a.dayValue - b.dayValue);
            }
        }
    }

    return data;
};

export const heapSortTaskDataList = (array: Array<TaskData>, sortOption: "sortByPriority" | "sortByDate"): Array<TaskData> => {

    const dateCompare = (date1: FormattedDate, date2: FormattedDate): number => {
        if (date1.yearValue !== date2.yearValue) return date1.yearValue - date2.yearValue;
        if (date1.monthId !== date2.monthId) return date1.monthId - date2.monthId;
        if (date1.dayValue !== date2.dayValue) return date1.dayValue - date2.dayValue;
        return date1.dayName - date2.dayName;
    };

    const heapify = (array: Array<TaskData>, i: number, heapSize: number): void => {
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        let largest = i;

        if (sortOption === "sortByPriority") {
            if (left < heapSize && array[left].priorityLevel > array[largest].priorityLevel) largest = left;
            if (right < heapSize && array[right].priorityLevel > array[largest].priorityLevel) largest = right;
            if (largest !== i) {
                swap(array, i, largest);
                heapify(array, largest, heapSize);
            }
        } else {
            if (left < heapSize && dateCompare(array[left].createdAt, array[largest].createdAt) > 0) largest = left;
            if (right < heapSize && dateCompare(array[right].createdAt, array[largest].createdAt) > 0) largest = right;

            if (largest !== i) {
                swap(array, i, largest);
                heapify(array, largest, heapSize);
            }
        }
    };

    const buildMaxHeap = (array: Array<TaskData>): void => {
        const n: number = array.length;
        for (let i: number = Math.floor(n / 2) - 1; i >= 0; i--) {
            heapify(array, i, n);
        }
    };

    const swap = (array: Array<TaskData>, i: number, j: number): void => {

        if (sortOption === "sortByPriority") {
            const temp: number = array[i].priorityLevel;
            array[i].priorityLevel = array[j].priorityLevel;
            array[j].priorityLevel = temp;
        } else {
            const temp: FormattedDate = array[i].createdAt;
            array[i].createdAt = array[j].createdAt;
            array[j].createdAt = temp;
        }
    };

    buildMaxHeap(array);

    for (let i = array.length - 1; i > 0; i--) {
        swap(array, 0, i);
        heapify(array, 0, i);
    }

    return array;
};

export const getFormattedTime = (): string => {
    const options: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    };

    return new Date().toLocaleTimeString('en-US', options);
};

export const deepClone = <T>(input: T): T => {
    if (input === null || typeof input !== "object") return input as T;
    const initialValue = (Array.isArray(input) ? [] : {}) as T;
    return Object.keys(input).reduce((acc, key) => {
        // @ts-ignore
        acc[key] = deepClone(input[key]);
        return acc;
    }, initialValue);
};

export const areObjectValuesEqual = (obj1: Record<string, any>, obj2: Record<string, any>): boolean => {
    const keys: string[] = Object.keys(obj1);
    return keys.every(key => obj1[key] === obj2[key]);
}

export const getTimeInAMPMFormat = (): string => {
    const currentDate: Date = new Date();
    let hours: number = currentDate.getHours();
    const minutes: number = currentDate.getMinutes();
    let period: string = 'am';

    if (hours >= 12) {
        period = 'pm';
        if (hours > 12) {
            hours -= 12;
        }
    }

    const formattedHours: string = hours < 10 ? `0${hours}` : `${hours}`;

    return `${formattedHours}-${minutes}-${period}`;
};

export const getTimeIn24HourFormat = (): string => {
    const currentDate: Date = new Date();
    const hours: number = currentDate.getHours();
    const minutes: number = currentDate.getMinutes();

    const formattedHours: string = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes: string = minutes < 10 ? `0${minutes}` : `${minutes}`;

    return `${formattedHours}-${formattedMinutes}`;
};

export const convertHoursMinutesToMinutes = (timeString: string): number => {
    const [hours, minutes] = timeString.split('-').map(Number);
    return hours * 60 + minutes;
};






