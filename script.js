document.documentElement.classList.add("js");

const MC_STATUS_ENDPOINT =
    "https://api.mcstatus.io/v2/status/java/45.143.198.41:25589";

const DISCORD_TEXT = "500+ Discord members";

function setStatus(text) {
    const target = document.getElementById("stats");
    if (target) {
        target.textContent = text;
    }
}

async function fetchPlayers() {
    try {
        const res = await fetch(MC_STATUS_ENDPOINT);
        const data = await res.json();

        const online =
            data && data.players && typeof data.players.online === "number"
                ? data.players.online
                : 0;
        const text =
            online === 1 ? "1 player online" : `${online} players online`;

        setStatus(`${DISCORD_TEXT} - ${text}`);
    } catch {
        setStatus(`${DISCORD_TEXT} - online now`);
    }
}

function copyIP() {
    const ip = "DonerSMP.top";
    const buttons = document.querySelectorAll("[data-copy]");

    const setCopied = () => {
        buttons.forEach((button) => {
            if (!button.dataset.originalText) {
                button.dataset.originalText = button.textContent;
            }
            button.textContent = "Copied";
            button.classList.add("copied");
        });

        setTimeout(() => {
            buttons.forEach((button) => {
                if (button.dataset.originalText) {
                    button.textContent = button.dataset.originalText;
                }
                button.classList.remove("copied");
            });
        }, 1600);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(ip).then(setCopied).catch(setCopied);
        return;
    }

    setCopied();
}

fetchPlayers();
setInterval(fetchPlayers, 60000);

const revealTargets = document.querySelectorAll(".reveal");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (revealTargets.length) {
    if (prefersReducedMotion.matches || !("IntersectionObserver" in window)) {
        revealTargets.forEach((target) => target.classList.add("in-view"));
    } else {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in-view");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
        );

        revealTargets.forEach((target) => revealObserver.observe(target));
    }
}
