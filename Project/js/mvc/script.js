import { MancalaController } from "./controller.js";
import { MancalaView } from "./view.js";
import { Mancala } from "./model.js";

export class Game {
    constructor(size, seeds) {
        this.model_ = new Mancala(size, seeds);
        this.view_ = new MancalaView(this.model_);
        this.controller_ = new MancalaController(this.model_, this.view_);
    }

    getModel() {
        return this.model_;
    }

    getView() {
        return this.view_;
    }

    getController() {
        return this.controller_;
    }

    init() {
        this.getView().render();
    }
}

var game;

export function playGame(size, seeds) {
    game = new Game(size, seeds);
    let waitingForMove = true;

    game.init();

    let bindPitsAction = function (player, row) {
        let clickAction = function () {
            if (
                game.getModel().getCurrentPlayer() === player &&
                waitingForMove
            ) {
                waitingForMove = false;
                let pit = this;
                if (!game.getController().doPlayerTurn(pit)) {
                    waitingForMove = true;
                }
                /*const myTimeout = setTimeout(function () {
                  leaveGame(game, nick, password)
                }, 5000);*/

            }

            document.getElementById("score1").innerHTML=game.getController().getScore(1);
            document.getElementById("score2").innerHTML=game.getController().getScore(2);

            if(document.getElementById("ai").checked){
              game.getController().ai_play();
              console.log(game.getModel().getCurrentPlayer());
            }
        };

        for (let pit = 0; pit < row.length; pit++) {
            row[pit].setAttribute("data-pit", pit);
            row[pit].onclick = clickAction;
        }
    };

    bindPitsAction(
        "one",
        document.querySelectorAll(".row.player-one .pitAndTracker")
    );
    bindPitsAction(
        "two",
        document.querySelectorAll(".row.player-two .pitAndTracker")
    );

    document.getElementById("reset").addEventListener('click', reset);
}

function reset() {
  //player wins
  /*if(game.getModel().getCurrentPlayer()=="two"){
    game.getController().switchTurn()
  }*/

  let status = document.querySelector(".status");

  if (game.getController().getScore(1) > game.getController().getScore(2)) {
    status.innerHTML = "Player one wins!";
  } else if (game.getController().getScore(2) > game.getController().getScore(1)) {
    status.innerHTML = "Player two wins!";
  } else {
    status.innerHTML = "Draw!";
  }
  game.getController().addScoreStorage();
  playGame();
}
