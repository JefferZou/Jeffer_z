/**
 * Created by Administrator on 2017/10/10.
 */

//Sky的构造函数
function Sky(info) {
    this.image = info.image;
    this.x = info.x;
    this.speed = 2;
    this.canvas = info.canvas;
    this.context = info.context;
}

Sky.prototype = {
    constructor : Sky,

    draw : function () {
        this.x -= this.speed;
        if(this.x <= -this.canvas.width) {
            this.x = this.canvas.width;
        }

        this.context.drawImage(this.image,this.x, 0, this.image.width,this.image.height);
    }
}