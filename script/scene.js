"use strict";
/*
Responsible for initializing game scenes.
*/

function Scene() {
    this._titleScene = new PIXI.Container();
    this._tutorialScene = new PIXI.Container();
    this._playScene = new PIXI.Container();
    this._endScene = new PIXI.Container();
    this._endMessage;
    this._playWall = []; //Walls that holds the room.
    this._currentDoor;
    
    this.initializeTitle = 
        function(playArea, loader) {
            this._titleScene.position.set(playArea._app.renderer.width/2,
                                          playArea._app.renderer.height/2);
            this._titleScene.pivot.x = this._titleScene.width/2;
            this._titleScene.pivot.y = this._titleScene.height/2;
            this._titleScene.alpha = 0;
            playArea._app.stage.addChild(this._titleScene);
            
            let titleLogo = new PIXI.Sprite(loader.atlasID[loader.ASSET_TITLE]);
            titleLogo.anchor.set(0.5,0.5);
            titleLogo.y = -titleLogo.height/3;
            this._titleScene.addChild(titleLogo);
        
            let pressAnyToCont = new PIXI.Sprite(loader.atlasID[loader.ASSET_INFO_2]);
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
        
            let controls = new PIXI.Sprite(loader.atlasID[loader.ASSET_CONTROLS]);
            controls.anchor.set(0.5,0.5);
            this._tutorialScene.addChild(controls);
        
            let pressAnyToStart = new PIXI.Sprite(loader.atlasID[loader.ASSET_INFO_1]);
            pressAnyToStart.anchor.set(0.5,0.5);
            pressAnyToStart.y = pressAnyToStart.height*3;
            charm.pulse(pressAnyToStart, 60, 0.2);
            this._tutorialScene.addChild(pressAnyToStart);
            
            let standingPlayer = new PIXI.Sprite(loader.animID["stand"]);
            standingPlayer.scale.set(3,3)
            standingPlayer.anchor.set(0.5,0.5);
            standingPlayer.x = -standingPlayer.width;
            standingPlayer.y = standingPlayer.height/2;
            this._tutorialScene.addChild(standingPlayer);
        
            this._tutorialScene.visible = false;
        }
    
    this.initializePlay= 
        function(playArea, loader, level) {

            //this._playScene.alpha = 0;
            playArea._app.stage.addChild(this._playScene);
        
            for (let i  = 0 ; i < level.length; i++) {
                this._playScene.addChild(level[i]);
            }
            
            this._playScene.position.set(playArea._app.renderer.width/2,
                                             playArea._app.renderer.height/2);
            this._playScene.pivot.x = this._playScene.width/2;
            this._playScene.pivot.y = this._playScene.height/2;
            
            for (let i  = 0 ; i < level.length; i++) {
                level[i].visible = false;
                level[i].alpha = 0;
            }
            this._playScene.visible = false;
        }
    
    this.initializeEnd = 
        function(playArea, loader) {
            this._endScene.position.set(playArea._app.renderer.width/2,
                                             playArea._app.renderer.height/2);
            this._endScene.pivot.x = this._endScene.width/2;
            this._endScene.pivot.y = this._endScene.height/2;
            this._endScene.alpha = 0;
            playArea._app.stage.addChild(this._endScene);
        
            this._endMessage = new PIXI.Sprite(loader.atlasID[loader.ASSET_GAME_OVER]);
            this._endMessage.anchor.set(0.5,0.5);
            this._endMessage.y = -this._endMessage.height/2
            this._endScene.addChild(this._endMessage);
        
            let infoText = new PIXI.Sprite(loader.atlasID[loader.ASSET_INFO_3]);
            infoText.anchor.set(0.5,0.5);
            infoText.y = infoText.height*3;
            charm.pulse(infoText, 60, 0.2);
            this._endScene.addChild(infoText);
        
            this._endScene.visible = false;
            
        }
}

Scene.prototype.addtoPlayScene = function (sprite, x, y) {
    sprite.position.set(x, y);
    this._playScene.addChild(sprite);
}

Scene.prototype.removeFromPlayScene = function(sprite) {
    this._playScene.removeChild(sprite);
}

Scene.prototype.showScene = function(aScene, show) {
    aScene.visible = show;
}

Scene.prototype.changeEndMessage = function(death, loader) {
//    console.log(this._endMessage.texture)
//    console.log(loader._id[loader.ASSET_GAME_OVER])
//    console.log(loader._id[loader.ASSET_YOU_WIN])
    if(!death) {
        this._endMessage.texture = loader.atlasID[loader.ASSET_YOU_WIN];
    }
    
    else {
        this._endMessage.texture = loader.atlasID[loader.ASSET_GAME_OVER];
    }
    
}





