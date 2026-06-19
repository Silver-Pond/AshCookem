import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
    "https://elftleczqcpxhihmuwlo.supabase.co",
    "sb_publishable_y2XUksG29JZt9192S7WPWg_ON1H73lY"
);

console.log("🔥 reviews.js loaded");

document.addEventListener("DOMContentLoaded", async () => {
    console.log("✅ DOM ready");

    const form = document.getElementById("review-form");

    if (!form) {
        console.error("❌ review-form not found in DOM");
        return;
    }

    form.addEventListener("submit", submitReview);

    await loadLocations();
    await loadReviews();
});


// 📍 Load locations
async function loadLocations() {
    const { data, error } = await supabase
        .from("location")
        .select("*");

    if (error) {
        console.error("❌ Error loading locations:", error);
        return;
    }

    const dropdown = document.getElementById("review-location");

    if (!dropdown) {
        console.error("❌ review-location dropdown not found");
        return;
    }

    dropdown.innerHTML = `<option value="">Select Location</option>`;

    data.forEach(loc => {
        const option = document.createElement("option");
        option.value = loc.name;
        option.textContent = `${loc.name} (${loc.province})`;
        dropdown.appendChild(option);
    });
}


// ✍️ Submit review (FIXED: matches YOUR table)
async function submitReview(e) {
    e.preventDefault();

    console.log("📤 Submit clicked");

    const location = document.getElementById("review-location")?.value;
    const rating = document.getElementById("rating")?.value;
    const text = document.getElementById("review_text")?.value;
    const name = document.getElementById("customer_name")?.value;

    console.log({ location, rating, text, name });

    // validation (stronger)
    if (!location) {
        alert("Please select a location.");
        return;
    }

    if (!text || !text.trim()) {
        alert("Please write a review.");
        return;
    }

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
        console.log("🔥 FULL SUPABASE ERROR:");
        console.dir(error);
        alert(error.message);
        return;
    }

    document.getElementById("review-form").reset();
    loadReviews(location);
}


// 📥 Load reviews
async function loadReviews(locationFilter = null) {
    const container = document.getElementById("reviewsList");

    if (!container) {
        console.error("❌ reviewsList not found");
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
        console.error("❌ Load error:", error);
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


// 🔄 Filter reviews when location changes
document.addEventListener("change", (e) => {
    if (e.target.id === "review-location") {
        loadReviews(e.target.value);
    }
});