"use strict";
/*
Responsible for the player.
*/

function Player(playerStill, playerAnimated) {
    this._jumping = false;
    this._playerStill = new PIXI.Sprite(playerStill);
    this._playerAnimated = playerAnimated;
    this._xVelocity = 0;
    this._yVelocity = 0;
    this._speed = 4;
    this._apech = 150;
    this._origJumpPoint;
}



Player.prototype.moveLeft = function() {
    this._playerStill.scale.x = -1;
    this._playerAnimated.scale.x = -1;
    this._playerStill.visible = false;
    this._playerAnimated.visible = true;
    
   this._xVelocity = -this._speed;

}

Player.prototype.moveRight = function() {
    this._playerStill.scale.x = 1;
    this._playerAnimated.scale.x = 1;
    this._playerStill.visible = false;
    this._playerAnimated.visible = true;
    
   this._xVelocity = this._speed;

}

Player.prototype.jump = function() {
    this._yVelocity = -5;
    this._origJumpPoint = this._playerStill.y;
    this._jumping = true;
}

Player.prototype.still = function() {
    this._xVelocity = 0;
    this._playerStill.visible = true;
    this._playerAnimated.visible = false;
}

Player.prototype.move = function() {
    this._playerStill.x += this._xVelocity;
    this._playerStill.y += this._yVelocity;
    this._playerAnimated.x = this._playerStill.x;
    this._playerAnimated.y = this._playerStill.y;
    

    if(this._apech == (this._origJumpPoint - this._playerStill.y)) {
        this._yVelocity = 5;
    }
    if(this._jumping == true && this._origJumpPoint == this._playerStill.y) {
        this._jumping = false;
    }

    
}

Player.prototype.setAnchorStill = function(x,y) {
    this._playerStill.anchor.set(x, y);
}

Player.prototype.setAnchorAnim = function(x,y) {
    this._playerAnimated.anchor.set(x, y);
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

Object.defineProperty(Player.prototype, "jumpBool", {
    set: function(jump) {
        this._jumping = jump;
    },
    get: function(){
        return this._jumping;
    }
})