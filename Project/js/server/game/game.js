const mancalaModel = require("../model/model");
const mancalaController = require("../controller/controller");

class Game {
  constructor(size, seeds, player1, player2) {
    this.model_ = new mancalaModel.Mancala(size, seeds, player1, player2);
    this.controller_ = new mancalaController.MancalaController(this.model_);
  }

  getModel() {
    return this.model_;
  }

  getController() {
    return this.controller_;
  }
}

exports.Game = Game;
