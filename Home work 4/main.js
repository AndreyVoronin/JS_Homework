// Задание 1:

var x = prompt('Введите число возводимое в степень');
var n = prompt('Введите степень');

if (n >= 1) {
    alert( pow(x, n) );
} else {
    alert('Степень должна быть натуральным числом');
}
function pow(x, n) {

    var result = x;

    for (var i = 1; i < n; i++) {
        result *= x;
    }

    return result;
}

// Задание 2:

// с использованием цикла:

function sumTo(n) {

    var result = 0;

    for(n; n >= 1; n--) {
        result += n;
    }

    return result;
}
sumTo(100);

// через рекурсию:

function sumTo(n) {
    return (n > 1) ? n + sumTo(n - 1) : n;
}
sumTo(100);

// с использованием формулы для суммы арифметической прогрессии:

function sumTo(n) {
    return (1 + n) / 2 * n;
}
sumTo(100);

/* самый быстрый вариант решения через формулу для суммы арифметической прогрессии, т.к. меньше всего
операций по вычислению суммы.
самый медленный через рекурсивные вызовы, т.к. больше всего операций, что потребляет большое кол-во памяти
компьютера.
посчитать при помощи рекурсии sumTo(100000) не получится, т.к. существует ограничение на рекурсионные
вызовы примерно 10000.
 */

// Задание 3:

function treeSum(arr) {
    var result = 0;

    for(var i =0; i < arr.length; i++) {
        if ( typeof arr[i] === 'number' && !(isNaN(arr[i])) ) {
            result += arr[i];
        } else if ( typeof arr[i] === 'object' && arr.length ) {
            result += treeSum(arr[i]);
        }
    }
    return result;
}

treeSum([5, 7,
    [4, [2], 8, [1, 3], 2],
    [9, []],
    1, 8]);




