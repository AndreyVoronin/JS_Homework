/**Задание 1:
Переписать задачу с использованием перебирающего метода массивов:
function filterNumbersArr(numbers) {
    var newArr = [];

    for (var i = 0; i < numbers.length; i++) {
        var el = numbers[i];

        if (el > 0) {
            newArr[newArr.length] = el;
        }
    }

    return newArr;
}

filterNumbersArr([-1, 0, 2, 34, -2]);*/


var numbers = [-1, 0, 2, 34, -2];

var newArr = numbers.filter(function (number) {

    return number > 0;
});



/**Задание 2:
Написать функцию, принимающую массив чисел и возвращающую первое найденное положительное число.*/


var firstPositive = numbers.find(function (number) {

    return number > 0;
});


/**Задание 3:
Написать функцию, которая будет определять, является ли переданное в нее слово палиндромом (напр. шалаш).
    Регистр в словах учитываться не должен. Тестировать функцию можно только на одиночных словах (без фраз).

 Функция должна работать следущим образом:
 isPalindrome('шалаШ'); // true
 isPalindrome('привет'); // false*/


function isPalindrome(word) {
    var reverse = word.toLowerCase().split('').reverse().join('');

    return reverse === word.toLowerCase();
};

isPalindrome('шалаШ');
isPalindrome('привет');


/**Задание 4:
 Написать функцию, которая будет определять, являются ли переданные в нее слова анаграммами (напр. кот и отк).
 Регистр в словах учитываться не должен.

 Функция должна работать следущим образом:
 areAnagrams('кот', 'отк'); // true
 areAnagrams('кот', 'атк'); // false */


function areAnagrams(word1, word2) {

    return word1.toLowerCase().split('').sort().join('') ===
        word2.toLowerCase().split('').sort().join('');
};

areAnagrams('кот', 'отк');
areAnagrams('кот', 'атк');



/**Задание 5:
Написать функцию, которая будет разбивать массив на под-массивы определенной длины.

    Функция должна работать следущим образом:
    divideArr([1, 2, 3, 4], 2); // [[1, 2], [3, 4]]
divideArr([1, 2, 3, 4, 5, 6, 7, 8], 3); // [[1, 2, 3], [4, 5, 6], [7, 8]]*/


function divideArr(arr, i) {
    var newDivideArr = [];

     while (arr.length) {
         newDivideArr.push(arr.splice(0, i));
     }
     return newDivideArr;
}

divideArr([1, 2, 3, 4], 2);
divideArr([1, 2, 3, 4, 5, 6, 7, 8], 3);