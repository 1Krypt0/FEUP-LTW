import { SeedView } from "./viewers/seedview.js";

//TODO: Divide into more granular views.
export class MancalaView {
    constructor(model) {
        this.model_ = model;
        this.seedView = new SeedView();
    }

    getModel() {
        return this.model_;
    }

    resetPit(pit) {
        while (pit.children.length != 0) {
            pit.removeChild(pit.firstChild);
        }
    }

    resetPitNo(pitNo) {
        let row = undefined;
        let pit = undefined;
        if (pitNo < this.getModel().getSize()) {
            row = document.querySelector(
                ".row.player-" + this.getModel().getCurrentPlayer()
            );

            pit = row.children.item(pitNo);
        } else {
            row = document.querySelector(
                ".row.player-" + this.getModel().getOtherPlayer()
            );
            pit = row.children.item(pitNo - this.getModel().getSize() - 1);
        }
        this.resetPit(pit);
    }

    resetStore(store) {
        while (store.children.length != 0) {
            store.removeChild(store.firstChild);
        }
    }

    resetStoreNo(store) {
        if (store === this.getModel().getSize()) {
            store = document.querySelector(
                ".store.player-" + this.getModel().getCurrentPlayer()
            );
        } else {
            store = document.querySelector(
                ".store.player-" + this.getModel().getOtherPlayer()
            );
        }

        this.resetStore(store);
    }

    resetAllStores() {
        let currentPlayerStore = document.querySelector(
            ".store.player-" + this.getModel().getCurrentPlayer()
        );
        let otherPlayerStore = document.querySelector(
            ".store.player-" + this.getModel().getOtherPlayer()
        );

        this.resetStore(currentPlayerStore);
        this.resetStore(otherPlayerStore);
    }

    resetAllPits() {
        let currentRowPit = document.querySelector(
            ".row.player-" + this.getModel().getCurrentPlayer()
        );
        let otherRowPit = document.querySelector(
            ".row.player-" + this.getModel().getOtherPlayer()
        );

        for (let i = 0; i < this.getModel().getSize(); i++) {
            const currentPlayerPit = currentRowPit.children.item(i);
            const otherPlayerPit = otherRowPit.children.item(i);
            this.resetPit(currentPlayerPit);
            this.resetPit(otherPlayerPit);
        }
    }

    resetBoard() {
        this.resetAllPits();
        this.resetAllStores();
    }

    drawPit(pit, amount) {
        for (let i = 0; i < amount; i++) {
            pit.appendChild(this.seedView.render());
        }
    }

    drawPitNo(pitNo) {
        let row = undefined;
        let amount = undefined;
        let pit = undefined;
        if (pitNo < this.getModel().getSize()) {
            row = document.querySelector(
                ".row.player-" + this.getModel().getCurrentPlayer()
            );
            amount = this.getModel().getCurrentPits()[pitNo];
            pit = row.children.item(pitNo);
        } else {
            row = document.querySelector(
                ".row.player-" + this.getModel().getOtherPlayer()
            );
            amount =
                this.getModel().getOtherPits()[
                    pitNo - this.getModel().getSize() - 1
                ];

            pit = row.children.item(pitNo - this.getModel().getSize() - 1);
        }

        this.drawPit(pit, amount);
    }

    drawStoreNo(storeNo) {
        let store = undefined;
        let amount = undefined;
        if (storeNo === this.getModel().getSize()) {
            store = document.querySelector(
                ".store.player-" + this.getModel().getCurrentPlayer()
            );

            amount = this.getModel().getCurrentStore();
        } else {
            store = document.querySelector(
                ".store.player-" + this.getModel().getOtherPlayer()
            );

            amount = this.getModel().getOtherStore();
        }

        this.drawStore(store, amount);
    }

    drawStore(store, amount) {
        for (let i = 0; i < amount; i++) {
            store.appendChild(this.seedView.render());
        }
    }

    drawStores() {
        let currentPlayerStore = document.querySelector(
            ".store.player-" + this.getModel().getCurrentPlayer()
        );
        let otherPlayerStore = document.querySelector(
            ".store.player-" + this.getModel().getOtherPlayer()
        );

        this.drawStore(currentPlayerStore, this.getModel().getCurrentStore());
        this.drawStore(otherPlayerStore, this.getModel().getOtherStore());
    }

    drawAllPits() {
        let currentRowPit = document.querySelector(
            ".row.player-" + this.getModel().getCurrentPlayer()
        );

        let otherRowPit = document.querySelector(
            ".row.player-" + this.getModel().getOtherPlayer()
        );

        let arr = this.getModel().getCurrentPits();
        for (let i = 0; i < arr.length; i++) {
            const pit = currentRowPit.children.item(i);
            this.drawPit(pit, arr[i]);
        }

        arr = this.getModel().getOtherPits();
        for (let i = 0; i < arr.length; i++) {
            const pit = otherRowPit.children.item(i);
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

    renderCurrentStore() {
        let store = document.querySelector(
            ".store.player-" + this.getModel().getCurrentPlayer()
        );
        this.resetStore(store);
        this.drawStore(store);
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
