import { MyRequest } from "../requests.js";

const loginButton = document.getElementById("login-submit");

function login() {
    const request = new MyRequest("POST", "register", getLoginUserData());

    let response = request.sendRequest();

    response.then(function (result) {
        processLogin(result);
    });
}

function getLoginUserData() {
    const username = document.getElementById("username-login");
    const password = document.getElementById("password-login");

    const data = {
        nick: username.value,
        password: password.value,
    };

    return data;
}

function processLogin(result) {
    const authModal = document.getElementById("auth-modal");
    const paramsModal = document.getElementById("myModal");
    if (isEmpty(result)) {
        const navbar = document.getElementById("navbar");
        let name = document.createElement("li");
        name.innerHTML = "<h2>" + getLoginUserData().nick + "</h2>";
        navbar.appendChild(name);

        console.log(navbar.children);
        authModal.style.display = "none";
        paramsModal.style.display = "block";
    } else {
        const form = document.getElementById("login-form");
        const error = document.createElement("span");
        error.innerHTML = "Wrong username and Password combination";

        form.appendChild(error);
    }
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

loginButton.onclick = login;