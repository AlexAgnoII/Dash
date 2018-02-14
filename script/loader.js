"use strict"
/*
This is responsible for gathering the assets needed.
*/


function Loader() {
    this._pixiLoader = PIXI.loader;
    this._id; //For atlas.
    //////////////////////////////////////////
    this.DASH_ATLAS = "assets/dashAtlast.json";
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
    this.ASSET_YOU_WIN = "youwin.png";
}

Loader.prototype.load = function(callBack) {
    this._pixiLoader.add([this.DASH_ATLAS,
                          this.ASSET_TILE,
                          this.ASSET_DASH])
                    .load(callBack);
}

/*
Set: Sets the atlast ID.
*/
Object.defineProperty(Loader.prototype, "atlasID", {
    set: function(atlas) {
        this._id = this._pixiLoader.resources[atlas].textures; 
    },
    get: function(){
        return this._id;
    }
})


