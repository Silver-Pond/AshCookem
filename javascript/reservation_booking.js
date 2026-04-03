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