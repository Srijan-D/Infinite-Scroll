const loading = document.getElementById("loader");
const imageContainer = document.getElementById("image-container");
photosArray = [];
//api
let count = 1;
const apiKey = "jHYgO5iaRQlFjHhPvwfxjPGh8yVWhGM_ktB_5QVJh1E";
let apiUrl = `https://api.unsplash.com/photos/?client_id=${apiKey}&count=${count}`;
//helper function to avoid dry code

let imagesLoaded = 0;
let totalImages = 0;
let ready = false;

function setAttributes(element, attributes) {
  for (const key in attributes) element.setAttribute(key, attributes[key]);
}

function imageLoaded() {
  imagesLoaded++; //incrementing images loaded variable
  console.log(imagesLoaded);
  if (imagesLoaded === totalImages) {
    ready = true;
    loading.hidden = true;
    count =20;
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`; 
  }
}

//fetch function:

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
}

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "_blank"); // to open in a new tab
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);
    img.addEventListener("load", imageLoaded);
    item.appendChild(img); //we are putting our image inside the anchor tag
    imageContainer.appendChild(item);
  });
}

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});
getPhotos();
