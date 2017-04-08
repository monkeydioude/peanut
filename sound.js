function playSound(src)
{
    var audio = new Audio(src);
    audio.play();
    return audio;
}

function bumpSound()
{
    playSound("sound/smb_bump.wav");
}

function upSound()
{
    playSound("sound/smb_1-up.wav");
}

function overSound()
{
    playSound("sound/smb_gameover.wav");
}

function peanutSound()
{
    playSound("sound/smb_kick.wav");
}

var ws = null;

function winSound()
{
    ws = playSound("sound/win.mp3");
}

function stopWinSound()
{
    if (ws) {
        ws.pause();
    }
}

function jumpSound()
{
    playSound("sound/smb_jump-small.wav")
}

var rs = null;

function runningSound()
{
    rs = playSound("sound/play.mp3");
}

function runninSoundStop()
{
    if (rs) {
        rs.pause();
    }
}