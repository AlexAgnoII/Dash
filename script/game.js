"use strict";
/*
Game Logic "Controller" Here.
*/


let gameDiv = document.getElementById("game");
let playArea;
let loader;




/*Start*/
main();

function setup() {
    console.log("Setup time!");
    loader.atlasID = loader.DASH_ATLAS;
    playArea.setSize(loader._id[loader.ASSET_BG].orig.width,
                     loader._id[loader.ASSET_BG].orig.height);

    playArea.addSomething(new PIXI.Sprite(loader._id[loader.ASSET_BG]));

}




function main() {
    playArea = new PlayArea();
    loader = new Loader();
    
    playArea.placePlayArea(gameDiv);
    loader.load(setup);
}