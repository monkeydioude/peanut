var isInvincible = false;

var wounded = function()
{
    if (isInvincible) {
        return;
    }
    var woundedFrame = [false, true, true];
    var invincibleFrame = [false, true, true, true, true, true, true, true, true, true, true, true, true];
    game.lifeDown();
    if (game.isOver()) {
        setState("OVER");
    }
    events.addEvent(
        function() {
            return woundedFrame.pop();
        },
        function() {
            canvas.ctx.globalAlpha = 0.2;
            canvas.ctx.fillStyle = "#ff0000";
            canvas.ctx.fillRect(0, 0, gbwidth, gbheight);
            canvas.ctx.globalAlpha = 1;
        }
    );

    events.addEvent(
        function() {
            isInvincible = invincibleFrame.pop();
            return isInvincible;
        }
    )
};

var peanutCounter = 0;

var healed = function() {
    peanutCounter++;
    if (peanutCounter % 3 == 0) {
        game.lifeUp();
        peanutCounter = 0;
        return true;
    }
    return false;
};

var winPoints = function() {
    game.points++;
    if (game.isCompleted()) {
        setState("WIN");
    }
};

var Box = function()
{
    this.x = gbwidth;
    this.y = floorY - (this.h / 2);
    this.color = hexColorGen();
}

Box.prototype = {
    x: 0,
    y: 0,
    w: 60,
    h: 60,
    update: function() {
        if (char.isHit(this.x1(), this.y1()) || char.isHit(this.x2(), this.y1())) {
            wounded();
            bumpSound();
            return false;
        }
        if (this.x2() <= 0) {
            return false;
        }
        this.x -= getScaledXMove();
        return true;
    },
    draw: function() {
        drawCrate(this.x1(), this.y1(), this.w, this.h);
        return true;
    },
    x1: function() {
        return this.x - (this.w / 2);
    },
    y1: function() {
        return this.y - (this.h / 2) - 1;
    },
    x2: function() {
        return this.x + (this.w / 2);
    }
};

var Cornichon = function()
{
    this.x = gbwidth;
    this.y = 70;
    this.color = "#003300";
};

Cornichon.prototype = {
    x: 0,
    y: 0,
    w: 40,
    h: 40,
    update: function() {
        if (
            char.isHit(this.x1(), this.y1())
            || char.isHit(this.x2(), this.y1())
            || char.isHit(this.x2(), this.y2())
            || char.isHit(this.x1(), this.y2())
        ) {
            wounded();
            bumpSound();
            return false;
        }
        if (this.x2() <= 0) {
            return false;
        }
        this.x -= getScaledXMove();
        return true;
    },
    draw: function() {
        drawImg("img/poo.png", this.x1(), this.y1(), this.w, this.h, 300, 300);
        return true;
    },
    x1: function() {
        return this.x - (this.w / 2);
    },
    y1: function() {
        return this.y - (this.h / 2);
    },
    y2: function() {
        return this.y + (this.h / 2);
    },
    x2: function() {
        return this.x + (this.w / 2);
    }
};


var Peanut = function()
{
    this.x = gbwidth;
    this.y = 80;
    this.color = "#A52A2A";
};

Peanut.prototype = {
    x: 0,
    y: 0,
    w: 30,
    h: 30,
    update: function() {
        if (
            char.isHit(this.x1(), this.y1())
            || char.isHit(this.x2(), this.y1())
            || char.isHit(this.x2(), this.y2())
            || char.isHit(this.x1(), this.y2())
        ) {
            winPoints();
            if (healed()) {
                upSound();
            } else {
                peanutSound();
            }
            return false;
        }
        if (this.x2() <= 0) {
            return false;
        }
        this.x -= getScaledXMove();
        return true;
    },
    draw: function() {
        drawImg("img/peanut.png", this.x1(), this.y1(), this.w, this.h, 128, 128);
        return true;
    },
    x1: function() {
        return this.x - (this.w / 2);
    },
    y1: function() {
        return this.y - (this.h / 2);
    },
    y2: function() {
        return this.y + (this.h / 2);
    },
    x2: function() {
        return this.x + (this.w / 2);
    }
};

var Trial = function(eventsPopSecs, eventsPopRandGap, type) {
    this.eventsPopMiliSecs = eventsPopSecs * 1000;
    this.eventsPopRandGap = eventsPopRandGap * 1000;
    this.type = type;
    this.resetNextEventPop();
};

Trial.prototype = {
    nextEventPop: 0,
    generateNextEventPop: function() {
        return Math.round(fps * ((this.eventsPopMiliSecs + (Math.random() * this.eventsPopRandGap)) / 1000));
    },
    resetNextEventPop: function() {
        this.nextEventPop = this.generateNextEventPop();
    },
    shouldTriggerEvent: function() {
        return this.nextEventPop <= 0;
    },
    triggerHandler: function() {
        if (!this.shouldTriggerEvent()) {
            this.nextEventPop--;
            return;
        }
        this.resetNextEventPop();
        var tt = new this.type();
        events.addEvent(
            function() {
                return tt.update();
            },
            function() {
                tt.draw();
            }
        );
    }
};