// Declaring string array (MDN, 2025; OpenAI, 2026)
const images = [
    "img/LOCATIONS-A.png",
    "img/LOCATIONS-B.png",
    "img/LOCATIONS-C.png",
    "img/LOCATIONS-D.png"
];

// Declaring variables (MDN, 2025; OpenAI, 2026)
let currentImage = 0;
const slideshow = document.getElementById("slideshow");

// Declaring function (MDN, 2025; OpenAI, 2026)
function changeImage() {
    slideshow.style.opacity = 0;

    // set Timer (MDN, 2025; OpenAI, 2026)
    setTimeout(() => {
        currentImage = (currentImage + 1) % images.length;
        slideshow.src = images[currentImage];
        slideshow.style.opacity = 1;
    }, 400);
}

setInterval(changeImage, 3000);

/*
* REFERENCE LIST
*
* Mozilla Developer Network (MDN), 2025. Document: DOMContentLoaded event.
* [online]. Available at: https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
* [Accessed: 03 June 2026].
*
* Mozilla Developer Network (MDN), 2025. Window: setInterval() method.
* [online]. Available at: https://developer.mozilla.org/en-US/docs/Web/API/Window/setInterval
* [Accessed: 03 June 2026].
*
* Mozilla Developer Network (MDN), 2025. Document.getElementById() method.
* [online]. Available at: https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
* [Accessed: 03 June 2026].
*
* OpenAI, 2026. ChatGPT (GPT-5.5) generated JavaScript slideshow example.
* [online]. Available at: https://chatgpt.com
* [Accessed: 03 June 2026].
* */