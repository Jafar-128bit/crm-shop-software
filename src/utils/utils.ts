interface DayData {
    day: number;
    dayName: number;
}

export const generateCalendarDataLinear = (year: number, month: number): DayData[] => {
    const dayIndex: number[] = [6, 0, 1, 2, 3, 4, 5];

    const data: DayData[] = [];

    // Loop through each day of the week
    for (const day of dayIndex) {
        const daysInMonth: number = new Date(year, month, 0).getDate(); // Get the total number of days in the month
        // Get the dates for the specific day of the week
        for (let i: number = 1; i <= daysInMonth; i++) {
            const currentDate: Date = new Date(year, month, i);
            if (currentDate.getDay() === dayIndex.indexOf(day)) {
                const dayData: DayData = {
                    day: i,
                    dayName: dayIndex[currentDate.getDay()],
                };
                data.push(dayData);
                data.sort((a, b) => a.day - b.day);
            }
        }
    }

    return data;
};

export const dayArrayData = (dayData: DayData[]): DayData[] => {
    const numRows = 6;
    const numCols = 7;

    let dayDataMatrix: DayData[][] = Array.from({ length: numRows }, () =>
        Array.from({ length: numCols }, (_, dayName: number) => ({ day: 0, dayName }))
    );
    let dayIndex: number = 0;

    for (let i: number = 0; i < dayDataMatrix.length; i++) {
        for (let j: number = 0; j < dayDataMatrix[i].length; j++) {
            if (dayIndex < dayData.length) {
                dayDataMatrix[i][j].dayName = j;
                if (dayData[dayIndex].dayName === j) {
                    dayDataMatrix[i][j].day = dayData[dayIndex].day;
                    dayIndex += 1;
                }
            } else break;
        }
    }

    return dayDataMatrix.filter((dayData: DayData[]) => dayData.some((day) => day.day > 0)).flat();
};

interface FormattedDate {
    year: number;
    monthId: number;
    month: string;
    dayName: number;
    day: number;
}

export const getFormattedDate = (): FormattedDate => {
    const dayIndex: number[] = [6, 0, 1, 2, 3, 4, 5];
    const months: string[] = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
    ];

    const currentDate: Date = new Date();
    const year: number = currentDate.getFullYear();
    const monthId: number = currentDate.getMonth();
    const month: string = months[currentDate.getMonth()];
    const dayName: number = dayIndex[currentDate.getDay()];
    const day: number = currentDate.getDate();

    return {year, monthId, month, dayName, day};
};


