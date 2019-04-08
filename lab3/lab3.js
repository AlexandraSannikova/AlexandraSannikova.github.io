let canvas = document.createElement("canvas");
canvas.id = "my-canv";
canvas.height = 800;
canvas.width = 900;
document.body.appendChild(canvas);
let ctx = canvas.getContext('2d');
let countLoaded = 0;

function getUrl(width, height) {
    return `https://source.unsplash.com/collection/1127163/${width}x${height}`;
}

function drawImg(img, x, y, w, h) {
    img.onload = function () {
        ctx.drawImage(img, x, y, w, h);
        countLoaded++;
        getText();
    };

}

function generateImg(x, y, w, h) {
    let img = new Image();
    img.src = getUrl(w, h);
    //img.setAttribute('crossOrigin', 'anonymous');
    drawImg(img, x, y, w, h);
}
function getCanvasImg(width, height, x, y) {
    generateImg(0, 0, x, y);
    generateImg(x, 0, width - x, y);
    generateImg(0, y, x, height - y);
    generateImg(x, y, width - x, height - y);
  //  let x1 = 0, y1 = 0, h1 = y, w1 = x;

   // let x2 = x, y2 = 0, h2 = y, w2 = width - x;
    //let x3 = 0, y3 = y, h3 = height - y, w3 = x;

  //  let x4 = x, y4 = y, h4 = height - y, w4 = width - x;

    // alert(`x1 = ${x1}, y1 = ${y1}, h1 = ${h1}, w1 = ${w1}`);
    // alert(`x2 = ${x2}, y1 = ${y2}, h1 = ${h2}, w1 = ${w2}`);
    // alert(`x3 = ${x3}, y1 = ${y3}, h1 = ${h3}, w1 = ${w3}`);
    // alert(`x4 = ${x4}, y1 = ${y4}, h1 = ${h4}, w1 = ${w4}`);

    // let pic1 = new Image();
    // pic1.src = getUrl(w1, h1);
    //
    // let pic2 = new Image();
    // pic2.src = getUrl(w2, h2);
    //
    // let pic3 = new Image();
    // pic3.src = getUrl(w3, h3);
    //
    // let pic4 = new Image();
    // pic4.src = getUrl(w4, h4);

    // drawImg(pic1, x1, y1, w1, h1);
    // drawImg(pic2, x2, y2, w2, h2);
    // drawImg(pic3, x3, y3, w3, h3);
    // drawImg(pic4, x4, y4, w4, h4);
}

function getText() {
    if(countLoaded < 4){
        return;
    }
  //  alert(countLoaded);

    let xhr = new XMLHttpRequest(); // ????

    xhr.open('GET', 'https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru', true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
            return;
        }

        if (xhr.status === 200) {

            //alert(generatedText);
            //console.log(text);
            drawText(xhr.responseText);
        }
    };
    xhr.send();
    //console.log(generatedText);

}
let countLines = 0;
function makeLines(text, w) {
   // console.log(text);
    let mas = text.split(' ');
    if(mas[mas.length - 1] ===''){
        mas = mas.slice(0, -1);
    }
    console.log(mas);
    let line = '';
    let formatted = [];
    let format = '';
    for(let i = 0; i < mas.length; i++) {
        if(ctx.measureText(line + ' ' + mas[i]).width < w){
            if(i !== 0){
                line += ' ';
                //alert(line);
            }
            line += mas[i];
            if(i === (mas.length - 1)){
                formatted.push(line);
            }
        } else {
            formatted.push(line);
            format += line + '\n';
            line = mas[i];
            if (i === (mas.length - 1)) {
                formatted.push(line);
                format += line;
            }
        }

    }
    //alert(formatted);
    return formatted;
}

function drawText(responseJSON) {
    ctx.font = 'italic 30px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'middle';
    let generatedText = JSON.parse(responseJSON).quoteText;
    let left = 15, right = 15, hLine = 33;
    //top = 20, bottom = 20;

    let width = canvas.width - 2*left;
    //let height = canvas.height - 2*top;
    let height = canvas.height;
    let center = canvas.width / 2;

    //let hLine = getFontHeight(ctx.font);

    let lines = makeLines(generatedText, width);
    //console.log(lines);
    let lenOfLines = hLine*lines.length;
    if(lenOfLines > height){
        alert('Too big text');
        return;
    }
    let top = (height - lenOfLines)/2;
    lines.forEach(val => {
        ctx.fillText(val, center, top);
        top += hLine;
    });
   // ctx.fillText(text, center, 50);
}
//getFontHeight(ctx.font);
function getFontHeight(font) {
    var parent = document.createElement("span");
    parent.appendChild(document.createTextNode("height"));
    document.body.appendChild(parent);
    parent.style.cssText = "font: " + font + "; white-space: nowrap; display: inline;";
    var height = parent.offsetHeight;
    document.body.removeChild(parent);
    return height;
}

getCanvasImg(canvas.width, canvas.height, 100, 150);
getText();
