function pause()
{
    var bgImg = new Image();

    return {
        draw: function() {
            canvas.ctx.drawImage(bgImg, 0, 0);
            canvas.ctx.globalAlpha = 0.2;
            canvas.ctx.fillStyle = "#551A8B";
            canvas.ctx.fillRect(0, 0, gbwidth, gbheight);
            canvas.ctx.globalAlpha = 1;
            write("CLIQUE OU ECHAP POUR CONTINUER");
        },
        update: function() {
        },
        click: function() {
            setState("PLAY");
        },
        keyhit: {
            "ESC": function() {
                setState("PLAY");
            }
        },
        init: function() {
            bgImg.src = canvas.entity.toDataURL();
        }
    }
}