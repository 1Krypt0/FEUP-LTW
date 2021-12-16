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
}
