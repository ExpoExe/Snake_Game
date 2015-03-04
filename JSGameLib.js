/**
 * Created by Justin_NZXT on 2/25/2015.
 * Library for a simple 2D game in HTML Canvas
 */

key = KeyboardEvent;

key.h = key.prototype;
key.h.hook = function (key) {};

var KEY_W = 87;
var KEY_A = 65;
var KEY_S = 83;
var KEY_D = 68;
var KEY_SPACE = 32;
var KEY_ESC = 27;


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    var path = "; path=/cgi-bin";
    document.cookie = cname + "=" + cvalue + "; " + expires + path;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0 )== ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

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

function addObjectToPage(o, divName) {
    document.getElementById(divName).appendChild(o);
}

function getContext(o) {
    return o.getContext("2d");
}

function getDrawArea(width, height, divName) {
    var obj1 = createCanvas(width, height);
    addObjectToPage(obj1, divName);
    return getContext(obj1);
}

function executeEveryMillisecond(f, m) {
    if (f instanceof Function) {
        setInterval(function () { f(); }, m);
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