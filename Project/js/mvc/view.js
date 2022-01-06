import { SeedView } from "./viewers/seedview.js";

export class MancalaView {
    constructor(model) {
        this.model_ = model;
        this.seedView = new SeedView();
    }

    getModel() {
        return this.model_;
    }

    resetPit(pit) {
        if (pit === null) {
            return;
        }
        while (pit.children.length != 0) {
            pit.removeChild(pit.firstChild);
        }
    }

    drawPit(pit, amount) {
        for (let i = 0; i < amount; i++) {
            pit.appendChild(this.seedView.render());
        }
    }

    resetPitNo(pitNo) {
        let row = undefined;
        let pit = undefined;
        if (pitNo < this.getModel().getSize()) {
            row = document.querySelector(".row.player-one");
            pit = row.children.item(pitNo);
        } else {
            row = document.querySelector(".row.player-two");
            pit = row.children.item(pitNo - this.getModel().getSize() - 1);
        }
        this.resetPit(pit);
    }

    drawPitNo(pitNo) {
        let row = undefined;
        let amount = undefined;
        let pit = undefined;
        if (pitNo < this.getModel().getSize()) {
            row = document.querySelector(".row.player-one");
            amount = this.getModel().getPlayer1Pits()[pitNo];
            pit = row.children.item(pitNo);
        } else {
            row = document.querySelector(".row.player-two");
            amount =
                this.getModel().getPlayer2Pits()[
                    pitNo - this.getModel().getSize() - 1
                ];

            pit = row.children.item(pitNo - this.getModel().getSize() - 1);
        }

        this.drawPit(pit, amount);
    }

    resetStore(store) {
        while (store.children.length != 0) {
            store.removeChild(store.firstChild);
        }
    }

    drawStore(store, amount) {
        for (let i = 0; i < amount; i++) {
            store.appendChild(this.seedView.render());
        }
    }

    resetStoreNo(store) {
        if (store === this.getModel().getSize()) {
            store = document.querySelector(".store.player-one");
        } else {
            store = document.querySelector(".store.player-two");
        }

        this.resetStore(store);
    }

    resetAllStores() {
        let player1Store = document.querySelector(".store.player-one");
        let player2Store = document.querySelector(".store.player-two");

        this.resetStore(player1Store);
        this.resetStore(player2Store);
    }

    resetAllPits() {
        let player1Row = document.querySelector(".row.player-one");
        let player2Row = document.querySelector(".row.player-two");

        for (let i = 0; i < this.getModel().getSize(); i++) {
            const player1Pit = player1Row.children.item(i);
            const player2Pit = player2Row.children.item(i);
            this.resetPit(player1Pit);
            this.resetPit(player2Pit);
        }
    }

    resetBoard() {
        this.resetAllPits();
        this.resetAllStores();
    }

    drawStoreNo(storeNo) {
        let store = undefined;
        let amount = undefined;
        if (storeNo === this.getModel().getSize()) {
            store = document.querySelector(".store.player-one");

            amount = this.getModel().getPlayer1Store();
        } else {
            store = document.querySelector(".store.player-two");

            amount = this.getModel().getPlayer2Store();
        }

        this.drawStore(store, amount);
    }

    drawStores() {
        let player1Store = document.querySelector(".store.player-one");
        let player2Store = document.querySelector(".store.player-two");

        this.drawStore(player1Store, this.getModel().getPlayer1Store());
        this.drawStore(player2Store, this.getModel().getPlayer2Store());
    }

    drawAllPits() {
        let player1Pits = document.querySelector(".row.player-one");

        let player2Pits = document.querySelector(".row.player-two");

        let arr = this.getModel().getPlayer1Pits();
        for (let i = 0; i < arr.length; i++) {
            const pit = player1Pits.children.item(i);
            this.drawPit(pit, arr[i]);
        }

        arr = this.getModel().getPlayer2Pits();
        for (let i = 0; i < arr.length; i++) {
            const pit = player2Pits.children.item(i);
            this.drawPit(pit, arr[i]);
        }
    }

    renderPitNo(pit) {
        this.resetPitNo(pit);
        this.drawPitNo(pit);
    }

    renderStoreNo(store) {
        this.resetStoreNo(store);
        this.drawStoreNo(store);
    }

    drawBoard() {
        this.drawAllPits();
        this.drawStores();
    }

    render() {
        this.resetBoard();
        this.drawBoard();
    }
}
