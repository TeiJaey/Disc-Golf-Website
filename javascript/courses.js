async function loadCourses() {
    const res = await fetch("/data/courses.json");
    const courses = await res.json();

    renderCourses(courses);
}

function renderCourses(courses) {
    const container = document.querySelector(".courses-container");

    container.innerHTML = "";

    courses.forEach(course => {
        const card = document.createElement("div");
        card.className = "course-card";

        card.innerHTML = `
            <h2>${course.name}</h2>
            <p><strong>Location:</strong> ${course.location}</p>
            <p><strong>Holes:</strong> ${course.holes}</p>
            <p><strong>Difficulty:</strong> ${course.difficulty}</p>
        `;

        container.appendChild(card);
    });
}

loadCourses();