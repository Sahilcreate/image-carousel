function loadPage () {
  addCircles();
  previewLoadImage();
  addEventsToArrows();
}

function addCircles () {
  const imageArray = document.querySelectorAll(".carousel-image");
  imageArray.forEach((image) => {
    const randomId = `${Math.random().toString(36).substring(2) + Date.now().toString(36)}`;
    image.id = randomId;
    createNavCircle(randomId);
  });
}

function createNavCircle (imageId) {
  const navCircle = document.createElement('div');
  navCircle.setAttribute("data-image-id", `${imageId}`);
  navCircle.className = "nav-circle image-not-selected";
  navCircle.addEventListener("click", () => {
    showImage(imageId);
  });
  document.getElementById("image-nav-circle-container").appendChild(navCircle);
}

function previewLoadImage () {
  const firstImageId = document.querySelector(".image-container").firstElementChild.id;
  showImage(firstImageId);
}

function addEventsToArrows () {
  const leftArrow = document.getElementById("left-arrow");
  leftArrow.addEventListener("click", () => {
    showPreviousImage();
  });

  const rightArrow = document.getElementById("right-arrow");
  rightArrow.addEventListener("click", () => {
    showNextImage();
  })
}

function showNextImage () {
  const currentImageId = document.querySelector(".image-selected").getAttribute("data-image-id");
  const nextImage = document.getElementById(`${currentImageId}`).nextElementSibling;
  if (nextImage === null) {
    const firstImageId = document.querySelector(".image-container").firstElementChild.id;
    showImage(firstImageId);
  } else {
    showImage(nextImage.id);
  }
}

function showPreviousImage () {
  const currentImageId = document.querySelector(".image-selected").getAttribute("data-image-id");
  const previousImage = document.getElementById(`${currentImageId}`).previousElementSibling;

  if (previousImage === null) {
    const lastImageId = document.querySelector(".image-container").lastElementChild.id;
    showImage(lastImageId)
  } else {
    showImage(previousImage.id);
  }
}

function showImage (imageId) {
  const image = document.getElementById(`${imageId}`);
  const imageArray = document.querySelectorAll(".carousel-image");
  imageArray.forEach((image) => {
    image.style.display = "none";
  });
  image.style.display = "block";

  const circles = document.querySelectorAll(".nav-circle");
  circles.forEach((circle) => {
    circle.classList.replace("image-selected", "image-not-selected");
  })

  const linkedCircle = document.querySelector(`[data-image-id="${imageId}"]`);
  linkedCircle.classList.replace("image-not-selected", "image-selected");
}

loadPage();
setInterval(showNextImage, 5000);