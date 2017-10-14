/**
 * Created by Administrator on 2017/10/10.
 */
function Pipe(info) {
    this.topImage = info.topImage;
    this.bottomImage = info.bottomImage;
    this.x = info.x;
    this.speed = 2;
    this.canvas = info.canvas;
    this.context = info.context;
    this.gap = info.gap;
    this.space = 100;
    this.bottomOffset = info.bottomOffset;
    this.topHeight = 0;
    this.bottomHeight = 0;
    this.initHeight();
}

Pipe.prototype = {
    constructor : Pipe,

    draw : function () {
        this.x -= this.speed;
        if(this.x <= -this.topImage.width) {
            this.initHeight();
            this.x = this.topImage.width * 5 + this.gap * 6;
        }

        this.context.drawImage(this.bottomImage, this.x, 0, this.topImage.width, this.topHeight);

        this.context.drawImage(this.topImage, this.x, this.topHeight + this.space, this.bottomImage.width, this.bottomHeight);

        this.context.rect(this.x, 0, this.topImage.width, this.topHeight);

        this.context.rect(this.x, this.canvas.height-this.bottomOffset-this.bottomHeight, this.bottomImage.width, this.bottomHeight);
    },

    initHeight : function () {
        this.topHeight = Math.random() * 150 + 100;
        this.bottomHeight = this.canvas.height - this.topHeight - this.space - this.bottomOffset;
    }
}