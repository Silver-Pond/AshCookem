// Importing the Supabase JavaScript client library from jsDelivr CDN
// to enable communication with the Supabase backend (Supabase, n.d.; jsDelivr, n.d.).
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Creating a connection to the Supabase database using the project URL
// and public API key (Supabase, n.d.).
const supabase = createClient(
    "https://elftleczqcpxhihmuwlo.supabase.co",
    "sb_publishable_y2XUksG29JZt9192S7WPWg_ON1H73lY"
);

// Reusable function to load any category (MDN, n.d.).
async function loadCategory(type, tbodyId) {
    const { data, error } = await supabase
        .from("menu_item")
        .select("*")
        .eq("type", type);

    // Display an error message in the console if the query fails (MDN, n.d.).
    if (error) {
        console.error(`Error loading ${type}:`, error);
        return;
    }

    const tbody = document.getElementById(tbodyId);

    if (!tbody) return;

    if (!data || data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="2">No items found</td></tr>`;
        return;
    }

    // Using the map() method to generate HTML rows dynamically and join()
    // them into a single string before inserting them into the page
    // (Duckett, 2014; W3Schools, n.d.).
    tbody.innerHTML = data.map(item => `
    <tr>
      <td>
        <strong>${item.name}</strong><br>
        <small>${item.description}</small>
      </td>
      <td style="text-align:right;">
        ${item.price}
      </td>
    </tr>
  `).join("");
}

// Load ALL menu sections (Duckett, 2014).
function loadMenu() {
    loadCategory("starter", "starters-body");
    loadCategory("entrée", "entrées-body");
    loadCategory("side", "sides-body");
    loadCategory("dessert", "desserts-body");
    loadCategory("alcoholic beverage", "alcoholic-body");
    loadCategory("non-alcoholic beverage", "non-alcoholic-body");
}

// Function that controls the category filter (MDN, n.d.).
function initializeFilter() {

    const filter = document.getElementById("category-filter");

    const sections = document.querySelectorAll(".menu-section");

    filter.addEventListener("change", () => {

        const selected = filter.value;

        // Iterate through every menu section and determine whether
        // it should be visible or hidden (W3Schools, n.d.).
        sections.forEach(section => {

            if (selected === "all") {

                section.classList.remove("hidden-section");

            } else {

                if (section.classList.contains(selected)) {
                    section.classList.remove("hidden-section");
                }
                else {
                    section.classList.add("hidden-section");
                }

            }

        });

    });

}

// The DOMContentLoaded event ensures that the HTML document is fully loaded
// before attempting to manipulate page elements or fetch menu data
// (MDN, n.d.).
document.addEventListener("DOMContentLoaded", () => {
    loadMenu();
    initializeFilter();
});
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