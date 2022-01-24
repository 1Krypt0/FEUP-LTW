const URL = "http://twserver.alunos.dcc.fc.up.pt:9047/";

class MyRequest {
  constructor(method, url, obj) {
    this.method_ = method;
    this.url_ = url;
    this.obj_ = obj;
  }
  async sendRequest() {
    if (this.method_ === "GET") {
      try {
        /*const response_1 = await fetch(URL + this.url_);
        const data = await response_1.json();
        return data;*/

        let urlencoded = encodeURIComponent(
          "?nick=" + String(this.obj_.game) + "&game=" + String(this.obj_.nick)
        );

        const eventSource = new EventSource(URL + this.url_ + urlencoded); //no inicio

        eventSource.onstart = function () {
          console.log("Connection with server established");
        };

        eventSource.onmessage = function (event) {
          const data = JSON.parse(event.data);
        };

        eventSource.onerror = function (event) {
          console.log("Error:", event);
        };
        //eventSource.close();//quando terminar jogo

        return data;
      } catch (error) {
        console.log("Error:", error);
      }
    } else if (this.method_ === "POST") {
      try {
        const response_1 = await fetch(URL + this.url_, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "Access-Control-Allow-Origin",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(this.obj_),
        });
        const data = await response_1.json();
        return data;
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }
}

export { MyRequest };
