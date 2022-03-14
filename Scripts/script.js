/********************************
 *   Ana Bonavides Aguilar      *
 *   Taco Tuesday               *
 *   Creative Code Lab Project  *
 *   cc211010 FH St. Poelten    *
 ********************************/

/**
 * This is my main script. On it I create my current level, initialize everything, and handle my gameLoop.
 */
import Player from "../Classes/Player.js";
import PointsDisplay from "../Classes/PointsDisplay.js";
import PowerUp from "../Classes/PowerUp.js";
import Clock from "../Classes/Clock.js";
import Settings from "../Classes/Settings.js";
import Gravity from "../Classes/Gravity.js";
import Level from "../Classes/Level.js";
import Plate from "../Classes/Plate.js";

import CONFIG from "./ConfigStorage.js";
import DOM from "./dom.js";


let lastTimestamp = 0;
let timePassedSinceLastRender;

/*

GAME DYNAMICS **CHECK CHANGING PowerUpsINfo and powerups

*/
DOM.functions.game.createLevel = () => {
    CONFIG.game.currentLevel = new Level(
        new Player("Player1", 200, CONFIG.game.height - CONFIG.playerYPos, 214, 130, 0.4, new Plate("Plate1", 260, CONFIG.game.height - CONFIG.playerYPos + 17, 100, 12, 0.4)), 
        new PointsDisplay("PointsDisplay", CONFIG.game.width - CONFIG.healthBarMargin_r,  164, CONFIG.healthBarWidth, 24, 20), 
        new Clock("MainClock", 60, 60, 80, 80, 30),
        new Settings("MainSettings",CONFIG.game.width - 60, 72, 60, 60),
        [["totopo", 40, 60, 1, 2, 1000, 3500, 10], ["avocado", 50, 70, 0.8, 1, 3000, 5000, 20], ["lemon", 60, 65, 0.5, 1, 4000, 5000, 30], ["valentina", 70, 80, 0.7, 1, 6000, 7000, 50], ["ketchup", 55, 55, 0.7, 1, 1000, 3000, 10], ["tortillaDura", 50, 65, 0.7, 1, 2000, 4000, 20], ["fenchel", 55, 55, 0.7, 1, 3000, 5000, 30]],
        ["goodFood", "avocado", "lemon", "totopo", "valentina"],
        ["badFood", "ketchup", "tortillaDura", "fenchel"],
        // ["chileRojoMalo", "chileRojoBueno", "chileVerdeMalo", "chileVerdeBueno"],
        [["chileRojoBueno", 40, 60, 1, 2]],
        ["chileRojoBueno"],
        [new Gravity(0.0005, 1), new Gravity(0.0005, 1), new Gravity(0.0005, 1)]);
}


DOM.functions.init = () => {
    DOM.functions.game.createLevel();
    lastTimestamp = performance.now();
    requestAnimationFrame(gameLoop);
}


/**
 * gameLoop is the loop that makes the game be running. It takes into consideration the timePassedSinceLastRender to update my gameObjects
 * (calling the update Function) and then rendering my game objects (calling render Function). THis loop will only continue if the game is
 * ongoing. If it is not (which means it is paused or over) then it does not continue the loop. And, if it is over, then the openGameOver
 * function is called.
 */
const gameLoop = () => {
    if(CONFIG.game.currentLevel.gameStatus === "ongoing"){
        timePassedSinceLastRender = performance.now() - lastTimestamp;
        update(timePassedSinceLastRender);
        render();

        lastTimestamp = performance.now();
        requestAnimationFrame(gameLoop);
    }else if(CONFIG.game.currentLevel.gameStatus === "over"){
        window.setTimeout(DOM.functions.openGameOver, 0); /*I iwll leave this one as a callback function because maybe in the future I d a transition between
        Loosing and the gameOver screen, and this having a timeout will help me*/
    }
}

/**
 * 
 * @param {*} timePassedSinceLastRender is used to update my gameObjects taking in consideration the timePassedSinceLastRender, which is the
 * perdormance.now() - the lastTimeStamp
 */
const update = (timePassedSinceLastRender) => {
    CONFIG.game.currentLevel.gameObjects.forEach(function (gameObject) {
        gameObject.update(timePassedSinceLastRender)
    });

    CONFIG.game.currentLevel.update();

    let removeItems = [];
    CONFIG.game.currentLevel.collectiblesLevel.forEach((collectible) => {
        if (checkCollisionBetween(CONFIG.game.currentLevel.player.plate, collectible)) {
            removeItems.push(collectible);
        }else if (collectible.yPos >= CONFIG.game.height + 20){
            removeItems.push(collectible);
        }
    });

    removeItems.forEach((collectible) => {
        CONFIG.game.currentLevel.collectiblesLevel.splice(CONFIG.game.currentLevel.collectiblesLevel.indexOf(collectible), 1);
        CONFIG.game.currentLevel.gameObjects.splice(CONFIG.game.currentLevel.gameObjects.indexOf(collectible), 1);
    });
}

const render = () => { //Clears the stage and draws the new rectangle
    CONFIG.context.clearRect(0, 0, CONFIG.game.width, CONFIG.game.height);

    CONFIG.game.currentLevel.gameObjects.forEach((gameObject) => {
        gameObject.render(timePassedSinceLastRender);
    });

    CONFIG.context.resetTransform();
}


/*

COLLISION DETECTION

*/

//bb = BoundingBox
const checkCollisionBetween = (player, collectible) => { //The player is actually the object plate and not the object player, but, because the Plate is contained within the player (and in the future it could any other thing) I prefer leaving it in a broader statement
    let bbPlayer = player.getBoundingBox();
    let bbCollectible = collectible.getBoundingBox();
    if (
        bbPlayer.x < bbCollectible.x + bbCollectible.w &&
        bbPlayer.x + bbPlayer.w > bbCollectible.x &&
        bbPlayer.y < bbCollectible.y + bbCollectible.h &&
        bbPlayer.y + bbPlayer.h > bbCollectible.y
    ) {
        collisionAction(collectible);
        return true;
    } else {
        return false;
    }
}

/**
 * If there is a collisionn, then this function is called. It does the action of what should happen if there is a collision
 */
const collisionAction = (collectible) =>{
    if (CONFIG.game.currentLevel.goodFood.includes(collectible.name) || CONFIG.game.currentLevel.badFood.includes(collectible.name)) {
        CONFIG.game.currentLevel.pointsDisplay.setPoints(collectible.pointsModifier); //I need to use the setPoints method and not just += the added points because the function does more than just adding points (check PointsDisplay class for reference)

    } else if (CONFIG.game.currentLevel.powerups.includes(collectible.name)) {
        switch(collectible.name){
            case "chileRojoBueno":
                CONFIG.game.currentLevel.pointsDisplay.increaseLife(collectible.effect);
                break;
            case "chileAmarilloBueno":
                CONFIG.game.currentLevel.pointsDisplay.increaseSpeed(collectible.effect)
                break;
        }
        
    }
    CONFIG.game.currentLevel.end(); //I want to see if this points change makes somebody win or loose
}

// Wait for the windows 'load' event before initializing.
window.addEventListener('load', () => { 
    window.setTimeout(DOM.functions.openMainMenu, 2500);
    
    /** 
     * These windows event listeners can sometimes create errors because they are called before the level has been created, hence, when 
     * they try to call  CONFIG.game.currentLevel.gameStatus that is undefined. Nevertheless, this error does not affect the gameplay
     * (and having these event listeners comes in handy when the player looses focus on their game screen, so that the rendering does
     * not keep ocurring).
     */
    window.setTimeout(function (){
        window.addEventListener("blur", function(event){
        //console.log("Entered blur" + CONFIG.game.currentLevel.gameStatus);
        if(CONFIG.game.currentLevel.gameStatus === "ongoing"){ // && 
            CONFIG.game.currentLevel.changeGameStatus("paused");
            
        }
    });

    /**
     * Maybe in the future instead of resuming the game automatically, I could have the pause screen appear whne they leave the game's
     * focus, so that the player can decide when to resume.
     */
    window.addEventListener("focus", function(event){
        //console.log("Entered focus" + CONFIG.game.currentLevel.gameStatus);
        if(CONFIG.game.currentLevel.gameStatus === "paused"){ // && 
            CONFIG.game.currentLevel.changeGameStatus("ongoing");
            lastTimestamp = performance.now();
            gameLoop();
        }
    });
    }, 2600);
    
    
});

/**
 * This is the event listener that sees whether my 2D Settings Path is clicker or not (and, hence, pauses the game)
 */
CONFIG.canvas.addEventListener("click", function (event) {
    if (CONFIG.context.isPointInPath(CONFIG.game.currentLevel.settings.settingsPath, event.offsetX, event.offsetY)) {
        if(CONFIG.game.currentLevel.gameStatus === "ongoing"){
            CONFIG.game.currentLevel.changeGameStatus("paused");
        }else{
            CONFIG.game.currentLevel.changeGameStatus("ongoing");
            lastTimestamp = performance.now();
            gameLoop();
        }
    }
  });





