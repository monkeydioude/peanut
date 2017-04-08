var wounded = function()
{
    game.lifeDown();
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
            console.log("ouch")
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

}

Cornichon
