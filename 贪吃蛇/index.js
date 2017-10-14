; (function (window) {

    function Food(x, y, width, height, color) {
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 20;
        this.height = height || 20;
        this.color = color || 'green';
    }
    var list = [];
    Food.prototype.render = function (map) {
        remove();
        this.x = Math.floor(Math.random() * map.offsetWidth / this.width) * this.width;
        this.y = Math.floor(Math.random() * map.offsetHeight / this.height) * this.height;

        var div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.left = this.x + 'px';
        div.style.top = this.y + 'px';
        div.style.width = this.width + 'px';
        div.style.height = this.height + 'px';
        div.style.backgroundColor = this.color;

        map.appendChild(div);

        list.push(div);
    }
    function remove() {
        for (var i = list.length - 1; i >= 0; i--) {
            list[i].parentNode.removeChild(list[i]);
            list.pop();
        }
    }

    window.Food = Food;
}(window));

; (function (window) {

    function Snake(width, height, direction) {
        this.width = width || 20;
        this.height = height || 20;
        this.direction = direction || 'right';
        this.body = [
            { x: 3, y: 1, color: 'red' },
            { x: 2, y: 1, color: 'pink' },
            { x: 1, y: 1, color: 'skyblue' }
        ]
    }

    Snake.prototype.render = function (map) {
        remove();
        for (var i = 0; i < this.body.length; i++) {
            var unit = this.body[i];
            var div = document.createElement('div');
            div.style.position = 'absolute';
            div.style.left = unit.x * this.width + 'px';
            div.style.top = unit.y * this.height + 'px';
            div.style.width = this.width + 'px';
            div.style.height = this.height + 'px';
            div.style.backgroundColor = unit.color;

            map.appendChild(div);

            list.push(div);
        }
    }
    var list = [];
    Snake.prototype.move = function (food, map) {
        for (var i = this.body.length - 1; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        switch (this.direction) {
            case 'right':
                this.body[0].x += 1;
                break;
            case 'left':
                this.body[0].x -= 1;
                break;
            case 'top':
                this.body[0].y -= 1;
                break;
            case 'bottom':
                this.body[0].y += 1;
                break;
        }

        var foodx = food.x;
        var foody = food.y;
        var headx = this.body[0].x * this.width;
        var heady = this.body[0].y * this.height;
        if (foodx == headx && foody == heady) {
            var obj = this.body[this.body.length - 1];
            this.body.push({
                x: obj.x,
                y: obj.y,
                color: colorSnake()
            })
            food.render(map);
        }
    }
    function remove() {
        for (var i = list.length - 1; i >= 0; i--) {
            list[i].parentNode.removeChild(list[i]);
            list.pop();
        }
    }
    function colorSnake() {
        var list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
        var arr = [];
        for(var i = 0; i < 6; i++) {
            arr[arr.length] = list[Math.floor(Math.random() * 16)];
        }
        var str = '#' + arr.join('');
        return str;
    }

    window.Snake = Snake;
}(window));

; (function (window) {
    var that = null;
    function Game(map) {
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        that = this;
    }

    Game.prototype.start = function () {
        this.food.render(this.map);
        this.snake.render(this.map);
        runSnake();
        bindKey();
    }
    function runSnake() {
        var timeId = setInterval(function () {
            this.snake.move(this.food, this.map);
            this.snake.render(this.map);

            var mapx = this.map.offsetWidth / this.snake.width;
            var mapy = this.map.offsetHeight / this.snake.height;
            var headx = this.snake.body[0].x;
            var heady = this.snake.body[0].y;
            if (headx >= mapx || heady >= mapy || headx < 0 || heady < 0) {
                alert('Game Over');
                clearInterval(timeId);
            }
        }.bind(that), 100);
    }
    function bindKey() {
        document.addEventListener('keydown', function (e) {
            e = e || window.event;
            switch (e.keyCode) {
                case 37:
                    this.snake.direction = 'left';
                    break;
                case 38:
                    this.snake.direction = 'top';
                    break;
                case 39:
                    this.snake.direction = 'right';
                    break;
                case 40:
                    this.snake.direction = 'bottom';
                    break;
            }
        }.bind(that), false);
    }

    window.Game = Game;
}(window));