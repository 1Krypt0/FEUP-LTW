const http = require("http");
const PORT = 9047;

const server = http.createServer((request, response) => {
  switch (request.method) {
    case "GET":
      handleGET(request, response);
      break;
    case "POST":
      handlePOST(request, response);
      break;
    default:
      response.writeHead(404, "Unknown Request.");
      break;
  }
  response.end();
});

server.listen(PORT);
