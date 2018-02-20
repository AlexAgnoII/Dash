"use strict";
/*
Game Logic "Controller" Here.
*/


let gameDiv = document.getElementById("game");
let playArea;
let loader;
let scene;
let state;
let win = false;
let level;
let player;


let charm = new Charm(PIXI);
let bump = new Bump(PIXI);

main();

function setup() {
    console.log("Setup time!");
    loader.atlasID = loader.DASH_ATLAS;
    loader.animID = loader.DASH_ANIMATION_ATLAS;
    loader.tileID = loader.DASH_TILE_ATLAS;

    
    playArea.setSize(loader._id[loader.ASSET_BG].orig.width,
                     loader._id[loader.ASSET_BG].orig.height);
    playArea.addSomething(new PIXI.Sprite(loader._id[loader.ASSET_BG]));
    
    //load levels and add them to play.
    getLevels();
    level.generateLevels(loader);
    
    scene = new Scene();
    scene.initializeTitle(playArea, loader);
    scene.initializeTutorial(playArea, loader);
    scene.initializePlay(playArea, loader);
    scene.initializeEnd(playArea, loader);
    
    //Initialize player and add to first level of play
    player = new Player(loader.animID["stand"], runningAnimation()); //need to add sprite here. 
    player.setAnchorAnim(0.5,0.5);
    player.setAnchorStill(0.5,0.5);
    scene.addtoPlayScene(player._playerStill, 400,400);
    scene.addtoPlayScene(player._playerAnimated, 400,400);


    
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
        scene.showScene(scene._titleScene,true);
        charm.fadeIn(scene._titleScene, 80);
    }
}

function tutorial() {
    console.log("tutorial state")
    if(scene._tutorialScene.visible == false) {
        scene.showScene(scene._tutorialScene, true);
        charm.fadeIn(scene._tutorialScene, 30);
    }
}

function play() {
    if(scene._playScene.visible == false) {
        scene.showScene(scene._playScene, true);
        //charm.fadeIn(scene._playScene, 30);
    }
    
    player.move(bump, scene._playWall); //makes the player move.
    onHit();
}

function end() {
    console.log("End state")
    console.log(scene._endScene.visible)
    if(scene._endScene.visible == false) {
        scene.showScene(scene._endScene, true);
        scene.changeEndMessage(win, loader);
        charm.fadeIn(scene._endScene, 30);
        
    }
}




function main() {
    playArea = new PlayArea();
    loader = new Loader();
    level = new Level();

    playArea.placePlayArea(gameDiv);
    loader.load(setup);
}

document.body.onkeyup = function(e){
    switch(e.keyCode) {
        case 32: if(state == title) {
                    console.log("STATE IS TITLE")

                    charm.fadeOut(scene._titleScene, 30).onComplete = () => {
                        scene.showScene(scene._titleScene, false);
                        state = tutorial;
                    }
                 }
        
                 else if(state == tutorial) {
                     console.log("STATE IS TUTORIAL")
                     charm.fadeOut(scene._tutorialScene, 30).onComplete = () => {
                        scene.showScene(scene._tutorialScene, false); 
                        state = play;
                     }

                 }
                
//                 //end        
//                 else {
//                    charm.fadeOut(scene._endScene, 30).onComplete = () => {
//                        scene.showScene(scene._endScene, false);
//                        state = title;
//                    }
//                   
//                 }
                break;
        case 39: 
        case 37:  player.still(); break;
    }
}

document.body.onkeydown = function(e) {
     if(state == play) {
        switch(e.keyCode) {
            case 32:  
                    if(player.jumpBool == false) {
                        console.log(player.jumpBool);
                        player.jump();
                     } break;    
            case 38: //go to next floor
                    if(bump.hit(player._playerStill, scene._currentDoor)) {
                         scene._currentDoor.texture = loader.atlasID[loader.ASSET_DOOR_OPEN]
                         scalePlayer(); //proceed to next level

                     } break;    
            case 39:player.moveRight();break;    
            case 37:player.moveLeft();break;    
        }
    }
}




//onHit with objects of the world
function onHit() {
    //Hit the container
    bump.contain(player._playerStill, {x: 20, y: 20, width: 780, height: 780});
    bump.contain(player._playerAnimated, {x: 20, y: 20, width: 780, height: 780});
    
    
    //hit dangerous tiles (once hit game over!)
    
    //Hit tiles
    bump.hit(player._playerStill, scene._playWall, true);
    bump.hit(player._playerAnimated, scene._playWall, true);

    
    
}

function scalePlayer(next) {
    if(player._playerStill.scale.x < 0) {
       charm.scale(player._playerStill, -1.5, 1.5, 10).onComplete = () =>
       charm.scale(player._playerStill, 0, 0, 5).onComplete = () => {
           
       }
    }
    else {
       charm.scale(player._playerStill, 1.5,1.5, 10).onComplete = () => 
       charm.scale(player._playerStill, 0,0, 5).onComplete = () => {
           
       }
    }
}




//Setup animated player
function runningAnimation() {
    let runTextures = [];
    
    for(let i = 0; i < 5; i++) {
        let texture = PIXI.Texture.fromFrame("run" + (i+1));
        runTextures.push(texture);
    }
    
    let running = new PIXI.extras.AnimatedSprite(runTextures);
    running.animationSpeed = 0.5;
    running.visible = false;
    running.play();
    return running;
}

function getLevels() {
    $.ajax({
        url: "level/level.json",
        async: false
    })
    .done(function(data) {
        level = new Level(data);
    })
}


