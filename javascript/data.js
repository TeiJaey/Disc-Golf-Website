// =========================
// COURSES
// =========================

const courses = [
    { name: "The Breakers", location: "West Olive, MI", page: "/pages/courses.html" },
    { name: "Lakeshore DGC", location: "Spring Lake, MI", page: "/pages/courses.html" },
    { name: "Ross Park", location: "Muskegon, MI", page: "/pages/courses.html" },
    { name: "McGraft Park", location: "Muskegon, MI", page: "/pages/courses.html" },
    { name: "Lighthouse C.M", location: "Grand Haven, MI", page: "/pages/courses.html" },
    { name: "Smith Ryerson Park", location: "Muskegon, MI", page: "/pages/courses.html" },
    { name: "Mullaly Field", location: "Muskegon, MI", page: "/pages/courses.html" },
    { name: "Sweet Spot DGC", location: "Ravenna, MI", page: "/pages/courses.html" },
    { name: "Flip City DGP", location: "Shelby, MI", page: "/pages/courses.html" },
    { name: "Whitehall DGC", location: "Whitehall, MI", page: "/pages/courses.html" }
];

// =========================
// DISCS
// =========================

const discs = [
    { name: "Innova Destroyer", type: "Distance Driver", page: "/pages/discs.html" },
    { name: "Discraft Buzzz", type: "Midrange", page: "/pages/discs.html" },
    { name: "Innova Aviar", type: "Putter", page: "/pages/discs.html" },
    { name: "Discraft Zone", type: "Overstable Approach", page: "/pages/discs.html" },
    { name: "Innova Teebird", type: "Fairway Driver", page: "/pages/discs.html" },
    { name: "Discraft Luna", type: "Putter", page: "/pages/discs.html" },
    { name: "Latitude 64 River", type: "Fairway Driver", page: "/pages/discs.html" },
    { name: "Dynamic Discs Judge", type: "Putter", page: "/pages/discs.html" },
    { name: "Innova Leopard", type: "Fairway Driver", page: "/pages/discs.html" },
    { name: "MVP Atom", type: "Putter", page: "/pages/discs.html" }
];

// =========================
// PLAYERS
// =========================

const players = [
    { name: "Jake Thompson", details: "1024 pts", page: "/pages/leaderboard.html" },
    { name: "Emma Carter", details: "980 pts", page: "/pages/leaderboard.html" },
    { name: "Ryan Miller", details: "941 pts", page: "/pages/leaderboard.html" },
    { name: "Olivia Brooks", details: "915 pts", page: "/pages/leaderboard.html" },
    { name: "Noah Bennett", details: "902 pts", page: "/pages/leaderboard.html" }
];

// =========================
// SEARCH SECTIONS
// =========================

const searchSections = [
    {
        title: "Courses",
        items: courses,
        page: "/pages/courses.html",
        label: item => item.location
    },

    {
        title: "Discs",
        items: discs,
        page: "/pages/discs.html",
        label: item => item.type
    },

    {
        title: "Players",
        items: players,
        page: "/pages/leaderboard.html",
        label: item => item.details
    }
];