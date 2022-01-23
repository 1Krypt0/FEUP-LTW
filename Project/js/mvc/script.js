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

export function playGame(size, seeds) {
    let game = new Game(size, seeds);
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
            } else {
                console.log(game);
                console.log("Error: " + result.error);
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

    /*for (let pit = 0; pit < row.length; pit++) {
      row[pit].setAttribute("data-pit", pit);
      row[pit].onclick = clickAction;
    }
  };*/

  bindPitsAction(
    "one",
    document.querySelectorAll(".row.player-one .pitAndTracker")
  );
  bindPitsAction(
    "two",
    document.querySelectorAll(".row.player-two .pitAndTracker")
  );
}
