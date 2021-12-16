import { SeedView } from "./seedview.js";

export class PitView {
    constructor(pit) {
        this.pit_ = pit;
        this.seedView = new SeedView();
    }

    getPit() {
        return this.pit_;
    }

    addSeed(amount) {
        for (let i = 0; i < amount; i++) {
            const seed = this.seedView.render();
            this.getPit().appendChild(seed);
        }
    }

    removeSeed(amount) {
        for (let i = 0; i < amount; i++) {
            this.getPit().removeChild(this.getPit().firstChild);
        }
    }
}
