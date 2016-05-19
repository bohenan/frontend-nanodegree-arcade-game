"use strict";
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // this.x=-200;
    // this.y=62+Math.floor(Math.random()*3)*84;
    // this.speed=100+Math.random()*400;
    this.reset();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x <= 600) {
        this.x+=this.speed*dt;
    }else{
        this.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function(){
    this.x=-200;
    this.y=62+Math.floor(Math.random()*3)*84;
    this.speed=100+Math.random()*400;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.x=200;
    this.y=400;
};

Player.prototype.checkcollision = function(enemy){
    if (Math.abs(this.y-enemy.y)<=50 && Math.abs(this.x-enemy.x)<=50) {
        this.x=200;
        this.y=400;
    }
};

Player.prototype.update = function(){
    allEnemies.forEach(this.checkcollision,this);
};

Player.prototype.render=function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset=function(){
    this.y=400;
    this.x=200;
};

Player.prototype.handleInput=function(i){
    if(i=='up'){
        if (this.y>64) {
            this.y-=84;
        }else{
            // this.y=400;
            // this.x=200;
            this.reset();
            alert("You Won!!");
        }
    }else if (i=='down') {
        if (this.y<400) {
            this.y+=84;
        }
    }else if (i=='left') {
        if (this.x>0) {
            this.x-=100;
        }
    }else if (i=='right') {
        if (this.x<400) {
            this.x+=100;
        }
    }
};

// function checkcollision(enemy){
//     if (Math.abs(this.y-enemy.y)<=50 && Math.abs(this.x-enemy.x)<=50) {
//         this.x=200;
//         this.y=400;
//     }
// };


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//var allEnemies = new Array();
var allEnemies = [];

var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var enemy4 = new Enemy();
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);
// allEnemies.push(enemy4);
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
