
// =========================
// GENERIC CARD FILTER
// =========================

function filterCards(cardSelector, containerSelector, query) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const cards = Array.from(container.querySelectorAll(cardSelector));
    const normalizedQuery = query.toLowerCase();

    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        const shouldShow = normalizedQuery === "" || text.includes(normalizedQuery);
        card.style.display = shouldShow ? "" : "none";
    });
}

// =========================
// LEADERBOARD FILTER
// =========================

function filterLeaderboard(query) {
    const container = document.querySelector(".leaderboard-container");
    if (!container) return;

    const rows = Array.from(container.querySelectorAll(".leaderboard-row"));
    const normalizedQuery = query.toLowerCase();

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const shouldShow = normalizedQuery === "" || text.includes(normalizedQuery);
        row.style.display = shouldShow ? "flex" : "none";
    });
}