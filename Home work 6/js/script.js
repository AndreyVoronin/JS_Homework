var humburger = document.querySelector('.js-humburger');
var navigation = document.querySelector('.js-navigation');

humburger.addEventListener('click', function () {
    navigation.classList.toggle('active');
    humburger.classList.toggle('active');
})