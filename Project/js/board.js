export class Board {
    constructor(size, seeds) {
        this.size_ = size;
        this.seeds_ = size;
    }

    getSize() {
        return this.size_;
    }
    getSeeds() {
        return this.seeds_;
    }
    render() {
        let rowOne = document.querySelector(".row.player-one");
        let rowTwo = document.querySelector(".row.player-two");

        for (let i = 0; i < this.getSize(); i++) {
            let pitPlayer1 = document.createElement("div");
            let pitPlayer2 = document.createElement("div");
            pitPlayer1.classList.add("pit");
            pitPlayer2.classList.add("pit");

            rowOne.appendChild(pitPlayer1);
            rowTwo.appendChild(pitPlayer2);
        }
    }
}
