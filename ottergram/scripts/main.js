"use strict";

/* CODE FROM FRONT-END WEB DEVELOPMENT: THE BIG NERD RANCH GUIDE */

const DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
const DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
const DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
const THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
const HIDDEN_DETAIL_CLASS = 'hidden-detail';
const TINY_EFFECT_CLASS = 'is-tiny';
const ESC_KEY = 27;

function setDetails(imageUrl, titleText) {
    let detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    let detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;

    let frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function () {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
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

/* TEACHER'S CODE */

let thumbnails = document.querySelectorAll('[data-image-role="trigger"]');
let thumbnailsArray = [].slice.call(thumbnails);

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

        let detailFrame = document.querySelector('[data-image-role="frame"]');
        detailFrame.classList.add("is-tiny");
        setTimeout(() => {
            detailFrame.classList.remove("is-tiny");
        }, 50);
    });
});

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

        let detailFrame = document.querySelector('[data-image-role="frame"]');
        detailFrame.classList.add("is-tiny");
        setTimeout(() => {
            detailFrame.classList.remove("is-tiny");
        }, 50);
    });
}