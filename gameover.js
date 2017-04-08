function over()
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
            write("GAME OVER");
        },
        init: function() {
            color = hexColorGen();
        },
        keyhit: {
            "SPACE": function() {
                resetGameplay();
                setState("PLAY")
            }
        }
    }
}