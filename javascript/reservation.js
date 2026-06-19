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
/**
 * REFERENCE LIST
 *
 * Canva, n.d. Graphic design platform (images, icons and visual assets used in website design). [online]. Available at: https://www.canva.com/
 * [Accessed 3 April 2026].
 *
 * Duckett, J., 2011. HTML and CSS: Design and Build Websites. Indianapolis: John Wiley & Sons.
 *
 * Mozilla Developer Network (MDN), n.d. JavaScript basics. [online]. Available at: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics
 * [Accessed 3 April 2026].
 *
 * Mozilla Developer Network (MDN), n.d. Using Fetch and asynchronous JavaScript (Promises and async/await). [online]. Available at: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous
 * [Accessed 3 April 2026].
 *
 * Mozilla Developer Network (MDN), n.d. Document Object Model (DOM). [online]. Available at: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
 * [Accessed 3 April 2026].
 *
 * Supabase, n.d. Supabase JavaScript Client Documentation. [online]. Available at: https://supabase.com/docs/reference/javascript
 * [Accessed 3 April 2026].
 *
 * jsDelivr, n.d. jsDelivr CDN for open source libraries. [online]. Available at: https://www.jsdelivr.com/
 * [Accessed 3 April 2026].
 *
 * W3Schools, n.d. JavaScript Tutorial. [online]. Available at: https://www.w3schools.com/js/
 * [Accessed 3 April 2026].
 * */