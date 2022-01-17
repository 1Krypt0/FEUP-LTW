const http = require("http");
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
          this.handlePOST(request, response);
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
    switch (req.url) {
    }
  }

  handlePOST(req, res) {}
}
