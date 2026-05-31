const images = [
    "img/LOCATIONS-A.png",
    "img/LOCATIONS-B.png",
    "img/LOCATIONS-C.png",
    "img/LOCATIONS-D.png"
];

let currentImage = 0;
const slideshow = document.getElementById("slideshow");

function changeImage() {
    slideshow.style.opacity = 0;

    setTimeout(() => {
        currentImage = (currentImage + 1) % images.length;
        slideshow.src = images[currentImage];
        slideshow.style.opacity = 1;
    }, 400);
}

setInterval(changeImage, 3000);