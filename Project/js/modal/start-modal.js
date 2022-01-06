import { Board } from "../board.js";
import { Game, playGame } from "../mvc/script.js";

// Get the modal
let startModal = document.getElementById("myModal");

// Get the <span> element that closes the modal
let startModalCloser = document.getElementById("modal-close");

let parameters = document.getElementById("parameters");

parameters.onclick = function () {
    parameters;
    let seedAmount = document.getElementById("seedNo");
    let pitAmount = document.getElementById("pitNo");

    if (seedAmount.value === "") {
        seedAmount = 4;
    } else {
        seedAmount = Number(seedAmount.value);
    }
    if (pitAmount.value === "") {
        pitAmount = 6;
    } else {
        pitAmount = Number(pitAmount.value);
    }

    setGame(seedAmount, pitAmount);

    startModal.style.display = "none";
};

function setGame(seedAmount, pitAmount) {
    let board = new Board(pitAmount, seedAmount);
    board.render();
    playGame(pitAmount, seedAmount);
}
