let canvas = document.createElement("canvas");
canvas.id = "canv";
canvas.height = 600;
canvas.width = 500;
let xPoint = 60, yPoint = 100;
document.body.appendChild(canvas);
let ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
let countLoaded = 0;

function getUrl(width, height) {
    return `https://source.unsplash.com/collection/1127173/${width}x${height}`;
}

function generateImg(x, y, w, h) {
    let img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = getUrl(w, h);

    drawImg(img, x, y, w, h);
}

function drawImg(img, x, y, w, h) {
    img.onload = function () {
        ctx.drawImage(img, x, y, w, h);
        countLoaded++;
        getTextAndButton();
    };
}

function getCanvasImg(width, height, x, y) {
    generateImg(0, 0, x, y);
    generateImg(x, 0, width - x, y);
    generateImg(0, y, x, height - y);
    generateImg(x, y, width - x, height - y);
}

function getTextAndButton() {
    if(countLoaded < 4){
        return;
    }

    let xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru', true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
            return;
        }

        if (xhr.status === 200) {
            drawText(xhr.responseText);
            makeButton();
        }
    };
    xhr.send();
}

function drawText(responseJSON) {
    ctx.font = 'italic 30px Arial bold';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'middle';
    let generatedText = JSON.parse(responseJSON).quoteText;
    let left = 15, hLine = 33;

    let width = canvas.width - 2*left;
    let height = canvas.height;
    let center = canvas.width / 2;

    let lines = makeLines(generatedText, width);
    let lenOfLines = hLine*lines.length;
    if(lenOfLines > height){
        alert('Too big text');
        return;
    }
    let top = (height - lenOfLines) / 2;
    lines.forEach(val => {
        ctx.fillText(val, center, top);
        top += hLine;
    });
}

function makeLines(text, w) {
    let mas = text.split(' ');
    if(mas[mas.length - 1] ===''){
        mas = mas.slice(0, -1);
    }
    let line = '';
    let formatted = [];
    for(let i = 0; i < mas.length; i++) {
        if(ctx.measureText(line + ' ' + mas[i]).width < w){
            if(i !== 0){
                line += ' ';
            }
            line += mas[i];
            if(i === (mas.length - 1)){
                formatted.push(line);
            }
        } else {
            formatted.push(line);
            line = mas[i];
            if (i === (mas.length - 1)) {
                formatted.push(line);
            }
        }

    }
    return formatted;
}

function makeButton() {
    let link = document.createElement('a');
    link.id = 'downloadId';
    link.innerText= 'Download this picture';
    link.download = 'pic.jpg';

    link.addEventListener('click', download, false);
    document.body.appendChild(link);
}

function download() {
    let canv = document.getElementById('canv');
    document.querySelector('#downloadId').href = canvas.toDataURL('image/jpg');
}

getCanvasImg(canvas.width, canvas.height, xPoint, yPoint);
