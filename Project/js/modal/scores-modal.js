// Get the modal
let scoresModal = document.getElementById("scores-modal");

let scoresButton = document.getElementById("scores");

// Get the <span> element that closes the modal
let instructionsCloserr = document.getElementById("scores-modal-close");

scoresButton.onclick = function () {
  scoresModal.style.display = "block";
};

instructionsCloserr.onclick = function () {
  scoresModal.style.display = "none";
};
