function drawImg(src, x, y, w, h, sw, sh)
{
    var image = new Image();
    image.src = src;
    canvas.ctx.drawImage(image, 0, 0, sw, sh, x, y, w, h);
}

function drawFullHeart(x, y, w, h)
{
    drawImg("img/heart-full.png", x, y, w, h, 256, 256);
}

function drawEmptyHeart(x, y, w, h)
{
    drawImg("img/heart-empty.png", x, y, w, h, 256, 256);
}

function drawCrate(x, y, w, h)
{
    drawImg("img/crate.png", x, y, w, h, 512, 512);
}

function drawWin(x, y)
{
    drawImg("img/win.png", x, y, 428, 270, 428, 270);
}