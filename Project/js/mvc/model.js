export class Mancala {
    constructor(size) {
        this.size_ = size;

        this.currentPlayer_ = "one";
        this.currentPits_ = Array(size).fill(4);
        this.otherPits_ = Array(size).fill(4);
        this.currentStore_ = 0;
        this.otherStore_ = 0;
    }

    getCurrentPlayer() {
        return this.currentPlayer_;
    }

    getOtherPlayer() {
        return this.currentPlayer_ === "one" ? "two" : "one";
    }

    getSize() {
        return this.size_;
    }

    getCurrentPits() {
        return this.currentPits_;
    }

    getOtherPits() {
        return this.otherPits_;
    }

    getCurrentStore() {
        return this.currentStore_;
    }

    getOtherStore() {
        return this.otherStore_;
    }

    getRightStoreIdx() {
        return this.getSize();
    }

    getLeftStoreIdx() {
        return this.getSize() * 2 + 1;
    }

    getStones(pit) {
        if (pit === this.getRightStoreIdx()) {
            return this.currentStore_;
        } else if (pit === this.getLeftStoreIdx()) {
            return this.otherStore_;
        } else if (pit < this.getSize()) {
            return this.currentPits_[pit];
        } else if (pit > this.getSize()) {
            return this.otherPits_[pit - (this.getSize() + 1)];
        }

        return NaN;
    }

    setCurrentPlayer(player) {
        this.currentPlayer_ = player;
    }

    setCurrentPits(pits) {
        this.currentPits_ = pits;
    }

    setOtherPits(pits) {
        this.otherPits_ = pits;
    }

    setCurrentStore(store) {
        this.currentStore_ = store;
    }

    setOtherStore(store) {
        this.otherStore_ = store;
    }

    setStones(pit, stones) {
        if (pit === this.getRightStoreIdx()) {
            this.currentStore_ = stones;
        } else if (pit === this.getLeftStoreIdx()) {
            this.otherStore_ = stones;
        } else if (pit < this.getSize()) {
            this.currentPits_[pit] = stones;
        } else if (pit > this.getSize()) {
            this.otherPits_[pit - (this.getSize() + 1)] = stones;
        }
    }

    addStones(pit, stones) {
        if (pit === this.getRightStoreIdx()) {
            this.currentStore_ += stones;
        } else if (pit === this.getLeftStoreIdx()) {
            this.otherStore_[pit] += stones;
        } else if (pit < this.getSize()) {
            this.currentPits_[pit] += stones;
        } else if (pit > 6) {
            this.otherPits_[pit - (this.getSize() + 1)] += stones;
        }
    }
}
