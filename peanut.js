var fps = 60;
var oldTimestamp = 0,
    fpsTime = 100 / fps,
    floorY = 270,
    gbwidth = 720,
    gbheight = 300,
    eventsPopMiliSecs = 1 * 1000,
    eventsPopRandGap = 0.5 * 1000,
    scalefps = 60,
    xMovePerScaledFrame = 2;

/* =============================== */
var canvas = new Canvas("#gameboard"),
    states = {
        PLAY: play,
        START: start,
        PAUSE: pause,
        OVER: over
    }
    persisteState = {},
    state = null,
    stateName = 'START',
    mouse = new Mouse(canvas.entity),
    char = null,
    game = null,
    keyboard = new Keyboard();

canvas.ctx.font = "30px Trebuchet MS";
canvas.ctx.textAlign = "center";
/* =============================== */

function getScaledXMove()
{
    return (scalefps / fps) * xMovePerScaledFrame;
}

function hexColorGen() {
    return '#' + Math.random().toString(16).slice(2, 8).toUpperCase();
}

function setState(name)
{
    stateName = name;
    if (!states[name])
        return;
    if (!persisteState[name]) {
        persisteState[name] = states[name]();
    }
    if (persisteState[name]['init']) {
        persisteState[name]['init']();
    }
    state = persisteState[name];
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
    if (!state.click) {
        return;
    }
    state.click();
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
    if (timestamp - oldTimestamp > fpsTime) {
        update();
        draw();
    }
    window.requestAnimationFrame(process);
}

function resetGameplay()
{
    delete char;
    delete game;
    char = new Char();
    game = new Game();
    keyboard.ready = true;
}

function load()
{
    resetGameplay();
    setState("OVER");
    mouse.entity.addEventListener('click', onClick);
    handleKeyboard();
    process(0);
}