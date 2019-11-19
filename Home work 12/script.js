var button = document.getElementsByTagName('button')[0],
    inputX = document.getElementById('x'),
    inputY = document.getElementById('y');



button.setAttribute('disabled', 'true');

document.addEventListener('keyup', function () {
    (inputX.value.trim() && inputY.value.trim()) ? button.removeAttribute('disabled') : button.setAttribute
    ('disabled', 'true');
});



button.addEventListener('click', function addTable() {
    if (document.getElementsByTagName('table')[0]) {
        document.getElementsByTagName('table')[0].remove();
    }

    if (inputX.value < 1 || inputX.value > 10 || inputY.value < 1 || inputY.value > 10 || isNaN(inputX.value) || isNaN(inputY.value)) {
        alert('Введите целые числа от 1 до 10 в поля X и Y');
    } else {
        var chessTable = document.createElement('table'),
            container = document.getElementsByTagName('body')[0],
            chessBoard = container.appendChild(chessTable);

        chessBoard.classList.add('table');

        for (var i = 0; i < inputY.value; i++) {
            var yTr = document.createElement('tr');
            chessBoard.appendChild(yTr);
            for (var k = 0; k < inputX.value; k++) {
                var xTd = document.createElement('td');
                if (k % 2 == i % 2) {
                    document.getElementsByTagName('tr')[i].appendChild(xTd).
                    classList.add('td-black', 'td');
                } else {
                    document.getElementsByTagName('tr')[i].appendChild(xTd).
                    classList.add('td');
                }
            }
        }
    }
});

document.addEventListener('click', function (event) {
    var target = event.target;

    while (target != this) {

        if (target.tagName === 'TABLE' ) {
            for (var i = 0; i < document.getElementsByTagName('td').length; i++) {
            document.getElementsByTagName('td')[i].classList.toggle('td-black');
            }
            return;
        }
        target = target.parentNode;
    }
});