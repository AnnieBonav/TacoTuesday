/********************************
 *   Ana Bonavides Aguilar      *
 *   Taco Tuesday               *
 *   Creative Code Lab Project  *
 *   cc211010 FH St. Poelten    *
 ********************************/

/**
 * In this script I assign all the functions that my DOM handles, and some of them are saved in the DOM object. I also set the values of
 * my canvas, my context, and also save them in the CONFIG object.
 */
import DOM from "./dom.js";
import CONFIG from "./ConfigStorage.js"

//Main Variables
CONFIG.canvas = document.getElementById("game-canvas");
CONFIG.context = CONFIG.canvas.getContext("2d");
CONFIG.canvas.setAttribute('width', CONFIG.game.width);
CONFIG.canvas.setAttribute('height', CONFIG.game.height);
CONFIG.context.font = "30px strawberry";
CONFIG.context.fillStyle='#C34A21';

CONFIG.boundingBoxCB = document.getElementById('VisibleBoundingBox'); //BoundingBoxCheckBox on HTML
CONFIG.pointsDisplayCB = document.getElementById('VisiblePoints');//PoibtsDisplay CheckBox on HTML


//DOM
DOM.screens.mainMenu = document.getElementById("main-menu");
DOM.screens.ingame = document.getElementById("ingame");
DOM.screens.gameOver = document.getElementById("game-over");
DOM.screens.instructions = document.getElementById("instructions");
DOM.screens.settings = document.getElementById("settings");

//SETTINGS
DOM.settings.lettersMovement = document.getElementById('letters-keys-option');
DOM.settings.arrowsMovement = document.getElementById('arrows-keys-option');

DOM.settings.lettersMovementCB = document.getElementById('letters-keys-cb');
DOM.settings.arrowsMovementCB = document.getElementById('arrows-keys-cb');


DOM.functions.openMainMenu = function (){
    document.getElementById("loading-image").style.display="none";
    DOM.screens.mainMenu.style.display="flex";
    DOM.screens.ingame.style.display="none";
    DOM.screens.settings.style.display = "none";
    DOM.screens.instructions.style.display = "none";
    DOM.screens.gameOver.style.display="none";

    changeMovementMethod();
}

DOM.functions.openGameOver =  function (){
    if(CONFIG.game.highestScore < CONFIG.game.currentLevel.pointsDisplay.points){
        CONFIG.game.highestScore = CONFIG.game.currentLevel.pointsDisplay.points;
    }
    
    document.getElementById("highest-score").innerHTML = `
    <h1>Highest Score: ${CONFIG.game.highestScore}</h1>
    <h1>Current Score: ${CONFIG.game.currentLevel.pointsDisplay.points}</h1>`;
    destroyLevel();
    DOM.screens.gameOver.style.display="flex";
    DOM.screens.ingame.style.display="none";
}

const destroyLevel = () =>{
    CONFIG.game.currentLevel.changeDispatchersStatus("destroyed");
    // console.log(CONFIG.game.currentLevel.foodDispatchers);
    // console.log(CONFIG.game.currentLevel.powerupDispatchers);
    CONFIG.game.currentLevel = undefined;
}

DOM.functions.openIngame = () =>{
    DOM.screens.mainMenu.style.display="none";
    DOM.screens.ingame.style.display="flex";
    DOM.screens.settings.style.display="none";
    DOM.screens.instructions.style.display="none";
    DOM.screens.gameOver.style.display = "none"


    DOM.functions.init();
}

DOM.functions.openInstructions = function (){
    DOM.screens.mainMenu.style.display = "none";
    DOM.screens.ingame.style.display = "none";
    DOM.screens.instructions.style.display = "flex";
    DOM.screens.gameOver.style.display="none";
}

DOM.functions.openSettings = function (){
    DOM.screens.mainMenu.style.display = "none";
    DOM.screens.instructions.style.display = "none";
    DOM.screens.settings.style.display="flex";
}

DOM.functions.restartGame = function (){
    // console.log(typeof CONFIG.game.currentLevel);
    if(typeof CONFIG.game.currentLevel == "undefined"){
        DOM.functions.game.createLevel();
        DOM.functions.openIngame();
    }else if(CONFIG.game.currentLevel.gameStatus === "paused"){
        destroyLevel();
        DOM.functions.game.createLevel();
    }
}

document.getElementById("startGame-mainMenu").addEventListener("click", DOM.functions.openIngame);
document.getElementById("instructions-mainMenu").addEventListener("click", DOM.functions.openInstructions);
document.getElementById("settings-mainMenu").addEventListener("click", DOM.functions.openSettings);

document.getElementById("mainMenu-instructions").addEventListener("click", DOM.functions.openMainMenu);
document.getElementById("startGame-instructions").addEventListener("click", DOM.functions.openIngame);

document.getElementById("mainMenu-settings").addEventListener("click", DOM.functions.openMainMenu);
document.getElementById("startGame-settings").addEventListener("click", DOM.functions.openIngame);

document.getElementById("restart-gameOver").addEventListener("click", DOM.functions.restartGame);
document.getElementById("mainMenu-gameOver").addEventListener("click", DOM.functions.openMainMenu);

//Change movement methods on settings
DOM.settings.lettersMovement.onclick = () =>{
    DOM.settings.lettersMovementCB.checked = true;
    changeMovementMethod();
}

DOM.settings.arrowsMovement.onclick = () =>{
    DOM.settings.arrowsMovementCB.checked = true;
    changeMovementMethod();
}

function changeMovementMethod () {
    if(document.getElementById("letters-keys-cb").checked === true) {
        DOM.settings.lettersMovement.style = "filter: drop-shadow(0px 0px 6px #C34A21);";
        DOM.settings.arrowsMovement.style.removeProperty("filter");
    }else{
        DOM.settings.lettersMovement.style.removeProperty("filter");
        DOM.settings.arrowsMovement.style = "filter: drop-shadow(0px 0px 6px #C34A21);";
    }
}