class Board {
    constructor(size) {
        this.size_ = size;
    }

    getSize() {
        return this.size_;
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

let board = new Board(7);
board.render();
