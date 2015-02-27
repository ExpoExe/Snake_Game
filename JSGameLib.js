/**
 * Created by Justin_NZXT on 2/25/2015.
 */
//Library for a simple 2D game in HTML Canvas

key = KeyboardEvent;

key.h = key.prototype;
key.h.hook = function (key) {};

var KEY_W = 87;
var KEY_A = 65;
var KEY_S = 83;
var KEY_D = 68;
var KEY_SPACE = 32;
var KEY_ESC = 27;

function autoInvoke(f) {
    if (f instanceof Function)
        new f();
}

function createCanvas(width, height) {
    var c = document.createElement("canvas");
    c.width = width;
    c.height = height;
    return c;
}

function addObjectToBody(o) {
    document.body.appendChild(o);
}

function getContext(o) {
    return o.getContext("2d");
}

function getDrawArea(width, height) {
    var obj1 = createCanvas(width, height);
    addObjectToBody(obj1);
    return getContext(obj1);
}

function executeEveryMillisecond(f, m) {
    if (f instanceof Function) {
        setInterval(function () { f(); }, m)
        return true;
    }
    else
        return false;
}

function _2DObject(x, y) {
    this.x = x;
    this.y = y;
}

autoInvoke(function () {
    console.log("JSGameLib");
    window.onkeydown = function (e) { e.hook(e); }
});