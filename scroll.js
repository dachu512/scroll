document.addEventListener("DOMContentLoaded", function () {
    var users;
    var counter = 0;
    var usersPlaceholder = document.querySelector('.users');
    window.addEventListener('scroll', function () {
        var scrollable = document.documentElement.scrollHeight - window.innerHeight;
        var scrolled = window.scrollY;
        if (Math.ceil(scrolled) === scrollable) {
            updatePage();
        }
    });
    updatePage();
    function updatePage() {
        getUsersFromApi().then(function (usersData) {
            users = usersData.results;
            users.map(function (user) {
                counter++;
                var userRow = document.createElement('p');
                var rowText = document.createTextNode("User nr " + counter + " Name: " + user.name.first + " " + user.name.last + " Email: " + user.email);
                userRow.appendChild(rowText);
                usersPlaceholder.appendChild(userRow);
            });
        });
    }
    function getUsersFromApi() {
        return fetch("https://randomuser.me/api/?results=30")
            .then(function (usersData) { return usersData.json(); });
    }
});
