"use strict";
/*
Responsible for initializing game scenes.
*/

function Scene() {
    this._titleScene = new PIXI.Container();
    this._tutorialScene = new PIXI.Container();
    this._playScene = new PIXI.Container();
    this._endScene = new PIXI.Container();
    
    this.initializeTitle = 
        function(playArea, loader) {
            this._titleScene.position.set(playArea._app.renderer.width/2,
                                          playArea._app.renderer.height/2);
            this._titleScene.pivot.x = this._titleScene.width/2;
            this._titleScene.pivot.y = this._titleScene.height/2;
            this._titleScene.alpha = 0;
            playArea._app.stage.addChild(this._titleScene);
            
            let titleLogo = new PIXI.Sprite(loader._id[loader.ASSET_TITLE]);
            titleLogo.anchor.set(0.5,0.5);
            titleLogo.y = -titleLogo.height/3;
            this._titleScene.addChild(titleLogo);
        
            let pressAnyToCont = new PIXI.Sprite(loader._id[loader.ASSET_INFO_2]);
            pressAnyToCont.anchor.set(0.5,0.5);
            pressAnyToCont.y = pressAnyToCont.height*3;
            charm.pulse(pressAnyToCont, 60, 0.2);
            this._titleScene.addChild(pressAnyToCont);

        
            this._titleScene.visible = false;
        }
    
    this.initializeTutorial = 
        function(playArea, loader) {
            this._tutorialScene.position.set(playArea._app.renderer.width/2,
                                             playArea._app.renderer.height/2);
            this._tutorialScene.pivot.x = this._tutorialScene.width/2;
            this._tutorialScene.pivot.y = this._tutorialScene.height/2;
            this._tutorialScene.alpha = 0;
            playArea._app.stage.addChild(this._tutorialScene);
        
            let controls = new PIXI.Sprite(loader._id[loader.ASSET_CONTROLS]);
            controls.anchor.set(0.5,0.5);
            this._tutorialScene.addChild(controls);
        
            let pressAnyToStart = new PIXI.Sprite(loader._id[loader.ASSET_INFO_1]);
            pressAnyToStart.anchor.set(0.5,0.5);
            pressAnyToStart.y = pressAnyToStart.height*3;
            this._tutorialScene.addChild(pressAnyToStart);
        
            this._tutorialScene.visible = false;
        }
    
    this.initializePlay= 
        function(playArea, loader) {
            playArea._app.stage.addChild(this._endScene);
        }
    
    this.initializeEnd = 
        function(playArea, loader) {
            playArea._app.stage.addChild(this._endScene);
        }
}


Scene.prototype.showScene = function(aScene, show) {
    aScene.visible = show;
}




