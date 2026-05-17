async function loadDiscs() {
    const res = await fetch("/data/discs.json");
    const discs = await res.json();

    renderDiscs(discs);
}

function renderDiscs(discs) {
    const container = document.querySelector(".discs-container");

    container.innerHTML = "";

    discs.forEach(disc => {
        const card = document.createElement("div");
        card.className = "disc-card";

        card.innerHTML = `
            <h2>${disc.name}</h2>
            <p><strong>Type:</strong> ${disc.type}</p>
            <p>Speed: ${disc.speed} | Glide: ${disc.glide} | Turn: ${disc.turn} | Fade: ${disc.fade}</p>
        `;

        container.appendChild(card);
    });
}

loadDiscs();