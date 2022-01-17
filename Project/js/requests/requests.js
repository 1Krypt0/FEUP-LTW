const URL = "http://twserver.alunos.dcc.fc.up.pt:8008/";

class MyRequest {
  constructor(method, url, obj) {
    this.method_ = method;
    this.url_ = url;
    this.obj_ = obj;
  }

  async sendRequest() {
    if (this.method_ === "GET") {
      try {
        const response_1 = await fetch(URL + this.url_);
        const data = await response_1.json();
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
