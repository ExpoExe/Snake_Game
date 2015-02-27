/**
 * Created by Justin_NZXT on 2/24/2015.
 */

var ctx = getDrawArea(400, 400);

var paused = false;
var gameOver = false;
var score = 0;
var gameSpeed = 100;
var scale = 10;
var topBoundry = 0;
var bottomBoundry = ctx.canvas.height/scale - 1;
var leftBoundry = 0;
var rightBoundry = ctx.canvas.width/scale - 1;
var tail = [];

_2DObject.prototype.draw = function(){
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x * scale, this.y * scale, scale, scale);
};
_2DObject.prototype.lastX = 0;
_2DObject.prototype.lastY = 0;
_2DObject.prototype.color = "Green";

var snakeHead = new _2DObject(Math.floor(ctx.canvas.width / scale) / 2, Math.floor(ctx.canvas.height / scale) / 2);
snakeHead.direction = "right";

var food = new _2DObject(0,0);
food.place = function(){

    while(true) {
        this.x = Math.floor((Math.random() * ctx.canvas.width) /scale);
        this.y = Math.floor((Math.random() * ctx.canvas.height) / scale);

        var cont = true;

        for (var i = 0; i < tail.length; i++)
            if (tail[i].x == this.x && tail[i].y == this.y)
                cont = false;


        if (!this.eaten() && cont)
            break;
    }
};

key.h.hook = function(e){
    if(e.keyCode == KEY_W && snakeHead.direction != "down"){
        snakeHead.direction = "up";
    }
    if(e.keyCode == KEY_A && snakeHead.direction != "right"){
        snakeHead.direction = "left";
    }
    if(e.keyCode == KEY_S && snakeHead.direction != "up"){
        snakeHead.direction = "down";
    }
    if(e.keyCode == KEY_D && snakeHead.direction != "left"){
        snakeHead.direction = "right";
    }
    if(e.keyCode == KEY_SPACE){
        paused = !paused;
    }
    if(e.keyCode == KEY_ESC){

    }

};

function draw(){
    ctx.fillStyle = "Black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    snakeHead.draw();
    food.draw();

    ctx.fillStyle = "White";
    ctx.font = "10px Arial";
    ctx.fillText(score, 5, 10);
}

food.eaten = function() {
    if(snakeHead.x == this.x && snakeHead.y == this.y)
        return true;
    else
        return false;
};
food.color = "Red";

function eat(){
    score++;
    food.place();
    appendTail();
}

function appendTail(){
    if(tail.length == 0)
        tail.push(new _2DObject(snakeHead.lastX, snakeHead.lastY));
    else
        tail.push(new _2DObject(tail[tail.length-1].lastX, tail[tail.length-1].lastY));
}

function boundaryHit(){
    if((snakeHead.y <= topBoundry) ||
        (snakeHead.y >=  bottomBoundry) ||
        (snakeHead.x <= leftBoundry) ||
        (snakeHead.x >= rightBoundry))
        return true;
    else
        return false;
}


autoInvoke(function(){
    executeEveryMillisecond(gameLoop, gameSpeed);
    food.place();
});

function gameLoop() {

    if (!paused) {
        switch (snakeHead.direction) {
            case "up":
                snakeHead.lastX = snakeHead.x;
                snakeHead.lastY = snakeHead.y;
                snakeHead.y--;
                break;
            case "down":
                snakeHead.lastX = snakeHead.x;
                snakeHead.lastY = snakeHead.y;
                snakeHead.y++;
                break;
            case "left":
                snakeHead.lastX = snakeHead.x;
                snakeHead.lastY = snakeHead.y;
                snakeHead.x--;
                break;
            case "right":
                snakeHead.lastX = snakeHead.x;
                snakeHead.lastY = snakeHead.y;
                snakeHead.x++;
                break;

        }

        if (food.eaten()) {
            eat();
        }

        if(boundaryHit()){


            switch(snakeHead.direction){
                case "up":
                    snakeHead.direction = "down";
                    break;
                case "down":
                    snakeHead.direction = "up";
                    break;
                case "left":
                    snakeHead.direction = "right";
                    break;
                case "right":
                    snakeHead.direction = "left";
                    break;
            }
        }
    }

    draw();
}