/**
 * Opens the reservation modal by setting its CSS display property to 'flex'.
 * This UI manipulation relies on standard DOM manipulation techniques.
 * * @see (Mozilla Developer Network [MDN], n.d.-b) for DOM property manipulation.
 * @see (W3Schools, n.d.) for basic JavaScript style changes.
 */
function reservation() {
    // Accesses the DOM element and modifies its layout style to make it visible
    document.getElementById("reservationOverlay").style.display = "flex";
}

/**
 * Closes the reservation modal by hiding it from the view.
 * * @see (Mozilla Developer Network [MDN], n.d.-b) for Element selection and styling.
 */
function closeReservation() {
    // Hides the overlay by setting display to 'none'
    document.getElementById("reservationOverlay").style.display = "none";
}

/**
 * Global event listener to handle modal closure when clicking outside the form.
 * Utilizes the window.onclick event handler and event targeting.
 * * @see (Mozilla Developer Network [MDN], n.d.-a) for fundamental JavaScript event handling.
 * @see (Duckett, 2011) for implementing interactive overlays and modal logic.
 */
window.onclick = function (event) {
    // Checks if the actual clicked element (event.target) is the overlay background itself
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