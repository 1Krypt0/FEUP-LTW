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
        // perform the player's action
        let turnOver = this.moveStones(pit);

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
        this.getModel().getCurrentPlayer() = this.getModel().getOtherPlayer();
        this.flipBoard();

        let currentPlayer = this.getModel().getCurrentPlayer();
        setTimeout(function () {
            document.getElementsByTagName("section").item(0).setAttribute("data-player", currentPlayer);
            document.querySelector(".current-player").textContent = player;
        }, 700);
    }

    checkGameOver() {
        let winner = this.checkWinner();

        if (winner < 0) {
            return false;
        }

        document.getElementsByTagName("section").item(0).classList.add("game-over");
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

        while (stones > 0) {
            ++pit;

            // wrap around the board before reaching other player's store
            if (pit > this.getModel().getSize() * 2) {
                pit = 0;
            }

            this.getModel().addStones(pit, 1);
            stones--;
        }

        // Invert the pit number (number of opposite pit in opponent's row)
        let inverse = (this.getModel().getSize() - 1) - pit;

        // Check for capture
        if (
            pit < this.getModel().getSize() &&
            this.getModel().getCurrentPits()[pit] === 1 &&
            this.getModel().getOtherPits()[inverse] > 0
        ) {
            // Transfer this pit's stones along with opposite pit's stones to store
            this.getModel().setCurrentStore(this.getModel().getCurrentStore() + this.getModel().getOtherPits()[inverse] + 1);

            // Clear the pits
            this.getModel().setStones(pit, 0);
            this.getModel().setStones(this.getModel().getSize() + 1 + inverse, 0);
        }

        // the user's turn ended if the stones did not end in the storage pit
        return pit !== 6;
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

        //TODO: This will fail, figure a way for it to not
        // Move the stones remaining in a player's row into their store
        if (currentPlayerOut && !otherPlayerOut) {
            for (let pit = 0; pit < this.getModel().getSize(); pit++) {
                this.getModel().setOtherStore(this.getModel().getCurrentStore() + this.getModel().getOtherPits()[pit]);
                this.getModel().setStones(pit + this.getModel().getSize(), 0);
            }
        } else if (otherPlayerOut && !currentPlayerOut) {
            for (let pit = 0; pit < this.getModel().getSize(); pit++) {
                this.getModel().setCurrentStore(this.getModel().getCurrentStore() + this.getModel().getCurrentPits()[pit]);
                this.getModel().setStones(pit, 0);
            }
        }

        if (this.getModel().getCurrentStore() > this.getModel().getOtherStore()) {
            // current player wins
            return this.getModel().getCurrentPlayer() === "one" ? 1 : 2;
        } else if (this.getModel().getOtherStore() > this.getModel().getCurrentStore()) {
            // other player wins
            return this.getModel().getCurrentPlayer() === "one" ? 2 : 1;
        } else {
            return 0;
        }
    }
}
