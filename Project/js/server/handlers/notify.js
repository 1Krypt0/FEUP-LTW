const game = require("./join");

exports.handleNotify = function (body) {
  const data = JSON.parse(body);
  console.log(data);

  if (data.nick === undefined) {
    return [{ error: "User not defined" }, 400];
  } else if (data.password === undefined) {
    return [{ error: "Password not defined" }, 400];
  } else if (data.game === undefined) {
    return [{ error: "Game not defined" }, 400];
  } else if (data.move === undefined) {
    return [{ error: "Move not defined" }, 400];
  }

  console.log(game.GAME);

  if (game.GAME === null) {
    return [{ error: "No game with ID of " + data.game }, 400];
  }

  if (game.GAME.getModel().getCurrentPlayer() !== data.nick) {
    return [{ error: "Not your turn to play" }, 400];
  }

  if (isNaN(parseInt(data.move))) {
    return [{ error: "Invalid move" }, 400];
  }

  const move = parseInt(data.move);

  if (move < 0 || move >= game.GAME.getModel().getPlayer2StoreIdx()) {
    return [{ error: "Invalid move" }, 400];
  }
};

function makeMove(game, move) {}
