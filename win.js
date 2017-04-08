function win()
{
    var bgImg = new Image(),
        color = null;

    return {
        update: function() {},
        draw: function() {
            canvas.ctx.drawImage(bgImg, 0, 0);
            canvas.ctx.globalAlpha = 0.2;
            canvas.ctx.fillStyle = color;
            canvas.ctx.fillRect(0, 0, gbwidth, gbheight);
            canvas.ctx.globalAlpha = 1;
            write("Gagnééééééééééééé, clique pour avoir ton cadeau");
        },
        init: function() {
            color = hexColorGen();
            runninSoundStop();
            winSound();
        },
        click: function() {
            setState("MINECRAFT");
        },
        keyhit: {
            "SPACE": function() {
                resetGameplay();
                setState("PLAY")
            }
        }
    }
}

function minecraft()
{
    return {
        update: function() {},
        draw: function() {
            drawWin(Math.random() * gbwidth, Math.random() * gbheight);
        },
        init: function() {
            color = hexColorGen();
            winSound();
        },
        click: function() {
            setState("MINECRAFT");
        },
        keyhit: {
            "ENTER": function() {
                resetGameplay();
                setState("PLAY")
            }
        }
    }
}