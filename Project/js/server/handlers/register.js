exports.handleRegister = function (body) {
  const data = JSON.parse(body);
  const res = {};
  let nick, pass;

  for (const key in data) {
    if (key === "nick") {
      nick = data[key];
    } else if (key === "pass") {
      pass = data[key];
    } else {
      return { error: "Invalid parameter in request" };
    }
  }

  if (nick === undefined) {
    return { error: "Nick not specified" };
  }

  if (pass === undefined) {
    return { error: "Password not specified" };
  }

  return {};
};
