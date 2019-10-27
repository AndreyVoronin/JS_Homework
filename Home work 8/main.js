/** Практическое задание 4:
Создать класс Animal. Перенести в него все свойства и методы. Отнаследоваться внутри Cat от Animal.
    Расширить метод feed для кошек. Теперь он должен выводить в консоль информацию вида:
    "Насыпаем в миску (количество гр.) корма.
Кот доволен ^_^"
Использовать вызов родительского метода вида animalFeed() и сохранение контекста this через переменную.
    Все вызовы, которые работали ранее, должны по-прежнему работать корректно.
 Практическое задание 5:
 Добавить публичный метод stroke, который будет выводить в консоль информацию "Гладим кота.".
 Доделать метод feed таким образом, чтобы можно было цепочкой вызывать его и метод stroke в любой
 последовательности и сколько угодно раз.
 (Лишние логи можно убрать, делать всё в том же задании).*/

function Animal(name){
    this._foodAmount = 50;
    var self = this;
    self._formatFoodAmount = function() {
        return self._foodAmount + ' гр.';
    };

    this.dailyNorm = function(amount) {
        if (!arguments.length) return self._formatFoodAmount();

        if (amount < 50 || amount > 500) {
            return 'Недопустимое количество корма.';
        }

        self._foodAmount = amount;
    };

    this.name = name;

    this.feed = function() {
        console.log('Насыпаем в миску ' + self.dailyNorm() + ' корма.');
    };
}

function Cat(name){
    Animal.apply(this, arguments);
    var animalFeed = this.feed;

    this.feed = function () {
        animalFeed();
        console.log('Кот доволен ^_^');
        return this;
    };
    this.stroke = function () {
        console.log('Гладим кота');
        return this;
    };
}
