"use strict";
/*
Responsible for the player.
*/

function Player(playerStill /*, playerAnimated*/) {
    this._jumping = false;
    this._playerStill = new PIXI.Sprite(playerStill);
    this._playerAnimated /*= playerAnimated*/;
    this._xVelocity = 0;
    this._yVelocity = 0
    this._speed = 5;
}



Player.prototype.moveLeft = function() {
    this.xVelocity = -speed;
}

Player.prototype.moveRight = function() {
    this.xVelocity = speed;
}

Player.prototype.jump = function() {
    
}

Player.prototype.still = function() {
    this.xVelocity = 0;
}

Player.prototype.move = function() {
    //temporary
    this._playerStill.x += this._xVelocity;
    this._playerStill.y += this._yVelocity;
    
}

Object.defineProperty(Player.prototype, "xVel", {
    set: function(velocity) {
        this._xVelocity = velocity;
    },
    get: function(){
        return this._xVelocity;
    }
})

Object.defineProperty(Player.prototype, "yVel", {
    set: function(velocity) {
        this._yVelocity = velocity;
    },
    get: function(){
        return this._yVelocity;
    }
})