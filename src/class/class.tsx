import {
    CalendarData,
    DayData,
    MonthData,
    WeekData,
    TaskData,
    TreeDataType, Month, DayDataWithoutWeek
} from "../type/type";
import {heapSortTaskDataList} from "../utils/utils";

export class Calendar {
    public yearValue: number;

    constructor() {
        this.yearValue = this.getFormattedDate().yearValue;
    }

    public getFormattedDate = (): DayDataWithoutWeek => {
        const dayIndex: number[] = [6, 0, 1, 2, 3, 4, 5];

        const currentDate: Date = new Date();
        const yearValue: number = currentDate.getFullYear();
        const monthId: Month = currentDate.getMonth() as Month;
        const monthName: string = Month[currentDate.getMonth()];
        const dayName: number = dayIndex[currentDate.getDay()];
        const dayValue: number = currentDate.getDate();

        return {yearValue, monthId, monthName, dayName, dayValue};
    };
    private selectDayName = (returnOption: "monthName" | "dayName", weekIndex: number | false, monthIndex: number | false): string => {
        if (returnOption === "monthName") {
            switch (monthIndex) {
                case 0:
                    return "January";
                case 1:
                    return "February";
                case 2:
                    return "March";
                case 3:
                    return "April";
                case 4:
                    return "May";
                case 5:
                    return "June";
                case 6:
                    return "July";
                case 7:
                    return "August";
                case 8:
                    return "September";
                case 9:
                    return "October";
                case 10:
                    return "November";
                case 11:
                    return "December";
                default:
                    return "";
            }
        } else {
            switch (weekIndex) {
                case 0:
                    return "Monday";
                case 1:
                    return "Tuesday";
                case 2:
                    return "Wednesday";
                case 3:
                    return "Thursday";
                case 4:
                    return "Friday";
                case 5:
                    return "Saturday";
                case 6:
                    return "Sunday";
                default:
                    return "";
            }
        }
    };
    private generateCalendarDataLinear = (yearValue: number, monthIndex: number): DayDataWithoutWeek[] => {
        const dayIndex: number[] = [6, 0, 1, 2, 3, 4, 5];
        const data = [];
        const daysInMonth: number = new Date(yearValue, monthIndex + 1, 0).getDate();

        for (const day of dayIndex) {
            for (let i: number = 1; i <= daysInMonth; i++) {
                const currentDate: Date = new Date(yearValue, monthIndex, i);
                if (currentDate.getDay() === dayIndex.indexOf(day)) {
                    const dayData = {
                        yearValue: this.yearValue,
                        monthName:Month[currentDate.getMonth()],
                        monthId: currentDate.getMonth() as Month,
                        dayValue: i,
                        dayName: dayIndex[currentDate.getDay()],
                    };
                    data.push(dayData);
                }
            }
        }

        data.sort((a: DayDataWithoutWeek, b: DayDataWithoutWeek) => a.dayValue - b.dayValue);
        return data;
    };
    private dayArrayData = (year: number, monthIndex: number, weekId: number): DayData[] => {
        const numRows: 6 = 6;
        const numCols: 7 = 7;

        const nextYear: number = year + 1;
        const prevYear: number = year - 1;
        let prevMonthIndex: number;
        let nextMonthIndex: number;

        const dayData: DayDataWithoutWeek[] = this.generateCalendarDataLinear(year, monthIndex);
        let prevDayData: DayDataWithoutWeek[];
        let nextDayData: DayDataWithoutWeek[];

        if (monthIndex === 0) {
            prevMonthIndex = 11;
            nextMonthIndex = monthIndex + 1;
        } else if (monthIndex === 11) {
            nextMonthIndex = 0;
            prevMonthIndex = monthIndex - 1;
        } else {
            prevMonthIndex = monthIndex - 1;
            nextMonthIndex = monthIndex + 1;
        }

        prevDayData = this.generateCalendarDataLinear(monthIndex === 0 ? prevYear : year, prevMonthIndex);
        nextDayData = this.generateCalendarDataLinear(monthIndex === 11 ? nextYear : year, nextMonthIndex);


        let dayIndex: number = 0;
        let prevDayIndex: number = dayData[0].dayName - 1;
        let nextDayIndex: number = 0;

        let dayDataList = [];

        for (let i: number = 0; i < numRows; i++) {
            for (let j: number = 0; j < numCols; j++) {
                if (dayIndex < dayData.length) {
                    if (dayData[dayIndex].dayName === j) {
                        const arrayData: DayData = {
                            yearValue: this.yearValue,
                            monthId: monthIndex,
                            monthName: Month[monthIndex],
                            weekId: weekId,
                            dayName: j,
                            dayValue: dayData[dayIndex].dayValue,
                        }
                        dayDataList.push(arrayData);
                        dayIndex += 1;
                    } else {
                        if (prevDayIndex >= 0) {
                            const arrayData: DayData = {
                                yearValue: this.yearValue,
                                monthId: prevMonthIndex,
                                monthName: Month[prevMonthIndex],
                                weekId: weekId,
                                dayName: j,
                                dayValue: prevDayData[(prevDayData.length - 1) - prevDayIndex].dayValue,
                            }
                            dayDataList.push(arrayData);
                            prevDayIndex -= 1;
                        }
                    }
                } else {
                    const arrayData: DayData = {
                        yearValue: this.yearValue,
                        monthId: nextMonthIndex,
                        monthName: Month[nextMonthIndex],
                        weekId: weekId,
                        dayName: j,
                        dayValue: nextDayData[nextDayIndex].dayValue,
                    }
                    dayDataList.push(arrayData);
                    nextDayIndex += 1;
                }
            }
        }

        return dayDataList;
    };

    protected createDayData(weekIndex: number, monthIndex: number): DayData[] {
        const dayData: DayData[] = this.dayArrayData(this.yearValue, monthIndex, weekIndex);

        const firstLimit: number = 7 * weekIndex - 7;
        const secondLimit: number = 7 * weekIndex;

        return dayData.slice(firstLimit, secondLimit);
    }
    protected createWeekData(monthIndex: number): WeekData[] {
        let weekArray: WeekData[] = [];
        for (let j: number = 1; j <= 6; j++) {
            let weekData: WeekData = {
                weekId: j,
                dayArray: this.createDayData(j, monthIndex),
            };
            weekArray.push(weekData);
        }
        return weekArray;
    }
    protected createMonth(): MonthData[] {
        let monthArray = [];
        for (let i: number = 0; i < 12; i++) {
            let monthData: MonthData = {
                monthId: 0,
                monthName: "January",
                weekArray: [],
            };
            monthData.monthId = i;
            monthData.monthName = this.selectDayName("monthName", false, i);
            monthData.weekArray = this.createWeekData(i);
            monthArray.push(monthData);
        }

        return monthArray;
    }
    public getCalendarData(yearValue?: number): CalendarData {
        if (yearValue) {
            this.yearValue = yearValue;
            return {
                yearValue: this.yearValue,
                monthArray: this.createMonth(),
            }
        }
        return {
            yearValue: this.yearValue,
            monthArray: this.createMonth(),
        }
    }
}

export class Task {

    private taskDataList: Array<TaskData> = [];

    constructor() {
    }

    //All private methods
    private getTaskIndex = (taskId: number): number => {
        return this.taskDataList.findIndex((value: TaskData) => value.taskId === taskId);
    }

    // Task Sorting
    public sortTaskByPriority(taskDataArray: Array<TaskData>, sortBy: "high" | "low"): Array<TaskData> {
        const sortedArray: Array<TaskData> = heapSortTaskDataList(taskDataArray, "sortByPriority");
        if (sortBy === "high") return sortedArray;
        else return sortedArray.slice().reverse();
    }

    public sortTaskByStatus(taskDataArray: Array<TaskData>, sortBy: "complete" | "incomplete"): Array<Array<TaskData>> {
        const completedTask: Array<TaskData> = taskDataArray.filter((value: TaskData) => value.isComplete);
        const incompleteTask: Array<TaskData> = taskDataArray.filter((value: TaskData) => !value.isComplete);
        if (sortBy === "complete") return [completedTask, incompleteTask];
        else return [incompleteTask, completedTask];
    }

    public sortTaskByDate(sortBy: "latest" | "oldest"): Array<TaskData> {
        const sortedArray: Array<TaskData> = heapSortTaskDataList(this.taskDataList, "sortByDate");
        if (sortBy === "latest") return sortedArray;
        else return sortedArray.slice().reverse();
    }

    //Task Reading

    public getTaskByDate(date: DayDataWithoutWeek): Array<TaskData> {
        return this.taskDataList.filter((value: TaskData) => {
            if (
                value.createdAt.yearValue === date.yearValue &&
                value.createdAt.monthId === date.monthId &&
                value.createdAt.dayName === date.dayName &&
                value.createdAt.dayValue === date.dayValue
            ) return value;
        });
    }

    public getTaskById(taskId: number): TaskData {
        return this.taskDataList[this.getTaskIndex(taskId)];
    }

    public getAllTask(): Array<TaskData> {
        return this.taskDataList;
    }

}

class TreeNode {
    parentId: number | null;
    nodeId: number;
    optionData: string;
    children: TreeNode[];
    action: (() => void) | null;

    constructor(parentId: number | null, nodeId: number, optionData: string, action: (() => void) | null = null) {
        this.parentId = parentId;
        this.nodeId = nodeId;
        this.optionData = optionData;
        this.children = [];
        this.action = action;
    }
}

export class OptionTree {
    root: TreeNode | null = null;

    private getTreeFromNode(node: TreeNode | null): TreeDataType[] {
        return node ? (node.children.map(child => ({
            parentId: child.parentId,
            nodeId: child.nodeId,
            optionData: child.optionData,
            children: this.getTreeFromNode(child),
            action: child.action,
        }))) : [];
    }

    private findNode(nodeId: number, node: TreeNode | null = this.root): TreeNode | null {
        if (!node) return null;
        if (node.nodeId === nodeId) return node;

        for (const child of node.children) {
            const found = this.findNode(nodeId, child);
            if (found) return found;
        }

        return null;
    }

    public insert(parentId: number | null, nodeId: number, optionData: string, action: (() => void) | null = null): void {
        const newNode = new TreeNode(parentId, nodeId, optionData, action);
        if (!this.root) {
            this.root = newNode;
            return;
        }

        if (parentId !== null) {
            const parent = this.findNode(parentId);
            if (!parent) throw new Error(`Parent node with ID ${parentId} not found`);
            parent.children.push(newNode);
        } else this.root.children.push(newNode);
    }

    public preorder(node: TreeNode | null = this.root, result: string[] = []): string[] {
        if (!node) return result;
        result.push(node.optionData);
        for (const child of node.children) {
            this.preorder(child, result);
        }

        return result;
    }

    public getTree(): TreeDataType[] {
        if (!this.root) return [];

        const treeFromNode: TreeDataType[] = this.getTreeFromNode(this.root);
        return treeFromNode ? [{
            parentId: this.root.parentId,
            nodeId: this.root.nodeId,
            optionData: this.root.optionData,
            children: treeFromNode,
            action: this.root.action
        }] : [];
    }
}

