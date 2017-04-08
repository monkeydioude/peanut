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
        var jumpHeight = 150,
            heightPerFrame = 10,
            currentHeight = 0,
            movement = [-jumpHeight, jumpHeight];

        char.isBusy = true;

        return {
            JUMP: function() {
                console.log('jumping')
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

                    console.log(currentHeight, height);
                char.addOvY(height);
                currentHeight -= (height);
                
                return true;
            }
        }
    };

    var event = function() {
        var nextEventPop = 0, 
            trials = [
                Box,
                Box,
                
            ];
        
        var generateNextEventPop = function() {
            return Math.round(fps * ((eventsPopMiliSecs + (Math.random() * eventsPopRandGap)) / 1000));
        };

        var resetNextEventPop = function() {
            nextEventPop = generateNextEventPop();
        };

        var shouldTriggerEvent = function() {
            return nextEventPop <= 0;
        };

        var getNextEvent = function() {
            
        }
        
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
            setState('PAUSE');
        },
        keyhit: {
            "SPACE": function() {
//                console.log(char.isBusy);
                if (char.isBusy)
                    return;
                events.addEvent((new characterAction(char)).JUMP);
            },
            "P": function() {
                setState("PAUSE");
            }
        }
    }
}