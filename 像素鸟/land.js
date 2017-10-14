/**
 * Created by Administrator on 2017/10/10.
 */
function Land(info) {
    this.image = info.image;
    this.x = info.x;
    this.canvas = info.canvas;
    this.context = info.context;
    this.speed = 2;
}

Land.prototype = {
    constroctor : Land,

    draw : function () {
        this.x -= this.speed;

        if(this.x <= -this.image.width) {
            this.x = this.image.width * 4;
        }

        this.context.drawImage(this.image, this.x, this.canvas.height - this.image.height,this.image.width,this.image.height);
    }
}