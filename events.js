var wounded = function()
{
    game.lifeDown();
    if (game.isOver()) {
        setState("OVER");
    }
};

var healed = function() {
    game.lifeUp();
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
            return false;
        }
        if (this.x2() <= 0) {
            return false;
        }
        this.x -= getScaledXMove();
        return true;
    },
    draw: function() {
        canvas.ctx.fillStyle = this.color;
        canvas.ctx.fillRect(this.x1(), this.y1(), this.w, this.h);
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
    w: 10,
    h: 10,
    update: function() {
        if (
            char.isHit(this.x1(), this.y1())
            || char.isHit(this.x2(), this.y1())
            || char.isHit(this.x2(), this.y2())
            || char.isHit(this.x1(), this.y2())
        ) {
            wounded();
            return false;
        }
        if (this.x2() <= 0) {
            return false;
        }
        this.x -= getScaledXMove();
        return true;
    },
    draw: function() {
        canvas.ctx.fillStyle = this.color;
        canvas.ctx.fillRect(this.x1(), this.y1(), this.w, this.h);
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
    w: 10,
    h: 10,
    update: function() {
        if (
            char.isHit(this.x1(), this.y1())
            || char.isHit(this.x2(), this.y1())
            || char.isHit(this.x2(), this.y2())
            || char.isHit(this.x1(), this.y2())
        ) {
            winPoints();
            healed();
            return false;
        }
        if (this.x2() <= 0) {
            return false;
        }
        this.x -= getScaledXMove();
        return true;
    },
    draw: function() {
        canvas.ctx.fillStyle = this.color;
        canvas.ctx.fillRect(this.x1(), this.y1(), this.w, this.h);
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