import { MyRequest } from "../requests.js";

const registerButton = document.getElementById("register-submit");

function register() {
    const request = new MyRequest("POST", "register", getRegisterUserData());

    request.sendRequest();

    if (request.getResponse() !== "") {
    }
}

function getRegisterUserData() {
    const username = document.getElementById("username-login");
    const password = document.getElementById("password-login");

    const data = {
        nick: username.value,
        password: password.value,
    };

    return data;
}

registerButton.onclick = register;
