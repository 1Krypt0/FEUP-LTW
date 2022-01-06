// Get the modal
let authModal = document.getElementById("auth-modal");
let startModal = document.getElementById("myModal");

let loginSubmit = document.getElementById("login-submit");

let registerSubmit = document.getElementById("register-submit");

loginSubmit.onclick = function () {
    authModal.style.display = "none";
    startModal.style.display = "block";
};

window.onload = function () {
    authModal.style.display = "block";
};
