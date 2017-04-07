function play()
{
    var map = function(ctx) {
        var floor = function() {
            ctx.moveTo(0, floorX);
            ctx.lineTo(gbwidth, floorX);
            ctx.fillStyle="#8b4513";
            ctx.fillRect(0, floorX + 1, gbwidth, gbheight);
        }

        return {
            draw: function() {
                floor();
            }, update: function() {

            }
        };
    }(canvas.ctx);

    return {
        draw: function() {
            canvas.begin();
            map.draw();
            canvas.end();
        },
        update: function() {
            map.update();
        },
        click: function() {
            setState('PAUSE');
        }
    }
}