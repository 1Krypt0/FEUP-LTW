import { Mancala } from "../model/model";
import { MancalaController } from "../controller/controller";

export class Game {
  constructor(size, seeds, player1, player2) {
    this.model_ = new Mancala(size, seeds, player1, player2);
    this.controller_ = new MancalaController(this.model_);
  }

  getModel() {
    return this.model_;
  }

  getController() {
    return this.controller_;
  }
}
