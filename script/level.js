"use strict";
/*
Responsible for the tiles generated in the world.
- Tiles (What user can stand on)
- dmg Tiles (What users can NOT stand on)
- door
*/


function Level(data) {
    this._maxLevel = 5;
    this._levelList = data;
    this._currentLevel = 0;
    this._doorList = [];
    this._complete = false;
    this._playerLocations = [];
    this._levelContainers = [];
    this._levelThingList = [];
    this._dangerList = [];
}


Level.prototype.generateLevels = function(loader) {
    
    //Legend: 
    //1 = border walls
    //2 = player location
    //3 = tile (big_square)
    //4 = tile (big rectangle)
    //5 = tile (big vertical)
    //6 = tile (small_square)
    //7 = tile (small rectangle)
    //9 = door
    for(let x in this._levelList) {
        
        //generate container
        let container = new PIXI.Container();
        let size = 20;
        let xReal = 0;
        let yReal = 0;
        

//        //World object.
        let lvl = this._levelList[x];
        let things = [];
        let danger = [];
        console.log(x);
        for(let y in lvl) {
            let lvlArr = lvl[y];
            for(let  i = 0; i < lvlArr.length; i++) {
                let sprite = null;
                
                if(1 == lvlArr[i]){
                   //console.log("walls")
                    let rect = new PIXI.Graphics();
                    rect.beginFill(0,10);
                    //rect.alpha = 0;
                    rect.drawRect(xReal, yReal, size, size);
                    rect.endFill();
                    container.addChild(rect);
                }
                else if(2 == lvlArr[i]) {
                    this._playerLocations.push([xReal, yReal]);
                    sprite = null;
                }
                else if(3 == lvlArr[i]) {
                    //console.log("big_square")
                    sprite = new PIXI.Sprite(loader.tileID["big_square_tile"]);
                    things.push(sprite);

                }
                else if(4 == lvlArr[i]) {
                    ///console.log("big_rectangle")
                    sprite = new PIXI.Sprite(loader.tileID["big_rectangle_tile"]);
                    things.push(sprite);
                }
                else if(5 == lvlArr[i]) {
                    //console.log("big_vertical")
                    sprite = new PIXI.Sprite(loader.tileID["big_vertical_tile"]);
                    things.push(sprite);
                }
                else if(6 == lvlArr[i]) {
                    //console.log("small_square")
                    sprite = new PIXI.Sprite(loader.tileID["small_square_tile"]);
                    things.push(sprite);
                }
                else if(7 == lvlArr[i]) {
                    //console.log("smalle_rectangle")
                    sprite = new PIXI.Sprite(loader.tileID["small_rectangle_tile"]);
                    things.push(sprite);
                }
                else if(8 == lvlArr[i]){
                    //console.log("door")
                    sprite = new PIXI.Sprite(loader.atlasID[loader.ASSET_DOOR_CLOSED]);
                    this._doorList.push(sprite);
                }
                else if(9 == lvlArr[i]) {
                    //console.log("spike facing up")
                    sprite = new PIXI.Sprite(loader.atlasID[loader.ASSET_SPIKE_UP]);
                    danger.push(sprite);
                }
                else if(10 == lvlArr[i]) {
                    //console.log("spike facing down")
                    sprite = new PIXI.Sprite(loader.atlasID[loader.ASSET_SPIKE_DOWN]);
                    danger.push(sprite);
                }

                if(sprite != null) {
                    console.log("placed!")
                    sprite.position.set(xReal, yReal);
                    sprite.anchor.set(0.5,0.5);
                    container.addChild(sprite);
                }

                xReal += size;
            }
            xReal = 0;
            yReal += size;
        }
    
        this._levelContainers.push(container);
        this._levelThingList.push(things);
        this._dangerList.push(danger);
    }
    
    console.log(this._levelContainers)
    console.log( this._levelThingList)
    console.log(this._dangerList)
    console.log(this._doorList)
    console.log(this._playerLocations)
    
    
}

Object.defineProperty(Level.prototype, "currentDoor", {
    set: function(doors) {
         this._doorList = doors;
    },
    get: function(){
        return this._doorList[this._currentLevel];
    }
})

Object.defineProperty(Level.prototype, "currentLevel", {
    set: function(level) {
        this._currentLevel = level;
    },
    get: function(){
        return this._currentLevel;
    }
})

Object.defineProperty(Level.prototype, "currentLevelContainer", {
    set: function(test) {
        console.log("Current Level: " + test);
    },
    get: function(){
        return this._levelContainers[this._currentLevel];
    }
})

Object.defineProperty(Level.prototype, "currentThingsList", {
    set: function(test) {
        console.log("Current things: " + test);
    },
    get: function(){
        return this._levelThingList[this._currentLevel];
    }
})

Object.defineProperty(Level.prototype, "currentLevelPlayerLoc", {
    set: function(test) {
        console.log("Current loc: " + test);
    },
    get: function(){
        return this._playerLocations[this._currentLevel];
    }
})

Object.defineProperty(Level.prototype, "currentDangerTiles", {
    set: function(test) {
        console.log("Current loc: " + test);
    },
    get: function(){
        return this._dangerList[this._currentLevel];
    }
})
