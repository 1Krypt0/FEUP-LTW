// Get the modal
let modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
let span = document.getElementById("modal-close");

console.log(span);

window.onload = function () {
    modal.style.display = "block";
};

span.onclick = function () {
    modal.style.display = "none";
};
