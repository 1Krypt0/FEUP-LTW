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
            let pitAndCounter1 = document.createElement("div");
            let pitAndCounter2 = document.createElement("div");
            let pitPlayer1 = document.createElement("div");
            let pitPlayer2 = document.createElement("div");
            let pitTracker1 = document.createElement("div");
            let pitTracker2 = document.createElement("div");
            pitAndCounter1.classList.add("tracker");
            pitAndCounter2.classList.add("tracker");
            pitPlayer1.classList.add("pit");
            pitPlayer2.classList.add("pit");

            pitAndCounter1.appendChild(pitTracker1);
            pitAndCounter1.appendChild(pitPlayer1);

            pitAndCounter2.appendChild(pitTracker2);
            pitAndCounter2.appendChild(pitPlayer2);

            rowOne.appendChild(pitAndCounter1);
            rowTwo.appendChild(pitAndCounter2);
        }
    }
}
