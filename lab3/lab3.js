let canvas = document.createElement("canvas");
canvas.id = "my-canv";
canvas.height = 300;
canvas.width = 200;
document.body.appendChild(canvas);
let ctx = canvas.getContext('2d');

function getUrl(width, height) {
    return `https://source.unsplash.com/collection/1127163/${width}x${height}`;
}

function drawImg(img, x, y, w, h) {
    img.onload = function () {
        ctx.drawImage(img, x, y, w, h);
    };
}
function calculate(width, height, x, y) {
    let x1 = 0, y1 = 0, h1 = y, w1 = x;

    let x2 = x, y2 = 0, h2 = y, w2 = width - x;
    let x3 = 0, y3 = y, h3 = height - y, w3 = x;
    let x4 = x, y4 = y, h4 = height - y, w4 = width - x;

    // alert(`x1 = ${x1}, y1 = ${y1}, h1 = ${h1}, w1 = ${w1}`);
    // alert(`x2 = ${x2}, y1 = ${y2}, h1 = ${h2}, w1 = ${w2}`);
    // alert(`x3 = ${x3}, y1 = ${y3}, h1 = ${h3}, w1 = ${w3}`);
    // alert(`x4 = ${x4}, y1 = ${y4}, h1 = ${h4}, w1 = ${w4}`);

    let pic1 = new Image();
    pic1.src = getUrl(w1, h1);

    let pic2 = new Image();
    pic2.src = getUrl(w2, h2);

    let pic3 = new Image();
    pic3.src = getUrl(w3, h3);

    let pic4 = new Image();
    pic4.src = getUrl(w4, h4);

    drawImg(pic1, x1, y1, w1, h1);
    drawImg(pic2, x2, y2, w2, h2);
    drawImg(pic3, x3, y3, w3, h3);
    drawImg(pic4, x4, y4, w4, h4);
}
function parseQuote(response) {

}
function getText() {
    let XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    let xhr = new XHR();

    xhr.open('POST', 'https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru', true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
            return;
        }
        let text = JSON.parse(xhr.responseText).quoteText;
        alert(text);
    };
}

function makeText(text, w){
    let mas = text.split(' ');
}

//calculate(300, 200, 50, 150);
getText();