let dropdown = null;

function createSearchDropdown(container) {
    if (!container) return null;

    dropdown = document.createElement("div");
    dropdown.className = "search-dropdown hidden";
    dropdown.setAttribute("role", "listbox");

    container.appendChild(dropdown);

    return dropdown;
}

function hideSearchDropdown() {
    dropdown?.classList.add("hidden");
}

function showSearchDropdown() {
    dropdown?.classList.remove("hidden");
}

function clearSearchDropdown() {
    if (!dropdown) return;
    dropdown.innerHTML = "";
}

function createDropdownOption(item, section, onSelect) {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "search-dropdown-item";

    button.innerHTML = `
        <div class="search-dropdown-item-title">${item.name}</div>
        <div class="search-dropdown-item-meta">${section.label(item)}</div>
    `;

    button.addEventListener("mousedown", function (event) {
        event.preventDefault();
        onSelect(item, section);
    });

    return button;
}