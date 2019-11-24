var table = document.getElementsByTagName('tbody')[0];

table.addEventListener('click', function (event) {
    var target = event.target,
        containerTd = document.getElementsByTagName('td');

    if (target === containerTd[containerTd.length-1]) {
        var newTr = document.createElement('tr');
        newTr.innerHTML = '<td></td><td></td><td></td>';
        table.insertBefore(newTr, document.getElementsByTagName('tr')[0]);

    } else {
        var text = target.textContent;
        target.innerHTML = '<input type="text">';
        var input = document.getElementsByTagName('input')[0];

        input.focus();
        input.value += text;
        input.onblur = function () {
            input.parentNode.textContent = input.value;
        };
        input.onkeypress = function(event) {
            if (event.keyCode === 13) {
                input.parentNode.textContent = input.value;
            }
        };
    }
});