
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
    this.ovY = 0;
};

Char.prototype = {
    defaultX: 0,
    x: 0,
    y: 0,
    w: 50,
    h: 70,
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
        return this.y - (this.h / 2) - this.ovY;
    },
    y2: function() {
        return this.y + (this.h / 2) - this.ovY;
    },
    setOvY: function(ovY) {
        this.ovY = ovY;
    },
    addOvY: function(ovY) {
        this.setOvY(this.ovY + ovY);
    },
    eventIt: -1,
    events : {},
    addEvent: function(cb) {
        this.eventIt++;
        this.events[this.eventIt] = cb;
        return this.eventIt;
    },
    deleteEvent: function(key) {
        delete this.events[key];
    },
    update: function() {
        for (var k in this.events) {
            if (this.events[k]() == false) {
                delete this.events[k];
            }
        }
    },
    isOnGround: function() {
        return this.defaultX == this.x && this.defaultY == (this.y + this.ovY);
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
        32: 'SPACE'
    }
};

var Game = function(){}

Game.prototype = {
    life: 3,
    points: 0,
    goal: 10,
    isCompleted: function () {
        return this.points = this.goal;
    },
    isOver: function() {
        return life > 0;
    }
};