import { MyRequest } from "./requests.js";

let RANKING = undefined;

function ranking() {
    const request = new MyRequest("POST", "ranking", {});

    let response = request.sendRequest();

    response.then((result) => {
        processRanking(result);
    });
}

function processRanking(result) {
    console.log(result);
    RANKING = result;
    //TODO: Add to scoreboard modal when complete.
}
