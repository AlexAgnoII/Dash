"use strict";
/*
Responsible for the tiles generated in the world.
- Tiles (What user can stand on)
- dmg Tiles (What users can NOT stand on)
- door
*/


function Level(levelList) {
    this._levelList = levelList;
    this._currentLevel;
}