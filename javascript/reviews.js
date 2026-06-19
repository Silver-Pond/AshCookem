/**
 * Import Supabase client library via jsDelivr CDN as an ES module.
 * @see (jsDelivr, n.d.) for open-source library CDN delivery.
 * @see (Supabase, n.d.) for client module loading specifications.
 */
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Initialize Supabase client using project credentials
const supabase = createClient(
    "https://elftleczqcpxhihmuwlo.supabase.co",
    "sb_publishable_y2XUksG29JZt9192S7WPWg_ON1H73lY"
);

console.log("reviews.js loaded");

/**
 * Attaches initialization logic to the DOM content lifecycle hook.
 * @see (Mozilla Developer Network [MDN], n.d.-b) for DOM lifecycle event handling.
 */
document.addEventListener("DOMContentLoaded", async () => {
    console.log("DOM ready");

    const form = document.getElementById("review-form");

    if (!form) {
        console.error("review-form not found in DOM");
        return;
    }

    form.addEventListener("submit", submitReview);

    // Asynchronous sequence to populate and render the user interface
    // @see (Mozilla Developer Network [MDN], n.d.-a) for async/await execution control flow.
    await loadLocations();
    await loadReviews();
    await loadGoogleRating();
});


/**
 * Fetches dynamic facility branches to generate drop-down configuration choices.
 * @async
 * @see (Supabase, n.d.) for building database connection queries.
 * @see (Mozilla Developer Network [MDN], n.d.-b) for document tree node insertion.
 */
async function loadLocations() {
    const { data, error } = await supabase
        .from("location")
        .select("*");

    if (error) {
        console.error("Error loading locations:", error);
        return;
    }

    const dropdown = document.getElementById("review-location");

    if (!dropdown) {
        console.error("review-location dropdown not found");
        return;
    }

    // Reset layout selection mapping safely using innerHTML
    dropdown.innerHTML = `<option value="">Select Location</option>`;

    // Dynamically generate and append Option objects
    // @see (W3Schools, n.d.) for interacting with standard Select elements.
    data.forEach(loc => {
        const option = document.createElement("option");
        option.value = loc.name;
        option.textContent = `${loc.name} (${loc.province})`;
        dropdown.appendChild(option);
    });
}

/**
 * Intercepts form dispatch routines to evaluate inputs and write entries to Supabase.
 * @async
 * @param {Event} e - Event target argument context.
 * @see (W3Schools, n.d.) for preventative event control architectures.
 * @see (Supabase, n.d.) for performing .insert() commands via client API.
 */
async function submitReview(e) {
    e.preventDefault();

    console.log("Submit clicked");

    const location = document.getElementById("review-location")?.value;
    const rating = document.getElementById("rating")?.value;
    const text = document.getElementById("review_text")?.value;
    const name = document.getElementById("customer_name")?.value;

    console.log({ location, rating, text, name });

    // validation
    if (!location) {
        alert("Please select a location.");
        return;
    }

    if (!text || !text.trim()) {
        alert("Please write a review.");
        return;
    }

    // Direct structural insertion mapping to Supabase cloud table schema
    const { error } = await supabase
        .from("reviews")
        .insert([
            {
                location: location,
                rating: parseInt(rating),
                review_text: text,
                reviewer: name
            }
        ]);

    if (error) {
        console.log("FULL SUPABASE ERROR:");
        console.dir(error);
        alert(error.message);
        return;
    }

    // Reset interface entry blocks and trigger asynchronous context syncs
    document.getElementById("review-form").reset();
    loadReviews(location);
    loadGoogleRating(location);
}

/**
 * Fetches reviews and outputs component styling cards to the container.
 * @async
 * @param {string|null} [locationFilter=null] - Targeting parameter logic.
 * @see (Duckett, 2011) for implementing modular layouts and string parsing.
 */
async function loadReviews(locationFilter = null) {
    const container = document.getElementById("reviewsList");

    if (!container) {
        console.error("reviewsList not found");
        return;
    }

    container.innerHTML = "";

    let query = supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });

    if (locationFilter) {
        query = query.eq("location", locationFilter);
    }

    const { data, error } = await query;

    if (error) {
        console.error("Load error:", error);
        return;
    }

    if (!data || data.length === 0) {
        container.innerHTML = "<p>No reviews yet for this location.</p>";
        return;
    }

    data.forEach(r => {
        const stars =
            "★".repeat(r.rating) + "☆".repeat(5 - r.rating);

        container.innerHTML += `
            <div class="review-card">
                <div class="review-stars">${stars}</div>
                <p>${r.review_text}</p>
                <small>
                    ${r.reviewer ? r.reviewer + " • " : ""}
                    ${r.location} • ${new Date(r.created_at).toLocaleString()}
                </small>
            </div>
        `;
    });
}

/**
 * Monitors runtime changes to drop-down selection systems.
 * @see (Mozilla Developer Network [MDN], n.d.-b) for global state listener assignments.
 */
document.addEventListener("change", (e) => {
    if (e.target.id === "review-location") {
        loadReviews(e.target.value);
        loadGoogleRating(e.target.value);
    }
});

/**
 * Pulls rating arrays to evaluate statistics and render aggregate values.
 * @async
 * @param {string|null} [location=null] - Geographic matching argument filter.
 * @see (Mozilla Developer Network [MDN], n.d.-c) for data reductions and numeric arrays.
 */
async function loadGoogleRating(location = null) {

    const ratingEl = document.getElementById("google-rating");
    const linkEl = document.getElementById("google-link");

    if (!ratingEl || !linkEl) return;

    let query = supabase
        .from("reviews")
        .select("rating");

    if (location) {
        query = query.eq("location", location);
    }

    const { data, error } = await query;

    if (error) {
        console.error("Error loading Google rating:", error);
        ratingEl.innerHTML = "Unable to load rating";
        return;
    }

    if (!data || data.length === 0) {
        ratingEl.innerHTML = `
            <span class="rating-stars">☆☆☆☆☆</span><br>
            No ratings yet
        `;
        return;
    }

    // Mathematical array reductions to extract summary tracking averages
    const average =
        data.reduce((sum, review) => sum + review.rating, 0) / data.length;
    const rounded = Math.round(average);
    const stars =
        "★".repeat(rounded) +
        "☆".repeat(5 - rounded);

    ratingEl.innerHTML = `
        <span class="rating-stars">${stars}</span><br>
        ${average.toFixed(1)} / 5
        (${data.length} reviews)
    `;

    // Replace with your real Google review page
    linkEl.href = "https://www.google.com/maps";
    linkEl.innerText = "View on Google";
}

/**
 * REFERENCE LIST
 *
 * Duckett, J., 2011. HTML and CSS: Design and Build Websites. Indianapolis: John Wiley & Sons.
 *
 * jsDelivr, n.d. jsDelivr CDN for open source libraries. [online] Available at: https://www.jsdelivr.com/
 * [Accessed 3 April 2026].
 *
 * Mozilla Developer Network (MDN), n.d.-a. Using Fetch and asynchronous JavaScript (Promises and async/await). [online] Available at: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous
 * [Accessed 3 April 2026].
 *
 * Mozilla Developer Network (MDN), n.d.-b. Document Object Model (DOM). [online] Available at: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
 * [Accessed 3 April 2026].
 *
 * Mozilla Developer Network (MDN), n.d.-c. JavaScript standard built-in objects: Array.prototype.reduce(). [online] Available at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 * [Accessed 19 June 2026].
 *
 * Supabase, n.d. Supabase JavaScript Client Documentation. [online] Available at: https://supabase.com/docs/reference/javascript
 * [Accessed 3 April 2026].
 *
 * W3Schools, n.d. JavaScript Tutorial. [online] Available at: https://www.w3schools.com/js/
 * [Accessed 3 April 2026].
 */