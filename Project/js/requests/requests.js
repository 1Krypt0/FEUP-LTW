const URL = "http://twserver.alunos.dcc.fc.up.pt:8008/";

class MyRequest {
    constructor(method, url, obj) {
        this.method_ = method;
        this.url_ = url;
        this.obj_ = obj;
        this.request = new XMLHttpRequest();
        this.response = undefined;
        this.addListeners();
    }

    addListeners() {
        function transferComplete(event) {
            console.log("The transfer is complete.");
        }
        function transferFailed(event) {
            console.log("An error occurred while transferring the file.");
        }
        function transferCanceled(event) {
            console.log("The transfer has been canceled by the user.");
        }

        this.request.addEventListener("load", transferComplete);
        this.request.addEventListener("error", transferFailed);
        this.request.addEventListener("abort", transferCanceled);

        this.request.onprogress = function (e) {
            if (e.lengthComputable) {
                console.log(`${e.loaded} of ${e.total}  loaded!`);
            } else {
                console.log(`${e.loaded}  loaded!`);
            }
        };

        this.request.onreadystatechange = (e) => {
            this.response = this.request.responseText;
        };
    }

    sendRequest() {
        if (this.method_ === "GET") {
            this.request.open(this.method_, URL + this.url_, true);
            this.request.send();
        } else if (this.method_ === "POST") {
            this.request.open("post", URL + this.url_, true);
            this.request.setRequestHeader("Content-Type", "application/json");
            this.request.send(JSON.stringify(this.obj_));
        }
    }
    getResponse() {
        return this.response;
    }
}
