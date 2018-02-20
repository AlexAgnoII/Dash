"use strict";
/*
Responsible for the tiles generated in the world.
- Tiles (What user can stand on)
- dmg Tiles (What users can NOT stand on)
- door
*/


function Level() {
    this._levelList;
    this._currentLevel;
}


Level.prototype.load = function(){
    this._levelList = "lmao";
    console.log(this._levelList);
}