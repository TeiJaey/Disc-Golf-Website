const searchInput = document.querySelector(".search-container input");

searchInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        alert("Searching for: " + searchInput.value);
    }
});

if (e.key === "Enter") {
    window.location.href = "courses.html?search=" + encodeURIComponent(searchInput.value);
}

const params = new URLSearchParams(window.location.search);
const searchQuery = params.get("search");

console.log("Search: ", searchQuery);

const courses = [
    { name: "The Breakers", difficulty: "Moderate" },
    { name: "Lakeshore DGC", difficulty: "Moderate" }
];

const filtered = courses.filter(course =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
);

console.log(filtered);