import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
    "https://elftleczqcpxhihmuwlo.supabase.co",
    "sb_publishable_y2XUksG29JZt9192S7WPWg_ON1H73lY"
);

// Reusable function to load any category
async function loadCategory(type, tbodyId) {
    const { data, error } = await supabase
        .from("menu_item")
        .select("*")
        .eq("type", type);

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

// Load ALL menu sections
function loadMenu() {
    loadCategory("starter", "starters-body");
    loadCategory("entrée", "entrées-body");
    loadCategory("side", "sides-body");
    loadCategory("dessert", "desserts-body");
    loadCategory("alcoholic beverage", "alcoholic-body");
    loadCategory("non-alcoholic beverage", "non-alcoholic-body");
}

document.addEventListener("DOMContentLoaded", loadMenu);