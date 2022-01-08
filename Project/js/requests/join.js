import { MyRequest } from "./requests.js";
const
const GROUP_ID = 44;

function join() {
    const request = new 

    let response = request.sendRequest();

    response.then(function (result) {
        processJoin(result);
    });
}

function processJoin(result) {}

function getParams() {
    const sizeInput = document.getElementById("pitNo");
    const seedInput = document.getElementById("seedNo");
    const size = sizeInput.value;
    const initial = seedInput.value;

    
}
