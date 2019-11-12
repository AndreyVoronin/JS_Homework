/**Задание 1:
 Написать функцию, принимающую массив имен и возвращающую массив объектов вида {name: 'Vasya'}.*/

function changeArrOfNames(array) {
    return array.map(function (item) {
        return {
            name: item
        };
    });
}

changeArrOfNames(['Andrew', 'Alex', 'Serg', 'Anna', 'Olga']);


/**Задание 2:
 Написать функцию, принимающую массив вида ['00', '13', '24'] и возвращающую строку "Текущее время : 00 : 13 : 24".
 Для решения использовать перебирающий метод массивов.*/

function currentTime(array) {
    return array.reduce(function (prevValue, currentValue) {
        return prevValue + ' : ' + currentValue;
    }, 'Текущее время');
}

currentTime(['00', '13', '24']);


/**Задание 3:
Написать чистую функцию, которая будет возвращать количество гласных в переданном тексте. Регистр любой. Решение не
должно быть "топорным".*/

function countLetter(str) {
    var arrFromStr = str.toLowerCase().split(''),
        arrLetters = ['а', 'о', 'и', 'е', 'ё', 'э', 'ы', 'у', 'ю', 'я'],
        count = 0;

    for (var i = 0; i < arrFromStr.length; i++) {
        if (arrLetters.some(function (value) {
            return value === arrFromStr[i];
        })) {
            count++;
        }
    }

    return count;

}
countLetter('Написать чистую функцию, которая будет возвращать количество гласных в переданном тексте.');


/**Задание 4:
Написать функцию, которая будет принимать текст в качестве параметра. У текста должны быть пробелы, точки, запятые,
    восклицательные и вопросительные знаки. Текст необходимо разбить на предложения (по точкам, восклицательным и
вопросительным знакам - убрав их - разрешается использовать регулярное выражение в методе split).
Для каждого из предложений вывести текст предложения и рядом количество букв в нем (без учета пробелов, запятых
и т.д. - именно букв).*/

function divideText(str) {
    var arrStr = str.split(/[.!?]/);
    arrStr.pop();

    var lastStr = arrStr[arrStr.length - 1];

    if (/[а-яА-ЯA-Za-z]/.test(lastStr[lastStr.length-1])) {
        arrStr.splice(arrStr.length-1, 1);
    }

    function arrStrLength(arr) {
        var arrLength = arr.split('').filter(deleteSymbol).length;

        function deleteSymbol(str) {

            return str !== ' ' && str !== ',';

        }

        return arr.trim() + ' - ' + arrLength + ' букв';

    }

    return arrStr.map(arrStrLength);

}

divideText('Скажи-ка, дядя, ведь не даром Москва, спаленная пожаром, ' +
    'Французу отдана? Ведь были ж схватки боевые, ' +
    'Да, говорят, еще какие! Недаром помнит вся Россия Про день Бородина.');