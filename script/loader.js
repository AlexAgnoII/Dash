"use strict"
/*
This is for loading the assets required.
*/


function Loader() {
    this._pixiLoader = PIXI.loader;
    this.DASH_ATLAS = "assets/dashAtlast.png";
    this.ASSET_TILE = "assets/tile.png";
    this.ASSET_DASH = "assets/dash.png";
    this.ASSET_BG = "bg.png";
    this.ASSET_CONTROLS = "controls.png";
    this.ASSET_DOOR_CLOSED = "door0001.png";
    this.ASSET_DOOR_OPEN = "door0002.png";
    this.ASSET_GAME_OVER = "gameover.png";
    this.ASSET_INFO_1 = "info1.png";
    this.ASSET_INFO_2 = "info2.png";
    this.ASSET_INFO_3 = "info3.png";
    this.ASSET_SPIKE_UP = "spike0001.png";
    this.ASSET_SPIKE_DOWN = "spike0002.png";
    this.ASSET_TITLE = "title.png";
    this.ASSET_YOU_WIN = "youwin";
}

Loader.prototype.load = function(callBack) {
    
    this._pixiLoader.add([this.DASH_ATLAS,
                          this.ASSET_TILE,
                          this.ASSET_DASH])
                    .load(callBack);
}






