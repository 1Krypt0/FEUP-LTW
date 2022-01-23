const fs = require("fs");
const crypto = require("crypto");

const GAME_STARTED = null;
let PLAYER_1 = null;
let PLAYER_2 = null;

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

  const currentDate = new Date();
  const time =
    currentDate.getFullYear().toString() +
    (currentDate.getMonth() + 1).toString() +
    currentDate.getDate().toString() +
    currentDate.getHours().toString() +
    currentDate.getMinutes().toString();

  const GAME_DATA =
    data.group.toString() +
    data.nick +
    data.password +
    data.initial.toString() +
    data.size.toString() +
    time;

  const GAME_HASH = crypto.createHash("md5").update(GAME_DATA).digest("hex");
  console.log(GAME_HASH);

  return [{}, 200];
};
