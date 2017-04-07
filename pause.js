function pause()
{
    var bgImg = new Image();
    bgImg.src = canvas.entity.toDataURL();

    var screen = function(ctx) {

    }(canvas.ctx);

    return {
        draw: function() {
            canvas.ctx.drawImage(bgImg, 0, 0);
            canvas.ctx.globalAlpha = 0.2;
            canvas.ctx.fillStyle="#551A8B";
            canvas.ctx.fillRect(0, 0, gbwidth, gbheight);
            canvas.ctx.globalAlpha = 1;
            write("CLIQUES POUR CONTINUER");
        },
        update: function() {

        },
        click: function() {
            setState('PLAY');
        }
    }
}