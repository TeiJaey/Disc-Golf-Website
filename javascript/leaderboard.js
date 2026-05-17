async function loadLeaderboard() {
    const res = await fetch("/data/players.json");
    const players = await res.json();

    renderLeaderboard(players);
}

function renderLeaderboard(players) {
    const container = document.querySelector(".leaderboard-container");

    container.innerHTML = "";

    players
        .sort((a, b) => a.rank - b.rank)
        .forEach(player => {
            const row = document.createElement("div");
            row.className = "leaderboard-row";

            row.innerHTML = `
                <span class="name">${player.name}</span>
                <span class="rating">${player.rating} rating</span>
                <span class="country">${player.country} </span>
                <span class="wins">${player.wins} wins</span>
            `;

            container.appendChild(row);
        });
}

loadLeaderboard();