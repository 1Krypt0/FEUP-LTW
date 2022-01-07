const URL = "http://twserver.alunos.dcc.fc.up.pt:8008/";

class Request {
    constructor(method, url, obj) {
        this.method_ = method;
        this.url_ = url;
        this.obj_ = obj;
        this.request = new XMLHttpRequest();
        this.addListeners();
    }

    addListeners() {
        function transferComplete(event) {
            alert("The transfer is complete.");
        }
        function transferFailed(event) {
            alert("An error occurred while transferring the file.");
        }
        function transferCanceled(event) {
            alert("The transfer has been canceled by the user.");
        }

        this.request.addEventListener("load", transferComplete);
        this.request.addEventListener("error", transferFailed);
        this.request.addEventListener("abort", transferCanceled);

        request.onprogress = function (e) {
            if (e.lengthComputable) {
                console.log(`${e.loaded} of ${e.total}  loaded!`);
            } else {
                console.log(`${e.loaded}  loaded!`);
            }
        };

        this.request.onreadystatechange = (e) => {
            console.log(this.request.responseText);
        };
    }

    sendRequest() {
        if (this.method_ === "GET") {
            this.request.open(this.method_, URL + this.url_, true);
            this.request.send();
        } else if (this.method_ === "POST") {
            request.open("post", URL + this.url_, true);
            request.setRequestHeader("Content-Type", "application/json");
            request.send(JSON.stringify(this.obj_));
        }
    }
}
