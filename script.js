/**
 * Created by Justin_NZXT on 2/24/2015.
 */

var ctx = getDrawArea(400, 400, "game");

var paused = false;
var gameOver = false;
var score = 0;
var gameSpeed = 100;
var scale = 10;

var topBoundary = -1;
var bottomBoundary = ctx.canvas.height/scale;
var leftBoundary = -1;
var rightBoundary = ctx.canvas.width/scale;
var tail = [];
var initTailLength = 2;

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

    food.color = "Red";
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
        reset();
    }

};

function draw(){

    if(!paused)
        ctx.fillStyle = "Black";
    else
        ctx.fillStyle = "Gray";

    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    snakeHead.draw();
    food.draw();

    for(var i = 0; i < tail.length; i++)
        tail[i].draw();

    ctx.fillStyle = "White";
    ctx.font = "10px Arial";
    if(!paused)
        ctx.fillText(score, 5, 10);
    else
        ctx.fillText("PAUSED", 5, 10);
}

food.eaten = function() {
    if(snakeHead.x == this.x && snakeHead.y == this.y)
        return true;
    else
        return false;
};

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

function initTail(){
    for(var i  = 0; i < initTailLength; i++)
        appendTail();
}

function reset(){
    score = 0;
    food.place();
    tail = [];
    snakeHead = new _2DObject(Math.floor(ctx.canvas.width / scale) / 2, Math.floor(ctx.canvas.height / scale) / 2);
    initTail();
    alert("Game Over. You hit a wall. Use WASD to restart.");
}

function snakeCrash(){
    if((snakeHead.y <= topBoundary) ||
        (snakeHead.y >=  bottomBoundary) ||
        (snakeHead.x <= leftBoundary) ||
        (snakeHead.x >= rightBoundary))
        return true;
    else
        return false;
}


autoInvoke(function(){
    executeEveryMillisecond(gameLoop, gameSpeed);
    food.place();
    initTail();
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

        if(tail.length >= 1){
            tail[0].lastX = tail[0].x;
            tail[0].lastY = tail[0].y;
            tail[0].x = snakeHead.lastX;
            tail[0].y = snakeHead.lastY;
        }

        if(tail.length > 1)
            for (var i = 1; i < tail.length; i++){
                tail[i].lastX = tail[i].x;
                tail[i].lastY = tail[i].y;
                tail[i].x = tail[i - 1].lastX;
                tail[i].y = tail[i - 1].lastY;
            }

        if (food.eaten()) {
            eat();
        }

        if(snakeCrash()){
            reset();
        }
    }

    draw();
}