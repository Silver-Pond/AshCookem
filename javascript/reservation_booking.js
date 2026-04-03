import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
    "https://elftleczqcpxhihmuwlo.supabase.co",
    "sb_publishable_y2XUksG29JZt9192S7WPWg_ON1H73lY"
);

document.addEventListener("DOMContentLoaded", async () => {

    const form = document.getElementById("reservation-form");
    const dropdown = document.getElementById("location");

    if (!form || !dropdown) {
        console.error("Form or dropdown not found");
        return;
    }

    // LOAD LOCATIONS
    const loadLocations = async () => {
        const { data, error } = await supabase
            .from("location")
            .select("*");

        if (error) {
            console.error("Error loading locations:", error);
            return;
        }

        dropdown.innerHTML = `<option value="">Select Location</option>`;

        data.forEach(loc => {
            const option = document.createElement("option");

            // DB expects location.name (FK)
            option.value = loc.name;
            option.textContent = loc.name;

            dropdown.appendChild(option);
        });
    };

    await loadLocations();

    // PREVENT DOUBLE BINDING
    if (form.dataset.bound === "true") return;
    form.dataset.bound = "true";

    // SINGLE SUBMIT HANDLER (ONLY ONCE)
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        console.log("SUBMIT FIRED ONCE");

        const submitBtn = form.querySelector("button[type='submit']");
        submitBtn.disabled = true;

        const formData = new FormData(form);

        const payload = {
            name: formData.get("name"),
            surname: formData.get("surname"),
            email: formData.get("email"),
            number: formData.get("number"),
            party_size: parseInt(formData.get("party_size")),
            location: formData.get("location"),
            date: formData.get("reserve_day"),
            time: formData.get("reserve_time"),
            time_stamp: new Date().toISOString()
        };

        console.log("Payload:", payload);

        const { data, error } = await supabase
            .from("reservation")
            .insert([payload]);

        submitBtn.disabled = false;

        if (error) {
            console.error("Insert error:", error);
            alert(error.message);
            return;
        }

        alert("Reservation successful!");
        form.reset();
    });

});
/**
 * REFERENCE LIST
 *
 * Canva, n.d. Graphic design platform (images, icons and visual assets used in website design). [online] Available at: https://www.canva.com/
 * [Accessed 3 April 2026].
 *
 * Duckett, J., 2011. HTML and CSS: Design and Build Websites. Indianapolis: John Wiley & Sons.
 *
 * Mozilla Developer Network (MDN), n.d. JavaScript basics. [online] Available at: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics
 * [Accessed 3 April 2026].
 *
 * Mozilla Developer Network (MDN), n.d. Using Fetch and asynchronous JavaScript (Promises and async/await). [online] Available at: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous
 * [Accessed 3 April 2026].
 *
 * Mozilla Developer Network (MDN), n.d. Document Object Model (DOM). [online] Available at: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
 * [Accessed 3 April 2026].
 *
 * Supabase, n.d. Supabase JavaScript Client Documentation. [online] Available at: https://supabase.com/docs/reference/javascript
 * [Accessed 3 April 2026].
 *
 * jsDelivr, n.d. jsDelivr CDN for open source libraries. [online] Available at: https://www.jsdelivr.com/
 * [Accessed 3 April 2026].
 *
 * W3Schools, n.d. JavaScript Tutorial. [online] Available at: https://www.w3schools.com/js/
 * [Accessed 3 April 2026].
 * */