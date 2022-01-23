const fs = require("fs");
const crypto = require("crypto");

const GAME_STARTED = null;

exports.handleJoin = function (body) {
  console.log(body);
  return [{}, 200];
};
