const fs = require("fs");
const crypto = require("crypto");

exports.PLAYER_1 = null;
exports.PLAYER_2 = null;

exports.handleJoin = function (body) {
  const data = JSON.parse(body);

  if (data.group === undefined) {
    return [{ error: "Group not defined" }, 400];
  } else if (data.nick === undefined) {
    return [{ error: "User not defined" }, 400];
  } else if (data.password === undefined) {
    return [{ error: "Password not defined" }, 400];
  } else if (data.initial === undefined) {
    return [{ error: "Initial seed amount not defined" }, 400];
  } else if (data.size === undefined) {
    return [{ error: "Board size not defined" }, 400];
  }

  const GAME_HASH = createGameHash(data.group, data.initial, data.size);

  if (PLAYER_1 === null && PLAYER_2 === null) {
    PLAYER_1 = data.nick;
    return [{ game: GAME_HASH }, 200];
  }

  if (PLAYER_1 !== null && PLAYER_2 === null) {
    if (PLAYER_1 !== data.nick) {
      PLAYER_2 = data.nick;

      //TODO: Create a game

      return [{ game: GAME_HASH }, 200];
    } else {
      return [{ error: "User already playing" }, 400];
    }
  }

  return [{ error: "Game already has two players" }, 400];
};

function createGameHash(group, initial, size) {
  const currentDate = new Date();
  const time =
    currentDate.getFullYear().toString() +
    (currentDate.getMonth() + 1).toString() +
    currentDate.getDate().toString() +
    currentDate.getHours().toString() +
    currentDate.getMinutes().toString();

  const gameData =
    group.toString() + initial.toString() + size.toString() + time;

  return crypto.createHash("md5").update(gameData).digest("hex");
}
