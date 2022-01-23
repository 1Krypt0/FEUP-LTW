export class Game {
  constructor(size, seeds) {
    this.model_ = new Mancala(size, seeds);
    this.controller_ = new MancalaController(this.model_, this.view_);
  }

  getModel() {
    return this.model_;
  }

  getController() {
    return this.controller_;
  }
}
