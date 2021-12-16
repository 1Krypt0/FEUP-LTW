import { MancalaController } from "./controller.js";
import { MancalaView } from "./view.js";
import { Mancala } from "./model.js";

class Game {
    constructor() {
        this.model_ = new Mancala(6);
        this.view_ = new MancalaView(this.model_);
        this.controller_ = new MancalaController(this.model_, this.view_);
    }

    getModel() {
        return this.model_;
    }

    getController() {
        return this.controller_;
    }

    init() {
        this.view_.render();
    }
}

function playGame() {
    let game = new Game();
    let waitingForMove = true;

    game.init();

    let bindPitsAction = function (player, row) {
        let clickAction = function () {
            console.log(this);
            if (
                game.getModel().getCurrentPlayer() === player &&
                waitingForMove
            ) {
                waitingForMove = false;
                let pit = parseInt(this.getAttribute("data-pit"));
                if (!game.getController().doPlayerTurn(pit)) {
                    waitingForMove = true;
                }
            }
        };

        for (let pit = 0; pit < row.length; pit++) {
            row[pit].setAttribute("data-pit", pit);
            row[pit].onclick = clickAction;
        }
    };

    bindPitsAction("one", document.querySelectorAll(".row.player-one .pit"));
    bindPitsAction("two", document.querySelectorAll(".row.player-two .pit"));
}

playGame();
