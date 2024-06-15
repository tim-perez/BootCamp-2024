"use strict";

let thumbnails = document.querySelectorAll('[data-image-role="trigger"]');
let thumbnailsArray = [].slice.call(thumbnails);

/* USING FOR LOOP */

for (let thumb of thumbnailsArray) {
    thumb.addEventListener("click", (event) => {
        event.preventDefault();

        let image = thumb.getAttribute("data-image-url");
        let title = thumb.getAttribute("data-image-title");

        let detailImage = document.querySelector('[data-image-role="target"]');
        detailImage.src = image;

        let detailTitle = document.querySelector('[data-image-role="title"]');
        detailTitle.textContent = title;
    });
}

/* USING FOREACH */

thumbnailsArray.forEach((thumb) => {
    thumb.addEventListener("click", (event) => {
        event.preventDefault();

        let image = thumb.getAttribute("data-image-url");
        let title = thumb.getAttribute("data-image-title");

        let detailImage = document.querySelector('[data-image-role="target"]');
        detailImage.src = image;

        let detailTitle = document.querySelector('[data-image-role="title"]');
        detailTitle.textContent = title;
    });
});


/* CODE FROM FRONT-END WEB DEVELOPMENT: THE BIG NERD RANCH GUIDE */

const DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
const DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
const THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';

function setDetails(imageUrl, titleText) {
    let detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    let detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
    thumb.addEventListener('click', function(event) {
        event.preventDefault();
        setDetailsFromThumb(thumb);
    });
}

function getThumbnailsArray() {
    let thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    let thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function initializeEvents() {
    let thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
}

initializeEvents();