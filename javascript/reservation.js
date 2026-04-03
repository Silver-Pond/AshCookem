function reservation() {
    document.getElementById("reservationOverlay").style.display = "flex";
}

function closeReservation() {
    document.getElementById("reservationOverlay").style.display = "none";
}

// Optional: close when clicking outside the form
window.onclick = function (event) {
    const overlay = document.getElementById("reservationOverlay");
    if (event.target === overlay) {
        overlay.style.display = "none";
    }
};