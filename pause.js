function pause()
{
    var bgImg = new Image();
    bgImg.src = canvas.entity.toDataURL();

    var screen = function(ctx) {
        return {
            draw: function() {
                ctx.drawImage(bgImg, 0, 0);
                ctx.globalAlpha = 0.2;
                ctx.fillStyle = "#551A8B";
                ctx.fillRect(0, 0, gbwidth, gbheight);
                ctx.globalAlpha = 1;
                write("CLIQUE OU ECHAP POUR CONTINUER");
            }
        }
    }(canvas.ctx);

    return {
        draw: function() {
            screen.draw();
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
        }
    }
}