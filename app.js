const game = document.getElementById("game");

class Seed {
    constructor(rotation, x, y) {
        this.rotation = rotation;
        this.xPos = x;
        this.yPos = y;
    }
    render() {
        return '<div class="piece"></div>';
    }
}

class Cell {
    constructor() {}
    render() {
        return '<div class="cell"></div>';
    }
}

class Storage {
    constructor() {}
    render() {
        return '<div class="cell storage"></div>';
    }
}

class Row {
    constructor(size) {
        this.cells = new Array(size);
        for (let index = 0; index < this.cells.length; index++) {
            this.cells[index] = new Cell();
        }
    }

    render() {
        let ret = '<div class="row">';
        for (let index = 0; index < this.cells.length; index++) {
            this.cells[index].render();
        }
        return ret + "</div>";
    }
}

class Cells {
    constructor(size) {
        this.player1Cells = new Row(size);
        this.player2Cells = new Row(size);
        return;
    }
    render() {
        return this.player1Cells.render() + this.player2Cells.render();
    }
}

class Board {
    constructor(size) {
        this.player1Storage = new Storage();
        this.cellArray = new Cells(size);
        this.player2Storage = new Storage();
    }

    render() {
        return (
            this.player1Storage.render() +
            this.cellArray.render() +
            this.player2Storage.render()
        );
    }
}

board = new Board(5);

game.innerHTML += board.render();
