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
};
