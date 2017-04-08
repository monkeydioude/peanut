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
        var jumpHeight = 140,
            heightPerFrame = 2,
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

                if (char.hasReachedGround()) {
                    char.isBusy = false;
                    char.addEvent(function() {
                        char.resetPos();
                        return false;
                    });
                    return false;
                }
                return true;
            }
        }
    };

    var event = function(){
        var events = new Events(),
            nextEventPop = 0;
        
        var generateNextEventPop = function() {
            return Math.round(fps * ((eventsPopMiliSecs + (Math.random() * eventsPopRandGap)) / 1000));
        }

        var resetNextEventPop = function() {
            nextEventPop = generateNextEventPop();
        }

        var shouldTriggerEvent = function() {
            return nextEventPop <= 0;
        };

        var triggerHandler = function() {
            if (!shouldTriggerEvent()) {
                nextEventPop--;
                return;
            }
            resetNextEventPop();
            var box = new Box();
            events.addEvent(
                function() {
                    return box.update();
                },
                function() {
                    box.draw();
                });
        };

        resetNextEventPop();

        return {
            update: function() {
                triggerHandler();
                events.update();
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
        },
        click: function() {
            setState('PAUSE');
        },
        keyhit: {
            "SPACE": function() {
                if (char.isBusy)
                    return;
                char.addEvent((new characterAction(char)).JUMP);
            },
            "P": function() {
                setState("PAUSE");
            }
        }
    }
}