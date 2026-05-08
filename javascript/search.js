// =========================
// SEARCH MODULE
// =========================

const searchContainer = document.querySelector(".search-container");
const searchInput = document.querySelector(".search-container input");

const urlParams = new URLSearchParams(window.location.search);
const initialSearchQuery = urlParams.get("search")?.trim() ?? "";

function getCurrentPageName() {
    const path = window.location.pathname;
    const segments = path.split("/").filter(Boolean);
    return segments.length ? segments[segments.length - 1] : "index.html";
}

function findMatchingItems(query) {
    if (!query) {
        return [];
    }

    const normalizedQuery = query.toLowerCase();
    const results = [];

    searchSections.forEach(section => {
        const matches = section.items
            .filter(item => {
                const text = item.name.toLowerCase();
                const extra = section.label(item).toLowerCase();
                return text.includes(normalizedQuery) || extra.includes(normalizedQuery);
            })
            .slice(0, 5);

        if (matches.length) {
            results.push({ section, matches });
        }
    });

    return results;
}

function displaySearchDropdown(query) {
    if (!dropdown || !query) {
        hideSearchDropdown();
        return;
    }

    const results = findMatchingItems(query);
    clearSearchDropdown();

    if (!results.length) {
        const empty = document.createElement("div");
        empty.className = "search-dropdown-empty";
        empty.textContent = `No results for "${query}"`;
        dropdown.appendChild(empty);
        showSearchDropdown();
        return;
    }

    results.forEach(group => {
        const label = document.createElement("div");
        label.className = "search-dropdown-category";
        label.textContent = group.section.title;
        dropdown.appendChild(label);

        group.matches.forEach(item => {
            dropdown.appendChild(
                createDropdownOption(item, group.section, (selectedItem, selectedSection) => {
                    window.location.href = `${selectedSection.page}?search=${encodeURIComponent(selectedItem.name)}`;
                })
            );
        });
    });

    showSearchDropdown();
}

function initializeSearchEvents() {
    if (!searchInput) {
        return;
    }

    searchInput.addEventListener("input", () => {
        displaySearchDropdown(searchInput.value.trim());
    });

    searchInput.addEventListener("focus", () => {
        displaySearchDropdown(searchInput.value.trim());
    });

    searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            hideSearchDropdown();
            return;
        }

        if (event.key === "Enter") {
            event.preventDefault();
            handleSearchSubmit(searchInput.value.trim());
        }
    });

    document.addEventListener("click", (event) => {
        if (searchContainer && !searchContainer.contains(event.target)) {
            hideSearchDropdown();
        }
    });
}

function handleSearchSubmit(query) {
    if (!query) {
        return;
    }

    const currentPage = getCurrentPageName();
    const routesByPage = {
        "courses.html": "/pages/courses.html",
        "discs.html": "/pages/discs.html",
        "leaderboard.html": "/pages/leaderboard.html"
    };

    const basePage = routesByPage[currentPage] || "/pages/courses.html";
    window.location.href = `${basePage}?search=${encodeURIComponent(query)}`;
}

function applyPageFilters() {
    const currentPage = getCurrentPageName();

    if (!initialSearchQuery) {
        return;
    }

    if (searchInput) {
        searchInput.value = initialSearchQuery;
    }

    if (currentPage === "courses.html") {
        filterCards(".course-card", ".courses-container", initialSearchQuery);
        return;
    }

    if (currentPage === "discs.html") {
        filterCards(".disc-card", ".discs-container", initialSearchQuery);
        return;
    }

    if (currentPage === "leaderboard.html") {
        filterLeaderboard(initialSearchQuery);
    }
}
