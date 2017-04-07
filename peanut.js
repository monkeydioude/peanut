var oldTimestamp = 0,
    fps = 100 / 60,
    floorX = 270,
    gbwidth = 720,
    gbheight = 300;

/* =============================== */




/* =============================== */

var canvas = new Canvas("#gameboard"),
    states = {
        PLAY: play,
        START: start,
        PAUSE: pause
    },
    state = 'START',
    mouse = new Mouse(canvas.entity),
    char = new Char();

canvas.ctx.font = "30px Trebuchet MS";
canvas.ctx.textAlign = "center";


function setState(name)
{
    if (!states[name])
        return;
    state = states[name]();
}

function update()
{
    state.update();
}

function draw()
{
    canvas.ctx.clearRect(0, 0, gbwidth, gbheight);
    canvas.ctx.globalAlpha = 1;
    state.draw();
}

function write(str, x , y)
{
    if (!x)
        x = gbwidth / 2;
    if (!y)
        y = gbheight / 2;
    canvas.ctx.fillText(str, x, y);
}

function onClick()
{
    var click = mouse.click;

    if (state.click)
        click = state.click;
    click();
}

function process(timestamp)
{
    if (timestamp - oldTimestamp > fps) {
        update();
        draw();
    }
    window.requestAnimationFrame(process);
}

function load()
{
    setState('START');
    mouse.entity.addEventListener('click', onClick);
    process(0);
}