"use strict";
/*This is basically the the canvas where everything will be inserted.*/


function PlayArea() {
    this._app = new PIXI.Application({
           antialias: true,
           transparent: false,
           resolution: 1
    });

}

PlayArea.prototype.setSize = function(width, height) {
    this._app.renderer.resize(width, height);
}

PlayArea.prototype.placePlayArea = function(element) {
    element.appendChild(this._app.view);
}

PlayArea.prototype.addSomething = function(sprite) {
    this._app.stage.addChild(sprite);
}

PlayArea.prototype.removeSomething = function(sprite) {
    this._app.stage.removeChild(sprite);
}

