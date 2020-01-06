document.addEventListener("DOMContentLoaded", function() {
    let users;
    let counter:number = 0;
    const usersPlaceholder = document.querySelector('.users');
    window.addEventListener('scroll', () => {
        let scrollable: number = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled: number = window.scrollY;
        if(Math.ceil(scrolled) === scrollable){
            updatePage();
            
        }
    })
    updatePage();
    function updatePage(){
        getUsersFromApi().then(usersData => {
            users = usersData.results;
            users.map(user => {
                counter++;
                const userRow = document.createElement('p');
                const rowText = document.createTextNode(`User nr ${counter} Name: ${user.name.first} ${user.name.last} Email: ${user.email}`);
                userRow.appendChild(rowText);
                usersPlaceholder.appendChild(userRow);
                
            })
        })
    }
    function getUsersFromApi(){
        return fetch("https://randomuser.me/api/?results=30")
        .then(usersData => usersData.json());
    }
})