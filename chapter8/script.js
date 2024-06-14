let wordList = document.querySelector("#word-list");
let sentence = document.querySelector("#sentence");

wordList.addEventListener("click", event => {
    let word = event.target.textContent;
    sentence.textContent += word;
    sentence.textContent += " ";
});

let box = document.querySelector("#box");

let currentX = 0;
let currentY = 0;

document.querySelector("html").addEventListener("keydown", e => {
    if (e.key === "w") {
        currentY -= 5;
    } else if (e.key === "a") {
        currentX -= 5;
    } else if (e.key === "s") {
        currentY += 5;
    } else if (e.key ===  "d") {
        currentX += 5;
    } else if (e.repeat) {
        return;
    }

    box.style.left = currentX + "px";
    box.style.top = currentY + "px";
});