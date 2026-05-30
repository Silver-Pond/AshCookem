const angle = 15;

const lerp = (start, end, amount) => {
    return (1 - amount) * start + amount * end;
};

const remap = (value, oldMax, newMax) => {
    const newValue =
        ((value + oldMax) * (newMax * 2)) /
        (oldMax * 2) -
        newMax;

    return Math.min(Math.max(newValue, -newMax), newMax);
};

window.addEventListener("DOMContentLoaded", () => {

    const tiltElements = document.querySelectorAll(
        ".our-story, " +
        ".items-link, " +
        ".table-a img, " +
        ".table-b img, " +
        ".table-c img"
    );

    tiltElements.forEach((element) => {

        element.dataset.rotateX = 0;
        element.dataset.rotateY = 0;

        element.addEventListener("mousemove", (event) => {

            const rect = element.getBoundingClientRect();

            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const posX = event.clientX - centerX;
            const posY = event.clientY - centerY;

            const rotateY = remap(
                posX,
                rect.width / 2,
                angle
            );

            const rotateX = remap(
                posY,
                rect.height / 2,
                angle
            );

            element.dataset.rotateY = rotateY;
            element.dataset.rotateX = -rotateX;
        });

        element.addEventListener("mouseleave", () => {

            element.dataset.rotateX = 0;
            element.dataset.rotateY = 0;
        });
    });

    const update = () => {

        tiltElements.forEach((element) => {

            let currentX =
                parseFloat(
                    getComputedStyle(element)
                        .getPropertyValue("--rotateX")
                ) || 0;

            let currentY =
                parseFloat(
                    getComputedStyle(element)
                        .getPropertyValue("--rotateY")
                ) || 0;

            const nextX = lerp(
                currentX,
                parseFloat(element.dataset.rotateX),
                0.08
            );

            const nextY = lerp(
                currentY,
                parseFloat(element.dataset.rotateY),
                0.08
            );

            element.style.setProperty(
                "--rotateX",
                `${nextX}deg`
            );

            element.style.setProperty(
                "--rotateY",
                `${nextY}deg`
            );
        });

        requestAnimationFrame(update);
    };

    update();
});