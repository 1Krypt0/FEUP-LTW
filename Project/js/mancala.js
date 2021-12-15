export class Mancala {
    constructor(game, size) {
        this.game_ = game;
        this.size_ = size;

        this.currentPits_ = [4, 4, 4, 4, 4, 4];
        this.otherPits_ = [4, 4, 4, 4, 4, 4];
        this.currentStore_ = 0;
        this.otherStore_ = 0;
    }

    flipBoard() {
        let currentPitsSwap = this.currentPits_;
        this.currentPits_ = this.otherPits_;
        this.otherPits_ = currentPitsSwap;

        let currentStoreSwap = this.currentStore_;
        this.currentStore_ = this.otherStore_;
        this.otherStore_ = currentStoreSwap;
    }

    getStones(pit) {
        if (pit === 6) {
            return this.currentStore_;
        } else if (pit === 13) {
            return this.otherStore_;
        } else if (pit < 6) {
            return this.currentPits_[pit];
        } else if (pit > 6) {
            return this.otherPits_[pit - 7];
        }

        return NaN;
    }

    setStones(pit, stones) {
        if (pit === 6) {
            this.currentStore_ = stones;
        } else if (pit === 13) {
            this.otherStore_ = stones;
        } else if (pit < 6) {
            this.currentPits_[pit] = stones;
        } else if (pit > 6) {
            this.otherPits_[pit - 7] = stones;
        }
    }

    addStones(pit, stones) {
        if (pit === 6) {
            this.currentStore_ += stones;
        } else if (pit === 13) {
            this.otherStore_[pit] += stones;
        } else if (pit < 6) {
            this.currentPits_[pit] += stones;
        } else if (pit > 6) {
            this.otherPits_[pit - 7] += stones;
        }
    }

    moveStones(pit) {
        // return if pit has no stones
        if (this.getStones(pit) < 1) {
            return false;
        }

        // take stones out of pit
        let stones = this.getStones(pit);
        this.setStones(pit, 0);
        this.game.drawStones(pit);

        while (stones > 0) {
            ++pit;

            // wrap around the board before reaching other player's store
            if (pit > 12) {
                pit = 0;
            }

            this.addStones(pit, 1);
            stones--;
            this.game.drawStones(pit);
        }

        // Invert the pit number (number of opposite pit in opponent's row)
        let inverse = 5 - pit;

        // Check for capture
        if (
            pit < 6 &&
            this.currentPits_[pit] === 1 &&
            this.otherPits_[inverse] > 0
        ) {
            // Transfer this pit's stones along with opposite pit's stones to store
            this.currentStore_ += this.otherPits_[inverse] + 1;
            this.game.drawStones(6);

            // Clear the pits
            this.currentPits_[pit] = 0;
            this.otherPits_[inverse] = 0;
            this.game.drawStones(pit);
            this.game.drawStones(12 - pit);
        }

        // the user's turn ended if the stones did not end in the storage pit
        return pit !== 6;
    }
}
