const fs = require("fs");
const crypto = require("crypto");

exports.CAN_GAME_START = false;
exports.PLAYER_1 = null;
exports.PLAYER_2 = null;

exports.handleJoin = function (body) {
  const data = JSON.parse(body);

  if (data.group === undefined) {
    console.log("Group not defined");
    return [{ error: "Group not defined" }, 400];
  } else if (data.nick === undefined) {
    console.log("User not defined");
    return [{ error: "User not defined" }, 400];
  } else if (data.password === undefined) {
    console.log("Password not defined");
    return [{ error: "Password not defined" }, 400];
  } else if (data.initial === undefined) {
    console.log("Initial seed amount not defined");
    return [{ error: "Initial seed amount not defined" }, 400];
  } else if (data.size === undefined) {
    console.log("Board size not defined");
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
      exports.CAN_GAME_START = true;
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
