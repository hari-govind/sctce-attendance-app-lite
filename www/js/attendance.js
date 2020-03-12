var controller = {
    clearLogin: function() {
        localStorage.clear();
        window.location = 'index.html';
    }
}
const login = document.getElementById("clear");
login.addEventListener('click', controller.clearLogin);