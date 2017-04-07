function play()
{
    var map = function(ctx) {
        var floor = function() {
            ctx.moveTo(0, floorY);
            ctx.lineTo(gbwidth, floorY);
            ctx.fillStyle="#8b4513";
            ctx.fillRect(0, floorY + 1, gbwidth, gbheight);
        }

        return {
            draw: function() {
                floor();
            }, update: function() {

            }
        };
    }(canvas.ctx);

    var characterAction = function(char)
    {
        var jumpHeight = 70,
            heightPerFrame = 10,
            currentHeight = 0,
            tilt = 1;

        char.isBusy = true;

        return {
            JUMP: function() {
                var height = heightPerFrame * tilt;
                char.addOvY(height);
                currentHeight += (height);

                if (tilt === 1 && currentHeight >= jumpHeight) {
                    tilt = -1;
                }

                if (char.isOnGround()) {
                    char.isBusy = false;
                    return false;
                }
                return true;
            }
        }
    };

    return {
        draw: function() {
            map.draw();
            char.draw();
        },
        update: function() {
            map.update();
        },
        click: function() {
            setState('PAUSE');
        },
        keyhit: {
            'SPACE': function() {
                if (char.isBusy)
                    return;
                char.addEvent((new characterAction(char)).JUMP);
            }
        }
    }
}