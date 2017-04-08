
var Canvas = function(id) {
    this.entity = document.querySelector(id);
    this.ctx = this.entity.getContext("2d");
};

Canvas.prototype = {
    entity: null,
    ctx: null,
    begin: function() {
        this.ctx.beginPath();
    },
    end: function() {
        this.ctx.stroke();
    }
};

var Char = function() {
    this.x = (this.w / 2) + 20;
    this.defaultX = this.x;
    this.y = floorY - (this.h / 2);
    this.defaultY = this.y;
};

Char.prototype = {
    defaultX: 0,
    x: 0,
    y: 0,
    w: 50,
    h: 70,
    ovY : 0,
    isBusy: false,
    draw: function() {
        canvas.ctx.rect(this.x1(), this.y1(), this.w, this.h - 1);
    },
    x1: function() {
        return (this.x - (this.w / 2));
    },
    x2: function() {
        return (this.x + (this.w / 2));
    },
    y1: function() {
        return this.y - (this.h / 2);
    },
    y2: function() {
        return this.y + (this.h / 2);
    },
    setOvY: function(ovY) {
        this.ovY = ovY;
    },
    addOvY: function(ovY) {
        this.setOvY(this.ovY + ovY);
    },
    hasReachedGround: function() {
        return this.defaultY == this.y;
    },
    resetPos: function() {
        console.log("resetPos");
        this.x = this.defaultX;
        this.y = this.defaultY;
    },
    isHit: function(x, y) {
        return (x >= this.x1() && x <= this.x2()) && (y >= this.y1() && y <= this.y2());
    },
    update: function() {
//        console.log("char events udpate");
//        this.events.update();
        this.y -= this.ovY;
        this.ovY = 0;
    }
};

var Mouse = function(entity)
{
    this.entity = entity;
}

Mouse.prototype = {
    click: null
};

var Keyboard = function(){}

Keyboard.prototype = {
    hit: null,
    ready: true,
    codes: {
        13: "ENTER",
        27: "ESC",
        32: "SPACE",
        38: "UP",
        80: "P"
    }
};


var Game = function(){}

Game.prototype = {
    maxLife:3,
    life: 3,
    points: 0,
    goal: 20,
    isCompleted: function () {
        return this.points == this.goal;
    },
    isOver: function() {
        return this.life === 0;
    },
    lifeDown: function() {
        this.life--;
    },
    lifeUp : function() {
        if (this.life < this.maxLife) {
            this.life++;
        }
    },
    draw: function() {
        var heartSize = 25,
            startY = 20,
            startX = gbwidth - (this.maxLife * heartSize),
            str = "";
        for (var i = 0; i < this.life; i++) {
            str += "<3 ";
        }
        for (i = 0; i < (this.maxLife - this.life); i++) {
            str += "</3 ";
        }
        write(str, startX, startY);
    }
};

var Events = function() {
    for (var s in states) {
        this.events[s] = {};
        this.draws[s] = {};
    }
}

Events.prototype = {
    eventIt: -1,
    events : {},
    draws: {},
    addEvent: function(updateCb, drawCb) {
        this.eventIt++;
        this.events[stateName][this.eventIt] = updateCb;
        if (drawCb)
            this.draws[stateName][this.eventIt] = drawCb;
        return this.eventIt;
    },
    deleteEvent: function(key) {
        delete this.events[stateName][key];
    },
    deleteDraw: function(key) {
        delete this.draw[stateName][key];
    },
    update: function() {
//        console.log(this.events[stateName]);
        for (var k in this.events[stateName]) {
            if (this.events[stateName][k] && this.events[stateName][k]() == false) {
                delete this.events[stateName][k];
            }
        }
    },
    draw: function() {
        for (var k in this.draws[stateName]) {
            if (!this.events[stateName][k]) {
                delete this.draws[stateName][k];
            } else {
                this.draws[stateName][k]();
            }
        }
    }
}