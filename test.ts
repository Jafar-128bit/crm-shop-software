// interface FormattedDate {
//     yearValue: number;
//     monthId: number;
//     dayName: number;
//     dayValue: number;
// }
//
// const dateCompare = (date1: FormattedDate, date2: FormattedDate): number => {
//     // Compare years
//     if (date1.yearValue !== date2.yearValue) {
//         return date1.yearValue - date2.yearValue;
//     }
//
//     // Compare months
//     if (date1.monthId !== date2.monthId) {
//         return date1.monthId - date2.monthId;
//     }
//
//     // Compare days
//     if (date1.dayValue !== date2.dayValue) {
//         return date1.dayValue - date2.dayValue;
//     }
//
//     // Compare day names
//     return date1.dayName - date2.dayName;
// };
//
// const heapSort = (array: FormattedDate[]): FormattedDate[] => {
//     const heapify = (array: FormattedDate[], i: number, heapSize: number): void => {
//         const left = 2 * i + 1;
//         const right = 2 * i + 2;
//         let largest = i;
//
//         if (left < heapSize && dateCompare(array[left], array[largest]) > 0) largest = left;
//         if (right < heapSize && dateCompare(array[right], array[largest]) > 0) largest = right;
//
//         if (largest !== i) {
//             swap(array, i, largest);
//             heapify(array, largest, heapSize);
//         }
//     };
//
//     const buildMaxHeap = (array: FormattedDate[]): void => {
//         const n = array.length;
//         for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
//             heapify(array, i, n);
//         }
//     };
//
//     const swap = (array: FormattedDate[], i: number, j: number): void => {
//         const temp = array[i];
//         array[i] = array[j];
//         array[j] = temp;
//     };
//
//     buildMaxHeap(array);
//
//     for (let i = array.length - 1; i > 0; i--) {
//         swap(array, 0, i);
//         heapify(array, 0, i);
//     }
//
//     return array;
// };
//
// // Example usage
// const unsortedArray: FormattedDate[] = [
//     { yearValue: 2023, monthId: 5, dayName: 2, dayValue: 15 },
//     { yearValue: 2022, monthId: 8, dayName: 1, dayValue: 10 },
//     { yearValue: 2024, monthId: 1, dayName: 4, dayValue: 20 },
// ];
//
// const sortedArray: FormattedDate[] = heapSort([...unsortedArray]);
// console.log("Sorted Array:", sortedArray);
//
export {}