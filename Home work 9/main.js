/** Задание 1:
 Переписать предыдущий пример с кошками на прототипный стиль ООП.*/


function Animal(name) {
    this._foodAmount = 50;
    this.name = name;
};

Animal.prototype._formatFoodAmount= function() {
    return this._foodAmount + 'гр.';
};

Animal.prototype.dailyNorm = function(amount) {

    if (!arguments.length) {
        return this._formatFoodAmount();
    }

    if (amount < 50 || amount > 500) {
        return 'Недопустимое количество корма.';
    }

    this._foodAmount = amount;
};

Animal.prototype.feed = function() {
    console.log('Насыпаем в миску ' + this.dailyNorm() + ' корма.');
};


function Cat(name) {
    Animal.apply(this, arguments);
}

Cat.prototype = Object.create(Animal.prototype);

Cat.prototype.feed = function() {
    Animal.prototype.feed.apply(this);
    console.log('Кот доволен ^_^');
    return this;
};

Cat.prototype.stroke = function() {
    console.log('Гладим кота.');
    return this;
};

var barsik = new Cat('Барсик');



/**Задание 2:
 Написать функцию глубокого клонирования объектов. Клонироваться должны значения всех типов данных (+ массивы
 и функции), а также любого уровня вложенности. Метод isArray использовать можно.
 Протестировать работу функции можно на таком примере:*/

var initialObj = {
    string: 'Vasya',
    number: 30,
    boolean: true,
    undefined: undefined,
    null: null,
    array: [1, 2, 3],
    object: {
        string2: 'Petrov',
        object2: {
            array2: [{}, {}]
        },
        object3: {}},
    method: function() {
        alert('Hello');
    }
};

function deepClone(initialObj) {
    var cloned = {};

    for (var key in initialObj) {

        if (typeof (initialObj[key]) !== 'object' || initialObj[key] === null) {
            cloned[key] = initialObj[key];
            continue;

        } else if (typeof (initialObj[key]) === 'object' && !Array.isArray(initialObj[key])) {
            cloned[key] = deepClone(initialObj[key]);

        } else if (Array.isArray(initialObj[key])) {

            var cloneArr = initialObj[key];

            function deepCloneArr(cloneArr) {

                var arr = [];

                for (var i = 0; i < cloneArr.length; i++) {

                    if (typeof (cloneArr[i]) !== 'object' || cloneArr[i] === null) {
                        arr.push(cloneArr[i]);
                        continue;

                    } else if (typeof (cloneArr[i]) === 'object' && !Array.isArray(cloneArr[i])) {
                        arr.push(deepClone(cloneArr[i]));
                        continue;

                    } else if (Array.isArray(cloneArr[i])) {
                        arr.push(deepCloneArr(cloneArr[i]));
                    }
                }
                return arr;
            }

            cloned[key] = deepClone(cloneArr);
        }

    }
    return cloned;
};

var clonedObj = deepClone(initialObj);
console.log(initialObj);
console.log(clonedObj);



/** Задание 3:
 Написать функцию глубокого сравнения объектов. Сравниваться должны значения всех типов, а также любого уровня
 вложенности. Хорошо протестировать работу функции.*/


function compareObj(obj1, obj2) {
    var keyArrObj1 = [],
        keyArrObj2 = [];

    for (var key in obj1) {
        keyArrObj1.push(key);
    }

    for (var key in obj2) {
        keyArrObj2.push(key);
    }

    if (keyArrObj1.length !== keyArrObj2.length) {
        return 'Объекты не равны';
    }

    var numberEq = 0;

    for (var i = 0; i < keyArrObj1.length; i++) {
        for (var j = 0; j < keyArrObj2.length; j++) {
            if (keyArrObj1[i] === keyArrObj2[j]) {
                numberEq++;
            }
        }
    }

    if (numberEq !== keyArrObj1.length || numberEq !== keyArrObj2.length) {
        return 'Объекты не равны';
    }

    for (var k in obj1) {
        for (var n in obj2) {
            if (k === n) {

                if ((typeof (obj1[k]) !== 'object' && typeof (obj1[k]) !== 'function') || obj1[k] === null) {
                    if (obj1[k] !== obj2[n]) {
                        return 'Объекты не равны';
                    }
                }

                else if (typeof (obj1[k]) === 'object' && !Array.isArray(obj1[k]) && typeof (obj2[n]) === 'object'
                    && !Array.isArray(obj2[n])) {
                    if (compareObj(obj1[k], obj2[n]) === 'Объекты не равны') {
                        return 'Объекты не равны';
                    }
                }

                else if (typeof (obj1[k]) === 'function' && typeof (obj2[n]) === 'function') {
                    if (obj1[k].toString() !== obj2[n].toString()) return 'Объекты не равны';
                } else {
                    return 'Объекты не равны';
                }

            }
        }
    }
    return 'Объекты равны';
}