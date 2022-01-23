const fs = require("fs");
const crypto = require("crypto");

const GAME_STARTED = null;

exports.handleJoin = function (body) {
  if (body.group === undefined) {
    return [{ error: "Group not defined" }, 400];
  } else if (body.nick === undefined) {
    return [{ error: "User not defined" }, 400];
  } else if (body.password === undefined) {
    return [{ error: "Password not defined" }, 400];
  } else if (body.initial === undefined) {
    return [{ error: "Initial seed amount not defined" }, 400];
  } else if (body.size === undefined) {
    return [{ error: "Board size not defined" }, 400];
  }

  return [{}, 200];
};
