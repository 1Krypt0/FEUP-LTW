import { MyRequest } from "./requests.js";
import { nick } from "./auth/login.js";
import {GAME_ID} from "./join.js";

function update() {
    const request = new MyRequest("GET", "update", getParams());

    let response = request.sendRequest();

    response.then(function (result) {
        processUpdate(result);
    });
}

function getParams() {
    let data = {
        game: GAME_ID,
        nick: nick,
    };

    return data;
}

function processUpdate(data){

}