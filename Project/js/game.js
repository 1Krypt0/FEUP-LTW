import { Mancala } from "./mancala.js";

export class Game {
    constructor(currentPlayer) {
        this.currentPlayer_ = currentPlayer === "one" ? "one" : "two";
        this.mancala_ = new Mancala(this);

        this.currentPlayerPits_ = null;
        this.otherPlayerPits_ = null;
        this.currentPlayerStore_ = null;
        this.otherPlayerStore_ = null;
    }

    init() {
        this.refreshQueries();
        this.drawAllStones();
    }

    getOtherPlayer() {
        return this.currentPlayer_ === "one" ? "two" : "one";
    }

    refreshQueries() {
        this.currentPlayerPits_ = document.querySelectorAll(
            ".row.player-" + this.player + " .pit div"
        );

        if (this.currentPlayerPits_ == null) {
            this.currentPlayerPits_ = 0;
        } else {
            this.currentPlayerPits_ = this.currentPlayerPits_.length;
        }

        this.otherPlayerPits_ = document.querySelectorAll(
            ".row.player-" + this.getOtherPlayer() + " .pit div"
        );

        if (this.otherPlayerPits_ == null) {
            this.otherPlayerPits_ = 0;
        } else {
            this.otherPlayerPits_ = this.otherPlayerPits_.length;
        }

        this.currentPlayerStore_ = document.querySelector(
            ".store.player-" + this.currentPlayer_ + " div"
        );

        if (this.currentPlayerStore_ == null) {
            this.currentPlayerStore_ = 0;
        } else {
            this.currentPlayerStore_ = this.currentPlayerStore_.length;
        }

        this.otherPlayerStore_ = document.querySelector(
            ".store.player-" + this.getOtherPlayer() + " div"
        );

        if (this.otherPlayerStore_ == null) {
            this.otherPlayerStore_ = 0;
        } else {
            this.otherPlayerStore_ = this.otherPlayerStore_.length;
        }
    }

    doPlayerTurn(pit) {
        // perform the player's action
        let turnOver = this.mancala_.moveStones(pit);

        // make sure that a player hasn't run out of stones
        if (this.checkGameOver()) {
            this.resetGame();
            return true;
        }

        // change the player if the current turn is ended
        if (turnOver) {
            this.switchTurn();
        }

        this.saveGame();
        return false;
    }

    switchTurn() {
        this.currentPlayer_ = this.getOtherPlayer();
        this.mancala_.flipBoard();
        this.refreshQueries();
        this.drawAllStones();

        let currentPlayer = this.currentPlayer_;
        setTimeout(function () {
            document.body.setAttribute("data-player", currentPlayer);
            document.querySelector(".current-player").textContent = player;
        }, 700);
    }

    checkGameOver() {
        let winner = this.checkWinner();

        if (winner < 0) {
            return false;
        }

        document.body.classList.add("game-over");
        let status = document.querySelector(".status");

        // Determine which player holds the most stones
        if (winner === 1) {
            status.textContent = "Player one wins!";
        } else if (winner === 2) {
            status.textContent = "Player two wins!";
        } else {
            status.textContent = "Draw!";
        }

        this.player = "";
        return true;
    }

    checkWinner() {
        let isRowEmpty = function (pits) {
            return pits.every(function (stones) {
                return stones === 0;
            });
        };

        const currentPlayerOut = isRowEmpty(this.mancala_.currentPits_); //TODO: Change to getter and setter
        const otherPlayerOut = isRowEmpty(this.mancala_.otherPits_);

        // the game is not over if neither player has an empty row
        if (!currentPlayerOut && !otherPlayerOut) {
            return -1;
        }

        // Move the stones remaining in a player's row into their store
        if (currentPlayerOut && !otherPlayerOut) {
            for (let pit = 0; pit < 6; pit++) {
                this.mancala_.otherStore_ += this.otherPits_[pit];
                this.mancala_.otherPits_[pit] = 0;
            }
        } else if (otherPlayerOut && !currentPlayerOut) {
            for (let pit = 0; pit < 6; pit++) {
                this.mancala_.currentStore_ += this.currentPits_[pit];
                this.mancala_.currentPits_[pit] = 0;
            }
        }

        this.drawAllStones(); //TODO: Find out why this is here

        if (this.mancala_.currentStore_ > this.mancala_.otherStore_) {
            // current player wins
            return this.currentPlayer_ === "one" ? 1 : 2;
        } else if (this.mancala_.otherStore_ > this.mancala_.currentStore_) {
            // other player wins
            return this.currentPlayer_ === "one" ? 2 : 1;
        } else {
            return 0;
        }
    }

    drawAllStones() {
        let format = function (stones) {
            return stones === 0 ? "" : stones;
        };

        this.currentPlayerStore_ = format(this.mancala_.currentStore_);
        this.otherPlayerStore_ = format(this.mancala_.otherStore_);

        for (let pit = 0; pit < 6; pit++) {
            this.currentPlayerPits_[pit] = format(
                this.mancala_.currentPits_[pit]
            );
            this.otherPlayerPits_[pit] = format(this.mancala_.otherPits_[pit]);
        }
    }

    drawStones(pit) {
        let format = function (stones) {
            return stones === 0 ? "" : stones;
        };

        if (pit === 6) {
            this.currentPlayerStore_.textContent = format(
                this.mancala_.currentStore_
            );
        } else if (pit === 13) {
            this.otherPlayerStore_.textContent = format(
                this.mancala_.otherStore_
            );
        } else if (pit < 6) {
            this.currentPlayerPits_[pit].textContent = format(
                this.mancala_.currentPits_[pit]
            );
        } else if (pit > 6) {
            pit -= 7;
            this.otherPlayerPits_[pit].textContent = format(
                this.mancala_.otherPits_[pit]
            );
        }
    }

    loadGame() {
        /* Remove old items */
        if (localStorage.getItem("stones")) {
            localStorage.removeItem("stones");
            localStorage.removeItem("player");
        }

        if (localStorage.getItem("currentPits")) {
            this.mancala_.currentStore_ = parseInt(
                localStorage.getItem("currentStore")
            );
            this.mancala_.otherStore_ = parseInt(
                localStorage.getItem("otherStore")
            );

            this.mancala_.currentPits_ = JSON.parse(
                localStorage.getItem("currentPits")
            );
            this.mancala_.otherPits_ = JSON.parse(
                localStorage.getItem("otherPits")
            );

            if ("two" === localStorage.getItem("currentPlayer")) {
                this.switchTurn();
            }
        } else {
            this.saveGame();
        }
    }

    saveGame() {
        localStorage.setItem("currentPlayer", this.currentPlayer_);

        localStorage.setItem(
            "currentStore",
            JSON.stringify(this.mancala_.currentStore_)
        );
        localStorage.setItem(
            "otherStore",
            JSON.stringify(this.mancala_.otherStore_)
        );

        localStorage.setItem(
            "currentPits",
            JSON.stringify(this.mancala_.currentPits_)
        );
        localStorage.setItem(
            "otherPits",
            JSON.stringify(this.mancala_.otherPits_)
        );
    }

    resetGame() {
        localStorage.removeItem("currentPlayer");
        localStorage.removeItem("currentStore");
        localStorage.removeItem("otherStore");
        localStorage.removeItem("currentPits");
        localStorage.removeItem("otherPits");
    }
}
