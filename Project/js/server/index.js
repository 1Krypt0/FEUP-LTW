const { log } = require("console");
const http = require("http");
const register = require("./handlers/register");
const PORT = 9047;

class Server {
  constructor() {}

  getServer() {
    return this.server;
  }

  initServer() {
    this.server = http.createServer((request, response) => {
      switch (request.method) {
        case "GET":
          this.handleGET(request, response);
          break;
        case "POST":
          let body = "";
          request.on("data", (chunk) => {
            body += chunk;
          });
          request.on("end", () => {
            this.handlePOST(request, response, body);
          });
          break;
        default:
          response.writeHead(404, "Unknown Request.");
          break;
      }
      response.end();
    });
  }

  listen() {
    this.server.listen(PORT);
  }

  handleGET(req, res) {
    const url = req.url.split("?")[0];
    switch (url) {
      case "/update":
        handleUpdate();
        break;
      default:
        const error = {
          error: "Invalid GET Request",
        };
        res.write(JSON.stringify(error));
    }
  }

  handlePOST(req, res, body) {
    const url = req.url.split("?")[0];
    switch (url) {
      case "/join":
        handleJoin();
        break;
      case "/leave":
        handleLeave();
        break;
      case "/notify":
        handleNotify();
        break;
      case "/ranking":
        handleRanking();
        break;
      case "/register":
        let response = register.handleRegister(body);
        res.write(JSON.stringify(response));
        console.log(JSON.stringify(response));
        break;
      default:
        const error = {
          error: "Invalid POST Request",
        };
        res.write(JSON.stringify(error));
    }
  }
}

const server = new Server();
server.initServer();
server.listen(PORT);
