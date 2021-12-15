import { Game } from "./game.js";

class Play {
    constructor() {
        this.game = new Game("one");
        this.waitingForMove = true;
    }

    setup() {
        bindPitsAction(
            "one",
            document.querySelectorAll(".row.player-one .pit")
        );
        bindPitsAction(
            "two",
            document.querySelectorAll(".row.player-two .pit")
        );
    }

    start() {
        this.game.loadGame();
        this.game.init();
    }

    bindPitsAction(player, row) {
        let clickAction = function () {
            if (game.currentPlayer_ === player && waitingForMove) {
                waitingForMove = false;
                let pit = parseInt(this.getAttribute("data-pit"));
                if (!game.doPlayerTurn(pit)) {
                    waitingForMove = true;
                }
            }
        };

        for (let pit = 0; pit < row.length; pit++) {
            row[pit].setAttribute("data-pit", pit);
            row[pit].onclick = clickAction;
        }
    }
}

const game = new Play();
game.setup();
game.start();
