function play()
{
    var map = function(ctx) {
        return {
            draw: function() {
                ctx.moveTo(0, floorY);
                ctx.lineTo(gbwidth, floorY);
                ctx.fillStyle="#8b4513";
                ctx.fillRect(0, floorY + 1, gbwidth, gbheight);
            }, update: function() {

            }
        };
    }(canvas.ctx);

    var characterAction = function(char)
    {
        var jumpHeight = 175,
            heightPerFrame = 10,
            currentHeight = 0,
            movement = [-jumpHeight, jumpHeight];

        char.isBusy = true;

        return {
            JUMP: function() {
                if (movement.length == 0 && currentHeight == 0) {
                    char.isBusy = false;
                    events.addEvent(function() {
                        char.resetPos();
                        return false;
                    });
                    return false;
                }
                if (currentHeight === 0) {
                    currentHeight = movement.pop();
                }
                
                var height = currentHeight % heightPerFrame;

                if (height === 0) {
                    height = (heightPerFrame * (currentHeight / Math.sqrt(currentHeight * currentHeight)));
                }

                char.addOvY(height);
                currentHeight -= (height);
                
                return true;
            }
        }
    };

    var event = function() {
        var trials = [
            new Trial(1, 0.5, Box),
            new Trial(2.5, 1, Cornichon),
            new Trial(0.4, 0.75, Peanut)
        ];

        return {
            update: function() {
                trials.forEach(function(trial) {
                    trial.triggerHandler();
                })
            },
            draw: function() {
                events.draw();
            }
        }
    }();

    return {
        draw: function() {
            map.draw();
            event.draw();
            char.draw();
        },
        update: function() {
            event.update();
            map.update();
            char.update();
        },
        click: function() {
        },
        keyhit: {
            "SPACE": function() {
                if (char.isBusy)
                    return;
                jumpSound();
                events.addEvent((new characterAction(char)).JUMP);
            },
            "P": function() {
                setState("PAUSE");
            }
        },
        init: function() {
            isInvincible = false;
            runningSound();
            stopWinSound();
        }
    }
}