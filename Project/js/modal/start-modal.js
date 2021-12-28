// Get the modal
let startModal = document.getElementById("myModal");

// Get the <span> element that closes the modal
let startModalCloser = document.getElementById("modal-close");

window.onload = function () {
    startModal.style.display = "block";
};

startModalCloser.onclick = function () {
    startModal.style.display = "none";
};
