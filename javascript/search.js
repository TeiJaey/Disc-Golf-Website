let courses = [];
let discs = [];
let players = [];

window.addEventListener("load", async () => {
    // Load searchable data from the data folder
    try {
        [courses, discs, players] = await Promise.all([
            fetch("/data/courses.json").then(res => res.json()),
            fetch("/data/discs.json").then(res => res.json()),
            fetch("/data/players.json").then(res => res.json())
        ]);
    } catch (error) {
        console.error("Search data failed to load:", error);
        return;
    }

    const searchContainer = await waitForElement(".search-container", 3000);
    const searchInput = searchContainer?.querySelector("input");
    const dropdown = searchContainer?.querySelector(".search-dropdown");

    if (!searchInput || !dropdown) return;

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase().trim();
        updateSearchDropdown(query, dropdown);
    });

    searchInput.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            hideDropdown(dropdown);
            searchInput.blur();
        }
    });

    document.addEventListener("click", event => {
        if (!searchContainer.contains(event.target)) {
            hideDropdown(dropdown);
        }
    });
});

function waitForElement(selector, timeout = 3000) {
    return new Promise(resolve => {
        const element = document.querySelector(selector);
        if (element) {
            resolve(element);
            return;
        }

        const observer = new MutationObserver(() => {
            const found = document.querySelector(selector);
            if (found) {
                observer.disconnect();
                clearTimeout(timer);
                resolve(found);
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });

        const timer = setTimeout(() => {
            observer.disconnect();
            resolve(null);
        }, timeout);
    });
}

function updateSearchDropdown(query, dropdown) {
    dropdown.innerHTML = "";

    if (!query) {
        hideDropdown(dropdown);
        return;
    }

    const results = [];

    courses.forEach(course => {
        if (
            course.name.toLowerCase().includes(query) ||
            course.location.toLowerCase().includes(query)
        ) {
            results.push({
                type: "Course",
                name: course.name,
                meta: course.location,
                href: "/pages/courses.html"
            });
        }
    });

    discs.forEach(disc => {
        if (
            disc.name.toLowerCase().includes(query) ||
            disc.type.toLowerCase().includes(query)
        ) {
            results.push({
                type: "Disc",
                name: disc.name,
                meta: disc.type,
                href: "/pages/discs.html"
            });
        }
    });

    players.forEach(player => {
        if (player.name.toLowerCase().includes(query)) {
            results.push({
                type: "Player",
                name: player.name,
                meta: `Points: ${player.points}`,
                href: "/pages/leaderboard.html"
            });
        }
    });

    if (results.length === 0) {
        dropdown.innerHTML = `
            <div class="search-dropdown-empty">
                No results found for “${escapeHtml(query)}”.
            </div>
        `;
        showDropdown(dropdown);
        return;
    }

    const grouped = results.reduce((acc, item) => {
        if (!acc[item.type]) acc[item.type] = [];
        acc[item.type].push(item);
        return acc;
    }, {});

    Object.keys(grouped).forEach(type => {
        const category = document.createElement("div");
        category.className = "search-dropdown-category";
        category.textContent = type;
        dropdown.appendChild(category);

        grouped[type].slice(0, 5).forEach(result => {
            const button = document.createElement("a");
            button.className = "search-dropdown-item";
            button.href = result.href;
            button.innerHTML = `
                <span class="search-dropdown-item-title">${escapeHtml(result.name)}</span>
                <span class="search-dropdown-item-meta">${escapeHtml(result.meta)}</span>
            `;
            dropdown.appendChild(button);
        });
    });

    showDropdown(dropdown);
}

function showDropdown(dropdown) {
    dropdown.classList.remove("hidden");
}

function hideDropdown(dropdown) {
    dropdown.classList.add("hidden");
}

function escapeHtml(value) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
