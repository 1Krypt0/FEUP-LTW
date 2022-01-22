import { MancalaController } from "./controller.js";
import { MancalaView } from "./view.js";
import { Mancala } from "./model.js";
import { nick, pass, isEmpty } from "../requests/auth/login.js";
import { GAME_ID } from "../requests/join.js";
import { MyRequest } from "../requests/requests.js";

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
        let processNotify = function (result, pit) {
            if (isEmpty(result)) {
                if (
                    game.getModel().getCurrentPlayer() === player &&
                    waitingForMove
                ) {
                    waitingForMove = false;
                    if (!game.getController().doPlayerTurn(pit)) {
                        waitingForMove = true;
                    }
                }
                /*const myTimeout = setTimeout(function () {
                  leaveGame(game, nick, password
                }, 5000);*/

            } else {
              console.log(game);
              console.log("Error: " + result.error);
            }

            document.getElementById("score1").innerHTML=game.getController().getScore(1);
            document.getElementById("score2").innerHTML=game.getController().getScore(2);

            if(document.getElementById("ai").checked){
              game.getController().ai_play();
              console.log(game.getModel().getCurrentPlayer());
            } 
        };
        

        let notify = function () {
            const move = Number(this.getAttribute("data-pit"));
            const data = {
                nick: nick,
                password: pass,
                game: GAME_ID,
                move: move,
            };

            const request = new MyRequest("POST", "notify", data);

            let response = request.sendRequest();

            let pit = this;
            response.then((result) => {
                processNotify(result, pit);
            });
        };

        for (let pit = 0; pit < row.length; pit++) {
            row[pit].setAttribute("data-pit", pit);
            row[pit].onclick = notify;
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
