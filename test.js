"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var dateCompare = function (date1, date2) {
    // Compare years
    if (date1.yearValue !== date2.yearValue) {
        return date1.yearValue - date2.yearValue;
    }
    // Compare months
    if (date1.monthId !== date2.monthId) {
        return date1.monthId - date2.monthId;
    }
    // Compare days
    if (date1.dayValue !== date2.dayValue) {
        return date1.dayValue - date2.dayValue;
    }
    // Compare day names
    return date1.dayName - date2.dayName;
};
var heapSort = function (array) {
    var heapify = function (array, i, heapSize) {
        var left = 2 * i + 1;
        var right = 2 * i + 2;
        var largest = i;
        if (left < heapSize && dateCompare(array[left], array[largest]) > 0)
            largest = left;
        if (right < heapSize && dateCompare(array[right], array[largest]) > 0)
            largest = right;
        if (largest !== i) {
            swap(array, i, largest);
            heapify(array, largest, heapSize);
        }
    };
    var buildMaxHeap = function (array) {
        var n = array.length;
        for (var i = Math.floor(n / 2) - 1; i >= 0; i--) {
            heapify(array, i, n);
        }
    };
    var swap = function (array, i, j) {
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    };
    buildMaxHeap(array);
    for (var i = array.length - 1; i > 0; i--) {
        swap(array, 0, i);
        heapify(array, 0, i);
    }
    return array;
};
// Example usage
var unsortedArray = [
    { yearValue: 2023, monthId: 5, dayName: 2, dayValue: 15 },
    { yearValue: 2022, monthId: 8, dayName: 1, dayValue: 10 },
    { yearValue: 2024, monthId: 1, dayName: 4, dayValue: 20 },
];
var sortedArray = heapSort(__spreadArray([], unsortedArray, true));
console.log("Sorted Array:", sortedArray);
