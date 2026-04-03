import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
    "https://elftleczqcpxhihmuwlo.supabase.co",
    "sb_publishable_y2XUksG29JZt9192S7WPWg_ON1H73lY"
);

async function loadLocations() {
    const { data, error } = await supabase
        .from("location")
        .select("*");

    if (error) {
        console.error("Error loading locations:", error);
        return;
    }

    // Group locations by province
    const grouped = {};

    data.forEach(item => {
        if (!grouped[item.province]) {
            grouped[item.province] = [];
        }
        grouped[item.province].push(item.name);
    });

    const provinces = Object.keys(grouped);

    const theadRow = document.getElementById("location-head");
    const tbody = document.getElementById("location-body");

    // Create headers (provinces)
    theadRow.innerHTML = provinces
        .map(province => `<th>${province}</th>`)
        .join("");

    // Find longest list (for row count)
    const maxRows = Math.max(
        ...provinces.map(p => grouped[p].length)
    );

    // Build table rows
    let rows = "";

    for (let i = 0; i < maxRows; i++) {
        rows += "<tr>";

        provinces.forEach(province => {
            const locationName = grouped[province][i] || "";
            rows += `<td>${locationName}</td>`;
        });

        rows += "</tr>";
    }

    tbody.innerHTML = rows;
}

document.addEventListener("DOMContentLoaded", loadLocations);
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