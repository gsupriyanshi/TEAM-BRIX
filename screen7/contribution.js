const beginButton = document.getElementById("beginButton");
const levelOverlay = document.getElementById("levelOverlay");
const closeOverlay = document.getElementById("closeOverlay");
const continueButton = document.getElementById("continueButton");

const impactNumber = document.getElementById("impactNumber");

const questThree = document.getElementById("questThree");

const leaderButton = document.getElementById("leaderButton");
const leaderList = document.getElementById("leaderList");

const badges = document.querySelectorAll(".badge:not(.locked-badge)");
const badgeInfo = document.getElementById("badgeInfo");

const shoutButton = document.getElementById("shoutButton");


/* JOURNEY OPEN */

beginButton.addEventListener("click", () => {

    levelOverlay.classList.add("active");

    let current = 0;

    const counter = setInterval(() => {

        current += 10;

        if (current >= 340) {
            current = 340;
            clearInterval(counter);
        }

        impactNumber.textContent = current;

    }, 20);

});


/* CLOSE LEVEL POPUP */

function closeLevel() {
    levelOverlay.classList.remove("active");
}

closeOverlay.addEventListener("click", closeLevel);
continueButton.addEventListener("click", closeLevel);


/* QUEST */

questThree.addEventListener("click", () => {

    questThree.classList.add("complete");

    questThree.querySelector(".quest-icon").textContent = "✓";
    questThree.querySelector(".quest-status").textContent = "DONE";

    impactNumber.textContent = "380";

});


/* LEADERBOARD */

leaderButton.addEventListener("click", () => {

    leaderList.classList.toggle("visible");

    if (leaderList.classList.contains("visible")) {
        leaderButton.innerHTML = "HIDE CONTRIBUTORS <span>↑</span>";
    } else {
        leaderButton.innerHTML = "VIEW ALL CONTRIBUTORS <span>↓</span>";
    }

});


/* BADGES */

badges.forEach(badge => {

    badge.addEventListener("click", () => {

        const name = badge.dataset.name;
        const description = badge.dataset.description;

        badgeInfo.innerHTML = `
            <span>UNLOCKED</span>
            <strong>${name} — ${description}</strong>
        `;

        badgeInfo.animate(
            [
                { opacity: 0, transform: "translateY(8px)" },
                { opacity: 1, transform: "translateY(0)" }
            ],
            {
                duration: 300,
                easing: "ease-out"
            }
        );

    });

});


/* SHARE */

shoutButton.addEventListener("click", async () => {

    const shareData = {
        title: "My Contribution",
        text: "Every action leaves a ripple."
    };

    if (navigator.share) {

        try {
            await navigator.share(shareData);
        } catch {
            // User closed the share menu.
        }

    } else {

        await navigator.clipboard.writeText(
            "Every action leaves a ripple."
        );

        shoutButton.textContent = "COPIED ✓";

        setTimeout(() => {
            shoutButton.innerHTML = "SHARE THIS MOMENT ↗";
        }, 1800);

    }

});