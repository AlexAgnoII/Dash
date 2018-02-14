"use strict";
/*
Responsible for the player.
*/

function Player(playerStill /*, playerAnimated*/) {
    this._jumping = false;
    this._playerStill = playerStill;
    this._playerAnimated /*= playerAnimated*/;
    this._xVelocity = 0;
    this._yVelocity = 0
}



Player.prototype.moveLeft = function() {
    
}

Player.prototype.moveRight = function() {
    
}

Player.prototype.jump = function() {
    
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