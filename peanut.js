var oldTimestamp = 0,
    fps = 100 / 60,
    floorY = 270,
    gbwidth = 720,
    gbheight = 300;

/* =============================== */
var canvas = new Canvas("#gameboard"),
    states = {
        PLAY: play,
        START: start,
        PAUSE: pause
    },
    state = 'START',
    mouse = new Mouse(canvas.entity),
    char = null,
    keyboard = new Keyboard();

canvas.ctx.font = "30px Trebuchet MS";
canvas.ctx.textAlign = "center";
/* =============================== */

function setState(name)
{
    if (!states[name])
        return;
    state = states[name]();
}

function update()
{
    char.update();
    state.update();
}

function draw()
{
    canvas.begin();
    canvas.ctx.clearRect(0, 0, gbwidth, gbheight);
    canvas.ctx.globalAlpha = 1;
    state.draw();
    canvas.end();
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

function handleKeyboard()
{
    window.onkeydown = function(e) {
        if (!keyboard.ready || !state.keyhit)
            return;

        var keyAction = e.keyCode;

        if (keyboard.codes[e.keyCode])
            keyAction = keyboard.codes[e.keyCode];

        if (!state.keyhit[keyAction])
            return;

        state.keyhit[keyAction]();
    };
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
    delete char;
    char = new Char();
    keyboard.ready = true;
    
    setState('START');
    mouse.entity.addEventListener('click', onClick);
    handleKeyboard();
    process(0);
}