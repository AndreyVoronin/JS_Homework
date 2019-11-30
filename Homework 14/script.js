var getUsers = document.getElementsByTagName('button')[0],
    wrapper = document.getElementsByClassName('wrapper')[0];

getUsers.addEventListener('click', function () {
    if (!(localStorage.length)) {
        var dataUsers = new XMLHttpRequest();
        dataUsers.open('GET', 'https://reqres.in/api/users?page=2');
        dataUsers.send();

        dataUsers.onerror = function () {
            wrapper.innerHTML = '<span>Что то пошло не так, данные с сервера не получены!</span>';
        }

        dataUsers.onload = function () {
            try {
                if (dataUsers.status === 200) {
                    localStorage.setItem('data', dataUsers.response);

                    getUsersHtml();
                } else {
                    wrapper.innerHTML = '<span>Что то пошло не так, данные с сервера не получены!</span>';
                }
            } catch (err) {
                wrapper.innerHTML = '<span>Что то пошло не так, данные с сервера не получены!</span>';
            }
        }
    } else {

        getUsersHtml();
    }
});

function getUsersHtml() {
    var users = JSON.parse(localStorage.getItem('data')).data,
        containerUserList = wrapper.appendChild(document.createElement('div')),
        containerUserInfo = wrapper.appendChild(document.createElement('div'));

    for (var i = 0; i < users.length; i++) {
        containerUserList.innerHTML += '<div class="user_number">User ' + (i + 1) + '</div>';
        containerUserInfo.innerHTML += '<div class="user_info"><img src="' + users[i]['avatar'] + '">' +
            '<div class="info"><p>First Name: ' + users[i]['first_name'] + '</p>' +
            '<p>Last Name: ' + users[i]['last_name'] + '</p><p>E-mail: ' + users[i]['email'] + '</p></div></div>';

        var firstInfoBlock = document.getElementsByClassName('user_info')[0].classList.add('vision'),
            firstMember = document.getElementsByClassName('user_number')[0].classList.add('active');
    }
    var members = document.getElementsByClassName('user_number');
    getUsers.classList.add('hidden');

    containerUserList.addEventListener('click', function (event) {
        var target = event.target,
            members = document.getElementsByClassName('user_number'),
            infoBlock = document.getElementsByClassName('user_info');

        for (var i = 0; i < members.length; i++) {
            if (target === members[i]) {
                members[i].classList.add('active');
                infoBlock[i].classList.add('vision');
            } else {
                members[i].classList.remove('active');
                infoBlock[i].classList.remove('vision');
            }
        }
    }, true);
}