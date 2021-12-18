export class MancalaController {
    constructor(model, view) {
        this.model_ = model;
        this.view_ = view;
    }

    getModel() {
        return this.model_;
    }

    getView() {
        return this.view_;
    }

    doPlayerTurn(pit) {
        let pitNo = parseInt(pit.getAttribute("data-pit"));
        // perform the player's action
        let turnOver = this.moveStones(pitNo);

        // make sure that a player hasn't run out of stones
        if (this.checkGameOver()) {
            return true;
        }

        // change the player if the current turn is ended
        if (turnOver) {
            this.switchTurn();
        }

        return false;
    }

    switchTurn() {
        this.getModel().setCurrentPlayer(this.getModel().getOtherPlayer());
        this.flipBoard();

        let currentPlayer = this.getModel().getCurrentPlayer();
        setTimeout(function () {
            document
                .getElementsByTagName("section")
                .item(0)
                .setAttribute("data-player", currentPlayer);
            let player = document.querySelector(".current-player").textContent;
            if (player === "one") {
                document.querySelector(".current-player").textContent = "two";
            } else if (player === "two") {
                document.querySelector(".current-player").textContent = "one";
            }
        }, 700);
    }

    checkGameOver() {
        let winner = this.checkWinner();

        if (winner < 0) {
            return false;
        }

        document
            .getElementsByTagName("section")
            .item(0)
            .classList.add("game-over");
        let status = document.querySelector(".status");

        // Determine which player holds the most stones
        if (winner === 1) {
            status.innerHTML = "Player one wins!";
        } else if (winner === 2) {
            status.innerHTML = "Player two wins!";
        } else {
            status.innerHTML = "Draw!";
        }

        return true;
    }

    flipBoard() {
        let currentPitsSwap = this.getModel().getCurrentPits();
        this.getModel().setCurrentPits(this.getModel().getOtherPits());
        this.getModel().setOtherPits(currentPitsSwap);

        let currentStoreSwap = this.getModel().getCurrentStore();
        this.getModel().setCurrentStore(this.getModel().getOtherStore());
        this.getModel().setOtherStore(currentStoreSwap);
    }

    moveStones(pit) {
        // return if pit has no stones
        if (this.getModel().getStones(pit) < 1) {
            return false;
        }

        // take stones out of pit
        let stones = this.getModel().getStones(pit);
        this.getModel().setStones(pit, 0);

        this.getView().renderPitNo(pit);

        while (stones > 0) {
            ++pit;

            // wrap around the board before reaching other player's store
            if (pit > this.getModel().getSize() * 2) {
                pit = 0;
            }

            this.getModel().addStones(pit, 1);
            stones--;

            if (
                pit === this.getModel().getSize() ||
                pit === this.getModel().getSize() * 2 + 1
            ) {
                this.getView().renderStoreNo(pit);
            } else {
                this.getView().renderPitNo(pit);
            }
        }

        // Invert the pit number (number of opposite pit in opponent's row)
        let inverse = this.getModel().getSize() - 1 - pit;

        // Check for capture
        if (
            pit < this.getModel().getSize() &&
            this.getModel().getCurrentPits()[pit] === 1 &&
            this.getModel().getOtherPits()[inverse] > 0
        ) {
            // Transfer this pit's stones along with opposite pit's stones to store
            this.getModel().setCurrentStore(
                this.getModel().getCurrentStore() +
                    this.getModel().getOtherPits()[inverse] +
                    1
            );

            this.getView().renderStoreNo(this.getModel().getSize());

            // Clear the pits
            this.getModel().setStones(pit, 0);

            this.getView().renderPitNo(pit);

            this.getModel().setStones(
                this.getModel().getSize() + 1 + inverse,
                0
            );

            this.getView().renderPitNo(this.getModel().getSize() + 1 + inverse);
        }

        // the user's turn ended if the stones did not end in the storage pit
        return pit !== this.getModel().getSize();
    }

    checkWinner() {
        let isRowEmpty = function (pits) {
            return pits.every(function (stones) {
                return stones === 0;
            });
        };

        const currentPlayerOut = isRowEmpty(this.getModel().getCurrentPits());
        const otherPlayerOut = isRowEmpty(this.getModel().getOtherPits());

        // the game is not over if neither player has an empty row
        if (!currentPlayerOut && !otherPlayerOut) {
            return -1;
        }

        if (currentPlayerOut && !otherPlayerOut) {
            for (let pit = 0; pit < this.getModel().getSize(); pit++) {
                this.getModel().setOtherStore(
                    this.getModel().getCurrentStore() +
                        this.getModel().getOtherPits()[pit]
                );
                this.getView().renderStoreNo(this.getModel().getSize() * 2 + 1);
                this.getModel().setStones(pit + this.getModel().getSize(), 0);
                this.getView().renderPitNo(pit + this.getModel().getSize());
            }
        } else if (otherPlayerOut && !currentPlayerOut) {
            for (let pit = 0; pit < this.getModel().getSize(); pit++) {
                this.getModel().setCurrentStore(
                    this.getModel().getCurrentStore() +
                        this.getModel().getCurrentPits()[pit]
                );
                this.getView().renderStoreNo(this.getModel().getSize());
                this.getModel().setStones(pit, 0);
                this.getView().renderPitNo(pit);
            }
        }

        if (
            this.getModel().getCurrentStore() > this.getModel().getOtherStore()
        ) {
            // current player wins
            return this.getModel().getCurrentPlayer() === "one" ? 1 : 2;
        } else if (
            this.getModel().getOtherStore() > this.getModel().getCurrentStore()
        ) {
            // other player wins
            return this.getModel().getCurrentPlayer() === "one" ? 2 : 1;
        } else {
            return 0;
        }
    }
}
