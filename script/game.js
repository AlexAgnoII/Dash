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
    console.log("Setup time!")

}




function main() {
    //Create our canvas!
    playArea = new PlayArea();
    loader = new Loader();
    
    
    loader.load(setup);
}