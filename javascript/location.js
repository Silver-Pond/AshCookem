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