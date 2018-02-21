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
let stop = false;


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

    level._complete = true; //initially true  to prevent movement
    
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
        startLevel();
        
//        level.currentLevelContainer.visible = true;
//        charm.fadeIn(level.currentLevelContainer, 15).onComplete = () => {
//            charm.scale(player._playerStill, 1.5, 1.5, 10).onComplete = () => 
//            charm.scale(player._playerStill, 1, 1,  5).onComplete = () => {
//                level._complete = false;
//            }
//        }
    }
    
    player.move(bump, level.currentThingsList); //makes the player move.
    
    if(player._dead == false)
        onHit();
    else if(!stop){
        if(player._playerStill.scale.x < 0) {
            endGameDeath(-1);
        }
        else {
            endGameDeath(1);
        }
    }
}

function endGameDeath(pow) {
    stop = true;
    charm.scale(player._playerStill, (1.5*pow), 1.5, 10).onComplete = () => charm.scale(player._playerStill, 0,0, 100).onComplete = () => {
        //hide current level
        charm.fadeOut(level.currentLevelContainer, 15).onComplete = () => {
            level.currentLevelContainer.visible = false;
            scene.showScene(scene._playScene, false);
            state = end;
        };
    }
}

function end() {
    console.log("End state")
    console.log(scene._endScene.visible)
    if(scene._endScene.visible == false) {
        scene.showScene(scene._endScene, true);
        scene.changeEndMessage(player._dead, loader);
        charm.fadeIn(scene._endScene, 30);
        
    }
}

function startLevel() {
    console.log("Real current level: " + level.currentLevel);
    scene.addtoPlayScene(player._playerStill, level.currentLevelPlayerLoc[0],level.currentLevelPlayerLoc[1]);
    scene.addtoPlayScene(player._playerAnimated, level.currentLevelPlayerLoc[0],level.currentLevelPlayerLoc[1]);
    player._playerStill.scale.set(0,0);
    
    player.yVel = 0;
    player.xVel = 0;
    
    level.currentLevelContainer.visible = true;
    charm.fadeIn(level.currentLevelContainer, 15).onComplete = () => {
        charm.scale(player._playerStill, 1.5, 1.5, 10).onComplete = () => 
        charm.scale(player._playerStill, 1, 1,  5).onComplete = () => {
            level._complete = false;
        }
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
                 //end        
                 else if (state == end){
                    charm.fadeOut(scene._endScene, 30).onComplete = () => {
                        scene.showScene(scene._endScene, false);
                        player._dead = false;
                        stop = false;
                        player._playerStill.rotation = 0;
                        level.currentLevel = 0;
                        state = title;
                    }
                   
                 }
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
                        //console.log(player.jumpBool);
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
    if(level.currentDangerTiles.length > 0) {
        console.log("Danger!")
        
        for(let i = 0; i < level.currentDangerTiles.length; i++) {
            if(bump.hit(player._playerStill, level.currentDangerTiles[i])) {
                console.log("DEATH")
                player.still();
                level._complete = true;
                player._dead = true;
                break;
            }
        }
    }
    else {
        console.log("No danger!")
    }
    
    //Hit tiles
    //console.log(level.currentLevel)
    bump.hit(player._playerStill, level.currentThingsList, true);
    bump.hit(player._playerAnimated, level.currentThingsList, true);

    
    
}

function scalePlayer(next, charge) {
    
       charm.scale(player._playerStill, (1.5*charge), 1.5, 10).onComplete = () =>
       charm.scale(player._playerStill, 0, 0, 5).onComplete = () => {
           
           //fade out current level
           charm.fadeOut(level.currentLevelContainer, 15).onComplete = () => {
               changeLevel(next);
           }

       }

}

function changeLevel(next) {
    console.log("Next level: " + next);
    

    //Hide current level (make it false)
    level.currentLevelContainer.visible = false;
    
    //reset current level
    level.currentDoor.texture = loader.atlasID[loader.ASSET_DOOR_CLOSED];
    
    //if max level
    if(next == level._maxLevel) {
        state = end;
    }
    else {
        
        //if not yet, change current level to next level
        level.currentLevel = next;

        //show next level
        startLevel();
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


