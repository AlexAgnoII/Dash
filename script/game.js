"use strict";
/*
Game Logic "Controller" Here.
*/


let gameDiv = document.getElementById("game");
let playArea;
let loader;
let scene;
let state;


let charm = new Charm(PIXI);

/*Start*/
main();

function setup() {
    console.log("Setup time!");
    loader.atlasID = loader.DASH_ATLAS;
    
    playArea.setSize(loader._id[loader.ASSET_BG].orig.width,loader._id[loader.ASSET_BG].orig.height);
    playArea.addSomething(new PIXI.Sprite(loader._id[loader.ASSET_BG]));
    
    scene = new Scene();
    scene.initializeTitle(playArea, loader);
    scene.initializePlay(playArea, loader);
    scene.initializeEnd(playArea, loader);
    
    state = title;
    
    
    playArea._app.ticker.add(delta => gameLoop(delta));
}

function gameLoop() {
    state();
    charm.update();
}

function title() {
    console.log("Title state")

    if(scene._titleScene.visible == false) {
        scene.showTitle(true);
        scene.fadeInTitle(true);
    }
}

function play() {
    console.log("Play state")
}

function end() {
    console.log("End state")
}




function main() {
    playArea = new PlayArea();
    loader = new Loader();
    
    playArea.placePlayArea(gameDiv);
    loader.load(setup);
}

document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        if(state == title) {
            scene.fadeInTitle(false);
        }
    }
}