"use strict";
/*
Responsible for the tiles generated in the world.
- Tiles (What user can stand on)
- dmg Tiles (What users can NOT stand on)
- door
*/


function Level(data) {
    this._levelList = data;
    this._currentLevel = 1;
    this._currentDoor;
    this._complete = false;
    this._playerLocations = [];
    this._levelContainers = [];
    this._levelThingList = [];
}


Level.prototype.generateLevels = function(loader) {
    console.log(this._levelList);
    
    
    //Traverse levels.
    for(let x in this._levelList) {
        
        //generate container
        let container = new PIXI.Container();
        let size = 20;
        let xReal = 0;
        let yReal;
        for(let  x = 0; x < size*2; x++) {
            yReal = 0;
                
            for(let y = 0; y < size*2; y++) {
                //
                if(x == 0 || (x == size*2 - 1 ) ||
                   y == 0 || (y == size*2 - 1)) {
                    let rect = new PIXI.Graphics();
                    rect.beginFill(0,10);
                    rect.alpha = 0;
                    rect.drawRect(xReal, yReal, size, size);
                    rect.endFill();
                    container.addChild(rect);
                        //this._playWall.push(rect);
                }

                yReal+= size;
            }
                
            xReal += size;
        }
        

        //World object.
        let lvl = this._levelList[x];
        let things = [];
        for(let y in lvl) {
            console.log(lvl[y])
            
            //if its none, its a player
            if(lvl[y].id == "none") {
                this._playerLocations.push([lvl[y].x, lvl[y].y])
            }
            
            //Else, it's either a tile OR an 
            else {
                let id;
                //from dashId atlas
                if(lvl[y].id == "dashId") {
                    id = loader.atlasID;
                }
                
                //from tile atlas
                else {
                    id = loader.tileID;
                }
                  
                let sprite = new PIXI.Sprite(id[lvl[y].name]);
                sprite.position.set(lvl[y].x, lvl[y].y);
                sprite.anchor.set(0.5,0.5);
                things.push(sprite);
                container.addChild(sprite);
            }

        }
        
        this._levelContainers.push(container);
        this._levelThingList.push(things);
        
    }
    console.log(this._levelContainers);
    console.log(this._levelThingList);
    console.log(this._playerLocations);
}
