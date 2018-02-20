"use strict";
/*
Game Logic "Controller" Here.
*/


let gameDiv = document.getElementById("game");
let playArea;
let loader;
let scene;
let state;
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
    scene.initializePlay(playArea, loader, level._levelContainers);
    scene.initializeEnd(playArea, loader);
    
    //Initialize player and add to first level of play
    player = new Player(loader.animID["stand"], runningAnimation()); //need to add sprite here. 
    player.setAnchorAnim(0.5,0.5);
    player.setAnchorStill(0.5,0.5);
    scene.addtoPlayScene(player._playerStill, level.currentLevelPlayerLoc[0],level.currentLevelPlayerLoc[1]);
    scene.addtoPlayScene(player._playerAnimated, level.currentLevelPlayerLoc[0],level.currentLevelPlayerLoc[1]);
    
    
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
        
        level.currentLevelContainer.visible = true;
        charm.fadeIn(level.currentLevelContainer, 15).onComplete = () => {
            
        }
    }
    
    player.move(bump, level.currentThingsList); //makes the player move.
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
        case 37:player.still(); break;
    }
}

document.body.onkeydown = function(e) {
     if(state == play) {
        switch(e.keyCode) {
            case 32:  
                    if(player.jumpBool == false && level._complete == false) {
                        console.log(player.jumpBool);
                        player.jump();
                     } break;    
            case 38: //go to next floor
                    if(bump.hit(player._playerStill, level.currentDoor)) {
                        player.still();
                        level._complete = true;
                        level.currentDoor.texture = loader.atlasID[loader.ASSET_DOOR_OPEN]

                        let currentLevel = level.currentLevel;
                        console.log("Current level: " + currentLevel);
                        
                        if(player._playerStill.scale.x > 0)
                            scalePlayer(currentLevel+1,1); //proceed to next level
                        else {
                            scalePlayer(currentLevel+1,-1); 
                        }
                     }
                     break;    
            case 39: if(level._complete == false)
                        player.moveRight();

                     break;    
            case 37:if(level._complete == false)
                        player.moveLeft();
                    break;    
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
    //console.log(level.currentLevel)
    bump.hit(player._playerStill, level.currentThingsList, true);
    bump.hit(player._playerAnimated, level.currentThingsList, true);

    
    
}

function scalePlayer(next, charge) {
    
       charm.scale(player._playerStill, (1.5*charge), 1.5, 10).onComplete = () =>
       charm.scale(player._playerStill, 0, 0, 5).onComplete = () => {
           changeLevel(next);
       }

}

function changeLevel(next) {
    console.log("Next level: " + next);
    

    //Hide current level
    
    //reset current level
    
    //if max level
    if(next == level._maxLevel) {
        state = end;
    }
    else {
        
    //if not yet, change current level to next level
    
    //show next level
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


