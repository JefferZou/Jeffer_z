/**
 * Created by Administrator on 2017/10/10.
 */
function Bird(info) {

    this.canvas = info.canvas;
    this.context = info.context;
    this.x = info.x;
    this.y = info.y;
    this.image = info.image;
    this.w = this.image.width / 3;
    this.h = this.image.height;

    this.index = 0;
    this.aspeed = 0.0005;
    this.speed = 0;

    this.startTime = new Date();
    this.maxspeed = 0.6;
    this.maxAngle = 45;
}

Bird.prototype = {
    constructor : Bird,

    draw : function () {
        this.index += 1;
        var xindex = this.index % 3;

        var now = new Date();

        var delataTime = now - this.startTime;

        var s = this.speed * delataTime + this.aspeed * delataTime * delataTime / 2;
        this.speed = this.speed + this.aspeed * delataTime;

        this.startTime = now;

        this.y += s;

        this.context.save();
        this.context.translate(100 + this.w/2, this.y + this.h/2);
        var percent = this.speed / this.maxspeed;
        var radian = (this.maxAngle * percent) / 180 * Math.PI;
        this.context.rotate(radian);

        this.context.drawImage(this.image,this.w * xindex, 0, this.w, this.h, -this.w/2, -this.h/2, this.w, this.h)
        this.context.restore();
    }
}