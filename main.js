'use strict';

function init() {
    let element = document.getElementById('eventButton');
    element.addEventListener('click', formEvulation)
}
document.addEventListener('DOMContentLoaded', init);

function formEvulation() {

    let allDayTimeInput = document.getElementById('allDayTimeInput').value;
    let workLengthInput = document.getElementById('workLengthInput').value;
    let normalWorkLengthInput = document.getElementById('normalWorkLengthInput').value;
    let productivDaysInput = document.getElementById('productivDaysInput').value;
    let productivDaysWorkLengthInput = document.getElementById('productivDaysWorkLengthInput').value;
    let weekendTimeInput = document.getElementById('weekendTimeInput').value;

    function allDayTimeOutput() {
        if (allDayTimeInput != 0) {
            return allDayTimeInput + ' bleibt gleich';
        }

        function productivDayWorkLeft() {
            let workTook = productivDaysInput * productivDaysWorkLengthInput;
            let newWorkLength = workLengthInput - workTook;
            return newWorkLength;
        }

        function weekendAndWeekday() {
            let updatedWorkLength = 0;
            let weekendAndWeekdayLength = 0;
            let updatedAllNormalWorkLength = 0;
            let updatedAllweekendTimeInput = 0;
            while (productivDayWorkLeft() >= updatedWorkLength) {
                updatedAllNormalWorkLength += 5 * normalWorkLengthInput;
                updatedAllweekendTimeInput += 2 * weekendTimeInput;
                updatedWorkLength = updatedAllNormalWorkLength + updatedAllweekendTimeInput;
                weekendAndWeekdayLength += 7;
            }
            let remainingWork = updatedWorkLength - productivDayWorkLeft();
            let tooMuchDays = 0;
            for (let i = 1; i <= 2; i++) {
                if (remainingWork <= 0) {
                    break;
                }
                remainingWork -= weekendTimeInput;
                tooMuchDays += 1;
            }
            for (let i = 1; i <= 5; i++) {
                if (remainingWork <= 0) {
                    break;
                }
                remainingWork -= normalWorkLengthInput;
                tooMuchDays += 1;
            }

            function numberToPlus(takeNumber) {
                if (takeNumber < 0) {
                    return takeNumber * -1;
                } else {
                    return takeNumber;
                }
            }

            function remainingWorkString() {
                if (remainingWork !== 0) {
                    return ' und ' + numberToPlus(remainingWork) + ' an Arbeit übrig';
                } else {
                    return ' keine Arbeit übrig';
                }
            }

            let weekPlusProductivDay = 0;
            weekPlusProductivDay = weekendAndWeekdayLength + Number(productivDaysInput);
            let allDayUpdated = weekPlusProductivDay - Number(tooMuchDays) + remainingWorkString();
            return weekPlusProductivDay - Number(tooMuchDays) + remainingWorkString();
        }
        return weekendAndWeekday();
    }

    function workLengthOutput() {
        if (workLengthInput != 0) {
            return workLengthInput + ' bleibt gleich';
        }

        function productivDays() {
            return productivDaysInput * productivDaysWorkLengthInput;
        }

        function calculateNormalAndWeekendDays() {
            let updatedDayTime = 0;
            let updatedWeekendWork = 0;
            let updatedNormalWork = 0;
            let allWeekendAndNormalWork = 0;
            let allWeekAndWeekendDayMinusProductiv = allDayTimeInput - productivDaysInput;
            while (allWeekAndWeekendDayMinusProductiv >= updatedDayTime) {
                updatedNormalWork += normalWorkLengthInput * 5;
                updatedWeekendWork += weekendTimeInput * 2;
                updatedDayTime += 7;
            }
            let remainingDays = updatedDayTime - allWeekAndWeekendDayMinusProductiv;
            let tooMuchWeekendWork = 0;
            let tooMuchNormalWork = 0;
            for (let i = 1; i <= 2; i++) {
                if (remainingDays <= 0) {
                    break;
                }
                remainingDays -= 1;
                tooMuchWeekendWork += Number(weekendTimeInput);
            }
            for (let i = 1; i <= 5; i++) {
                if (remainingDays <= 0) {
                    break;
                }
                remainingDays -= 1;
                tooMuchNormalWork += Number(normalWorkLengthInput);
            }
            let tooMuchWeekendAndNormalWork = tooMuchNormalWork + tooMuchWeekendWork;
            allWeekendAndNormalWork = updatedNormalWork + updatedWeekendWork;
            return allWeekendAndNormalWork - tooMuchWeekendAndNormalWork;

        }
        return calculateNormalAndWeekendDays() + productivDays();
    }

    function normalWorkLengthOutput() {
        if (normalWorkLengthInput != 0) {
            return normalWorkLengthInput + ' bleibt gleich';
        }

        function productivWork() {
            return productivDaysInput * productivDaysWorkLengthInput;
        }

        function calculateNormalWorkLength() {
            let allDaysMinusProductiv = allDayTimeInput - productivDaysInput + 7;
            let allWorkMinusProductiv = workLengthInput - productivWork();
            let weekDayWork = 0;
            let normalSearch = 0;
            let loopWeeks = 0;
            let nextNormalDays = 0;
            for (let i = 7; i < allDaysMinusProductiv; i++) {
                if (i % 7 === 0) {
                    loopWeeks += 1;
                }
                if (loopWeeks * 7 === i) {
                    nextNormalDays = i + 5;
                }
                if (i < nextNormalDays) {
                    normalSearch += 1;
                } else {
                    weekDayWork += Number(weekendTimeInput);
                }
            }
            return (allWorkMinusProductiv - weekDayWork) / normalSearch;
        }
        return calculateNormalWorkLength()
    }

    function productivDaysOutput() {
        if (productivDaysInput != 0) {
            return productivDaysInput + ' bleibt gleich';
        }
        return 'nicht errechenbar';
    }

    function productivDaysWorkLengthOutput() {
        if (productivDaysWorkLengthInput != 0) {
            return productivDaysWorkLengthInput + ' bleibt gleich';
        }

        function calculateNormalAndWeekendWork() {
            let updatedDayTime = 0;
            let updatedWeekendWork = 0;
            let updatedNormalWork = 0;
            let allWeekendAndNormalWork = 0;
            let allWeekAndWeekendDayMinusProductiv = allDayTimeInput - productivDaysInput;
            while (allWeekAndWeekendDayMinusProductiv >= updatedDayTime) {
                updatedNormalWork += normalWorkLengthInput * 5;
                updatedWeekendWork += weekendTimeInput * 2;
                updatedDayTime += 7;
            }
            let remainingDays = updatedDayTime - allWeekAndWeekendDayMinusProductiv;
            let tooMuchWeekendWork = 0;
            let tooMuchNormalWork = 0;
            for (let i = 1; i <= 2; i++) {
                if (remainingDays <= 0) {
                    break;
                }
                remainingDays -= 1;
                tooMuchWeekendWork += Number(weekendTimeInput);
            }
            for (let i = 1; i <= 5; i++) {
                if (remainingDays <= 0) {
                    break;
                }
                remainingDays -= 1;
                tooMuchNormalWork += Number(normalWorkLengthInput);
            }
            let tooMuchWeekendAndNormalWork = tooMuchNormalWork + tooMuchWeekendWork;
            allWeekendAndNormalWork = updatedNormalWork + updatedWeekendWork;
            return allWeekendAndNormalWork - tooMuchWeekendAndNormalWork;

        }
        return (workLengthInput - calculateNormalAndWeekendWork()) / productivDaysInput;
    }

    function weekendTimeOutput() {
        if (weekendTimeInput != 0) {
            return weekendTimeInput + ' bleibt gleich';
        }

        function productivWork() {
            return productivDaysInput * productivDaysWorkLengthInput;
        }

        function calculateWeekWorkLength() {
            let allDaysMinusProductiv = allDayTimeInput - productivDaysInput + 7;
            let allWorkMinusProductiv = workLengthInput - productivWork();
            let weekSearch = 0;
            let normalDaysWork = 0;
            let loopWeeks = 0;
            let nextNormalDays = 0;
            for (let i = 7; i < allDaysMinusProductiv; i++) {
                if (i % 7 === 0) {
                    loopWeeks += 1;
                }
                if (loopWeeks * 7 === i) {
                    nextNormalDays = i + 5;
                }
                if (i < nextNormalDays) {
                    normalDaysWork += Number(normalWorkLengthInput);
                } else {
                    weekSearch++;
                }
            }
            return (allWorkMinusProductiv - normalDaysWork) / weekSearch;
        }
        return calculateWeekWorkLength();
    }

    document.getElementById('allDayTimeOutput').textContent = allDayTimeOutput();
    document.getElementById('workLengthOutput').textContent = workLengthOutput();
    document.getElementById('normalWorkLengthOutput').textContent = normalWorkLengthOutput();
    document.getElementById('productivDaysOutput').textContent = productivDaysOutput();
    document.getElementById('productivDaysWorkLengthOutput').textContent = productivDaysWorkLengthOutput();
    document.getElementById('weekendTimeOutput').textContent = weekendTimeOutput();
}
