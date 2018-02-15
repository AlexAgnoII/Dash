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
let player;


let charm = new Charm(PIXI);

let xmlDoc, xmlhttp;
const xmlFile = "xml/dash.xml";

if(window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
}
else {
    xmlhttp = new ActiveXObject("Microsoft.XMLDOM");
}
xmlhttp.open("GET", xmlFile, false);
xmlhttp.send();
xmlDoc = xmlhttp.responseXML;


if(xmlDoc != null) {
    console.log("Read");
    main();
}

function setup() {
    console.log("Setup time!");
    loader.atlasID = loader.DASH_ATLAS;
    
    playArea.setSize(loader._id[loader.ASSET_BG].orig.width,
                     loader._id[loader.ASSET_BG].orig.height);
    playArea.addSomething(new PIXI.Sprite(loader._id[loader.ASSET_BG]));
    
    scene = new Scene();
    scene.initializeTitle(playArea, loader);
    scene.initializeTutorial(playArea, loader, getStillPlayer());
    scene.initializePlay(playArea, loader);
    scene.initializeEnd(playArea, loader);
    
    //Initialize player and add to first level of play
    player = new Player(getStillPlayer()); //need to add sprite here.   


    
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
        
                 else if(state == play){ //Jump
                     console.log("STATE IS PLAY")
                     
                     //TEMPORARY
                     //charm.fadeOut(scene._playScene, 30).onComplete = () => {
//                         scene.showScene(scene._playScene, false);
//                         state = end;
                     //};
                 }
                
                 //end        
                 else {
                    charm.fadeOut(scene._endScene, 30).onComplete = () => {
                        scene.showScene(scene._endScene, false);
                        state = title;
                    }
                   
                 }
                break;
        case 38:if(state == play) {
            
                }    
                break;
        case 39: /*right*/ 
                 if(state == play) {
                    console.log("right")
                  }    
                  break;
        case 37: /*left*/  
                if(state == play) {
                    console.log("left")
                }
                break;
    }
}

/* Given list of SubTexture node, find this specific node given the name.
*/
function findNode(nodeList, name) {
//    console.log("meow")
//    console.log(nodeList.length)
    for(let i = 0; i < nodeList.length; i++) {
        if(nodeList[i].getAttribute("name") == name) {
            console.log("found!")
            return nodeList[i];
        }
    }
    
    return null;
}

//Returns a still player
function getStillPlayer() {
    let xml = findNode(xmlDoc.getElementsByTagName("SubTexture"), "stand");
    
    let rectangle = new PIXI.Rectangle(xml.getAttribute("x"),
                                               xml.getAttribute("y"),
                                               xml.getAttribute("width"),
                                               xml.getAttribute("height"));
    let texture = PIXI.utils.TextureCache[loader.ASSET_DASH];
    texture.frame = rectangle;
    return texture;
}