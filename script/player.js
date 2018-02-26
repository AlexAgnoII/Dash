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
    this._speed = 5;
    this._interval = 30;
    this._counter = 0;
    this._gravity = 0.5;
    this._hitTop = false;
    this._dead = false;
    this._word = "none";
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
    this._jumping = true;
}

Player.prototype.still = function() {
    this._xVelocity = 0;
    this._playerStill.visible = true;
    this._playerAnimated.visible = false;
}

Player.prototype.move = function(bump, tiles) {
    
    if(player._dead != true) {
        this._playerStill.x += this._xVelocity;
        this._playerStill.y += this._yVelocity;
        this._playerAnimated.x = this._playerStill.x;
        this._playerAnimated.y = this._playerStill.y;

        //console.log(tiles.length);

//        if(this._jumping) {
//
//            if(this._counter == this._interval) {
//
//                if(this._hitTop) {
//                    this._yVelocity = 5;
//                    this._hitTop = false;
//                }
//                else
//                    this._yVelocity += this._gravity;
//
//
//                for(let  i = 0; i < tiles.length; i++) {
//                    if(bump.hit(this._playerStill, tiles[i], true) == "bottom") {
//                        this._jumping = false;
//                        this._counter = 0;
//                    }
//                    bump.hit(this._playerAnimated, tiles[i], true)
//                }
//
//
//            }
//
//            else {
//                this._yVelocity = -7.5;
//                this._counter++;
//
//                for(let  i = 0; i < tiles.length; i++) {
//                    if(bump.hit(this._playerStill, tiles[i], true) == "top") {
//                        this._counter = this._interval;
//                        this._hitTop = true;
//                        //console.log("top")
//
//                    }
//                    bump.hit(this._playerAnimated, tiles[i], true)
//                }
//            }
//        }
//
//        else {
//
//                for(let  i = 0; i < tiles.length; i++) {
//                    if(bump.hit(this._playerStill, tiles[i],true) == "bottom") {
//                        //console.log("constant")
//                        this._yVelocity = 3; //originally 1
//                    }
//                    else {
//                        //ORIGINally *0.1
//                        this._yVelocity += this._gravity*0.3;
//                    }
//                }
//        }
        
        let wordContainer = [];
        for(let i = 0 ; i < tiles.length; i++) {
            
            let temp = bump.hit(this._playerStill, tiles[i], true);
            bump.hit(this._playerAnimated, tiles[i], true);
            
            wordContainer.push(temp);
        }
        
        if(wordContainer.includes("bottom")) {
            //console.log("has bottom!")
            this._word = "bottom";
        }
        else if(!this._jumping) {
            this._word = "none";
        }

        
        //jumping!
        if(this._jumping) {

            if(this._counter == this._interval) {

                if(this._hitTop) {
                    this._yVelocity = 5;
                    this._hitTop = false;
                }
                else
                    this._yVelocity = 3;
                
            }
            else {
                this._yVelocity = -7.5;
                this._counter++;
                this._word = "jumping";
                for(let  i = 0; i < tiles.length; i++) {
                    if(bump.hit(this._playerStill, tiles[i], true) == "top") {
                        this._counter = this._interval;
                        this._hitTop = true;
                        //console.log("top")

                    }
                    bump.hit(this._playerAnimated, tiles[i], true)
                }
                
                if(this._counter == this._interval) {
                    this._word = "none";
                }
            }
        }
        
        if(this._word == "bottom") {
            this._jumping = false;
            this._counter = 0;
            this._yVelocity = 3;
        }
        //free fall (not jumping)
        else if(this._jumping == false){
            this._counter = this._interval;
            this._jumping = true;
        }

    }
    else {
        
        if(player._playerStill.scale.x < 0) {
            player._playerStill.rotation -= 0.1;
        }
        else {
            player._playerStill.rotation += 0.1;
        }
    }
//
//    console.log("yVel: " + this._yVelocity);
//    console.log("xVel: " + this._xVelocity);

    
//    console.log(player._playerStill.y)
//    console.log(player._playerStill.x)
    
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



