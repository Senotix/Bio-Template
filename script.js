document.addEventListener("DOMContentLoaded", function () {
    const starsContainer = document.querySelector(".stars");

    function createShootingStar() {
        const star = document.createElement("div");
        star.classList.add("shooting-star");
        starsContainer.appendChild(star);

        const startSide = Math.floor(Math.random() * 4);
        let startX, startY;

        switch (startSide) {
            case 0:
                startX = Math.random() * window.innerWidth;
                startY = -10;
                break;
            case 1:
                startX = window.innerWidth + 10;
                startY = Math.random() * window.innerHeight;
                break;
            case 2:
                startX = Math.random() * window.innerWidth;
                startY = window.innerHeight + 10;
                break;
            case 3:
                startX = -10;
                startY = Math.random() * window.innerHeight;
                break;
        }

        star.style.left = `${startX}px`;
        star.style.top = `${startY}px`;

        const duration = Math.random() * 3 + 2;
        star.style.animationDuration = `${duration}s`;

        const endX = Math.random() * window.innerWidth;
        const endY = Math.random() * window.innerHeight;
        star.style.setProperty("--end-x", `${endX}px`);
        star.style.setProperty("--end-y", `${endY}px`);

        star.addEventListener("animationend", () => {
            star.remove();
        });

        checkCollisions(star);
    }

    function checkCollisions(newStar) {
        const stars = document.querySelectorAll(".shooting-star");
        stars.forEach((star) => {
            if (star !== newStar && isColliding(newStar, star)) {
                createExplosion(newStar, star);
            }
        });
    }

    function isColliding(element1, element2) {
        const rect1 = element1.getBoundingClientRect();
        const rect2 = element2.getBoundingClientRect();
        return (
            rect1.left < rect2.right &&
            rect1.right > rect2.left &&
            rect1.top < rect2.bottom &&
            rect1.bottom > rect2.top
        );
    }

    function createExplosion(element1, element2) {
        const explosion = document.createElement("div");
        explosion.classList.add("explosion");
        const rect1 = element1.getBoundingClientRect();
        explosion.style.left = `${rect1.left}px`;
        explosion.style.top = `${rect1.top}px`;
        starsContainer.appendChild(explosion);

        explosion.addEventListener("animationend", () => {
            explosion.remove();
        });

        element1.remove();
        element2.remove();
    }

    setInterval(createShootingStar, 1000);

    function createWorld() {
        const world = document.createElement("div");
        world.classList.add("world");
        starsContainer.appendChild(world);

        world.addEventListener("animationend", () => {
            world.remove();
            createWorld();
        });
    }

    createWorld();
});