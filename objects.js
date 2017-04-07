
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
    this.x = 30;
    this.y = 200;
    this.w = 50;
    this.h = 70;
    this.life = 3;
};

var Mouse = function(entity)
{
    this.entity = entity;
}

Mouse.prototype = {
    click: null,
    setClick: function(cb) {
        this.click = cb;
    }
};