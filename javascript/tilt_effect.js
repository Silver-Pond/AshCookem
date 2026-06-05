// Declaring const variables (MDN Web Docs, 2025).
const angle = 15;

const lerp = (start, end, amount) => {
    return (1 - amount) * start + amount * end;
};

/*
 * Remaps cursor position values to a limited range
 * between -angle and +angle.
 *
 * This ensures that image rotation remains controlled
 * regardless of screen size or image dimensions.
 */
const remap = (value, oldMax, newMax) => {

    const newValue =
        ((value + oldMax) * (newMax * 2)) /
        (oldMax * 2) -
        newMax;

    return Math.min(Math.max(newValue, -newMax), newMax);
};

// Wait until the HTML document is fully loaded before executing any JavaScript (Mozilla Foundation, 2025).
window.addEventListener("DOMContentLoaded", () => {

    /*
     * Select all elements that should receive the
     * 3D hover animation.
     *
     * querySelectorAll() is part of the Document
     * Object Model (DOM) API (Mozilla Foundation, 2025).
     */
    const tiltElements = document.querySelectorAll(
        ".our-story, " +
        ".items-link, " +
        ".table-a img, " +
        ".table-b img, " +
        ".table-c img"
    );

    // Loop through each selected element.
    tiltElements.forEach((element) => {

        // Initialise rotation values.
        element.dataset.rotateX = 0;
        element.dataset.rotateY = 0;

        /*
         * Track mouse movement across the element.
         *
         * The mousemove event continuously updates
         * the cursor position while the pointer is
         * within the element boundary
         * (MDN Web Docs, 2025).
         */
        element.addEventListener("mousemove", (event) => {

            /*
             * Retrieve the element's size and position
             * relative to the viewport using
             * getBoundingClientRect()
             * (MDN Web Docs, 2025).
             */
            const rect = element.getBoundingClientRect();

            // Calculate the centre point of the element.
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Determine cursor position relative to centre.
            const posX = event.clientX - centerX;
            const posY = event.clientY - centerY;

            /*
             * Convert mouse position into a rotation value.
             * Horizontal movement affects Y-axis rotation.
             * Vertical movement affects X-axis rotation.
             */
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

            // Store calculated values in data attributes.
            element.dataset.rotateY = rotateY;
            element.dataset.rotateX = -rotateX;
        });

        // Reset rotation when the cursor leaves the element area (MDN Web Docs, 2025).
        element.addEventListener("mouseleave", () => {

            element.dataset.rotateX = 0;
            element.dataset.rotateY = 0;
        });
    });

    /*
     * Animation Loop
     *
     * Continuously updates CSS custom properties
     * to create smooth movement.
     */
    const update = () => {

        tiltElements.forEach((element) => {

            /*
             * Retrieve the current CSS rotation values.
             * getComputedStyle() allows JavaScript
             * to read CSS custom properties
             * (MDN Web Docs, 2025).
             */
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

            /*
             * Use linear interpolation to gradually
             * move towards the target rotation.
             */
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

            /*
             * Update CSS variables which are used
             * by CSS transform properties to create
             * the 3D rotation effect
             * (MDN Web Docs, 2025).
             */
            element.style.setProperty(
                "--rotateX",
                `${nextX}deg`
            );

            element.style.setProperty(
                "--rotateY",
                `${nextY}deg`
            );
        });

        /*
         * requestAnimationFrame() provides efficient,
         * browser-optimised animation rendering
         * (MDN Web Docs, 2025).
         */
        requestAnimationFrame(update);
    };

    // Start the animation loop.
    update();
});
/*
* REFERENCE LIST
*
* MDN Web Docs, 2025. Element: mousemove event.
* Available at: https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event
* [Accessed: 04 June 2026].
*
* MDN Web Docs, 2025. Element: mouseleave event.
* Available at: https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseleave_event
* [Accessed: 04 June 2026].
*
* MDN Web Docs, 2025. Window: requestAnimationFrame() method.
* Available at: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
* [Accessed: 04 June 2026].
*
* MDN Web Docs, 2025. Element.getBoundingClientRect().
* Available at: https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
* [Accessed: 04 June 2026].
*
* MDN Web Docs, 2025. Using CSS transforms.
* Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transforms
* [Accessed: 04 June 2026].
*
* MDN Web Docs, 2025. transform-style.
* Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/transform-style
* [Accessed: 04 June 2026].
*
* MDN Web Docs, 2025. perspective.
* Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/perspective
* [Accessed: 04 June 2026].
*
* Mozilla Foundation, 2025. Document Object Model (DOM).
* Available at: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
* [Accessed: 04 June 2026].
*
* W3Schools, 2025. JavaScript HTML DOM EventListener.
* Available at: https://www.w3schools.com/js/js_htmldom_eventlistener.asp
* [Accessed: 04 June 2026].
*
* W3Schools, 2025. CSS 3D Transforms.
* Available at: https://www.w3schools.com/css/css3_3dtransforms.asp
* [Accessed: 04 June 2026].
* */