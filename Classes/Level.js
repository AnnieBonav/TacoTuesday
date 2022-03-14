/********************************
 *   Ana Bonavides Aguilar      *
 *   Taco Tuesday               *
 *   Creative Code Lab Project  *
 *   cc211010 FH St. Poelten    *
 ********************************/

import RandomDispatcher from "./RandomDispatcher.js";
import { randomNumberBetween } from "../Scripts/ToolBox.js";
import CONFIG from "../Scripts/ConfigStorage.js";
import Food from "./Food.js";
import PowerUp from "./PowerUp.js";

/**
 * The level is the parent class that containns all of the objects that make-up my level. Even though right now my game only has one type
 * of level, and the same one is repeated every time that the player restarts it, in the future this class will come really in handy 
 * because I can create any level with any attributes and have comletely different experiences wuth the same architecture. If I decided it,
 * I could simply call only two ingredients to be made, one, or all of them; have all powerups or none. It is extremely useful.
 */
class Level{ //why do I write the variable names before?
    constructor(player, pointsDisplay, clock, settings, foodInfo, goodFood, badFood, powerupsInfo, powerups, gravities){
        this.player = player;
        this.pointsDisplay = pointsDisplay;
        this.clock = clock;
        this.settings = settings;

        this.foodInfo = foodInfo;
        this.goodFood = goodFood;
        this.badFood = badFood;
        this.powerups = powerups;
        this.powerupsInfo = powerupsInfo;

        this.gravities = gravities;

        this.gameObjects = [];
        this.collectiblesLevel = [];

        this.gameStatus = "ongoing"; //"onoging" "paused" "ended"

        this.foodDispatchers = []; //My collectibles disatchers will be stored here
        this.powerupDispatchers = [];

        this.creationTime = performance.now(); //when the level was created
        this.gravityUpdateCreation = performance.now(); //when the gravity was last updated
        this.gravityUpdateTime = 2; //How often the gravity will be updated
        this.goodFoodIncrement = 0.00001;
        this.badFoodIncrement = 0.000015
        this.dispatcherTimeDecrement = 500;
        
        //Foodcreationmultipliers
        this.multipliers = [];
        this.init();
    }

    init(){
        this.gameObjects.push(this.player, this.pointsDisplay, this.clock, this.settings);
        this.foodInfo.forEach(element => {
            this.multipliers.push(false);
        });
        this.createFoodDispatchers();
        this.createPowerUpsDispatchers();
    }

    /**
     * Thsi update let's me accelerate the gravity of my food (so that the game is more difficult) and my dispatchers (so that they start
     * creating more ingredients and powerUps as their gravity increases). I think it can be more efficient and there is room for 
     * improvement, but for now it works just fine.
     */
    update(){
        this.moment = (performance.now() - this.creationTime) / 1000;
        if(this.moment >= 20){
            this.goodFoodIncrement += 0.00005;
            this.badFoodIncrement += 0.00005;
            this.creationTime = performance.now();
            this.accelerateDispatchers();
            //console.log("incremented increment");
        }

        this.moment = (performance.now() - this.gravityUpdateCreation) / 1000;
        if(this.moment >= this.gravityUpdateTime){
            this.gravities[0].magnitude += this.goodFoodIncrement;
            this.gravities[1].magnitude += this.badFoodIncrement;
            this.gravityUpdateCreation = performance.now();
            //console.log("Good Gravity: " + this.gravities[0].magnitude + "  Bad gravity: " + this.gravities[1].magnitude);
        }
    }

    /**
     * This is called in checkCollisionns between. If there is a collision, then it checks if this made the player loose. And, if the
     * negative points are lower than 0, then the player has lost and the game status is now over (which is a condition on the gameLoop,
     * so this makes the gameLoop stop and openGameOver() be called).
     */
    end(){
        if(this.pointsDisplay.negativePoints < 0){
            this.gameStatus = "over";
        }
    }

    /**
     * This method is really important, because it changes the gameStatus which, ultimately, affects ther rendering of the whole game
     * (within the main Script).
     */
    changeGameStatus(newStatus){
        this.gameStatus = newStatus;
        if(this.gameStatus === "ongoing"){ //Either it can be currently ongoing or paused
            this.changeDispatchersStatus("ongoing");
        }else if(this.gameStatus === "paused"){ //It can only be ongoing
            this.changeDispatchersStatus("paused");
        }else if(this.gameStatus === "ended"){
            this.changeDispatchersStatus("destroyed");
        }
        //console.log("Change game Status. New status: " + this.gameStatus);
    }

/*

DISPATCHERS

*/
    createPowerUpsDispatchers(){
        let powerUpDispatcher = () =>{
            let currentCollectible = randomNumberBetween(0, this.powerupsInfo.length -1);
            
            let collectibleSize = randomNumberBetween(this.powerupsInfo[currentCollectible][1], this.powerupsInfo[currentCollectible][2]);
            let rotationSpeed = randomNumberBetween(this.powerupsInfo[currentCollectible][3], this.powerupsInfo[currentCollectible][4]);
            let randomX = randomNumberBetween(CONFIG.consumableMargin_l, CONFIG.game.width - CONFIG.consumableMargin_r - collectibleSize);
            
            let collectible = new PowerUp(this.powerupsInfo[currentCollectible][0], randomX, -100, collectibleSize, rotationSpeed, this.gravities[2]);
            collectible.onRemove(() => {
                removeCollectible(collectible);
            });

            this.collectiblesLevel.push(collectible);
            this.gameObjects.push(collectible);
        }
        
        
        for(let i = 0; i < 1; i++){ //1 = this.powerupsInfo.length
            this.powerupDispatchers[i] = new RandomDispatcher(powerUpDispatcher.bind(this)
            ,{min: 3000, max: 5000});
        }
    }


    createFoodDispatchers(){
        let foodDispatcher = (currentCollectible) =>{
            let collectibleSize = randomNumberBetween(this.foodInfo[currentCollectible][1], this.foodInfo[currentCollectible][2]); //Chnage values for variables
            let rotationSpeed = randomNumberBetween(this.foodInfo[currentCollectible][3], this.foodInfo[currentCollectible][4]); //change too
            let randomX = randomNumberBetween(CONFIG.consumableMargin_l, CONFIG.game.width - CONFIG.consumableMargin_r - collectibleSize);
            let gravity;
            
            if(currentCollectible <= 3){
                gravity = this.gravities[0];
            }else{
                gravity = this.gravities[1];
            }
            
            /*Remember to remove the elements of the constructor you are not using anymore EVERYWHERE*/
            let collectible = new Food(this.foodInfo[currentCollectible][0], randomX, -this.foodInfo[currentCollectible][7], collectibleSize, rotationSpeed, gravity);
            collectible.onRemove(() => {
                removeCollectible(collectible);
            });

            this.collectiblesLevel.push(collectible);
            this.gameObjects.push(collectible);

            if(this.multipliers[currentCollectible] === true){
                let collectible = new Food(this.foodInfo[currentCollectible][0], randomX, -this.foodInfo[currentCollectible][7], collectibleSize, this.visibleBBCheckBox, rotationSpeed, gravity);
                collectible.onRemove(() => {
                    removeCollectible(collectible);
                });

                this.collectiblesLevel.push(collectible);
                this.gameObjects.push(collectible);
            }
        }
        
        
        for(let i = 0; i < this.foodInfo.length; i++){
            this.foodDispatchers[i] = new RandomDispatcher(foodDispatcher.bind(this, i)
            ,{min: this.foodInfo[i][5], max: this.foodInfo[i][6]});
        }
    }
    
    changeDispatchersStatus(currentState){
        for(let i = 0; i < this.foodInfo.length; i++){
            this.foodDispatchers[i].changeDispatcherStatus(currentState);
        }
        
        this.powerupDispatchers[0].changeDispatcherStatus(currentState);

        // for(let i = 0; i < this.powerupsInfo.length; i++){
        //     this.powerupDispatchers[i].changeDispatcherStatus(currentState);
        // }
    }

    accelerateDispatchers(){
        /*For every dispatcher i am going to change the min and max of the recurring funcion. That way, as the gravity increases,
        so does the generation of the collectibles. If the max time of waiting -500 is less thhan the min, then I change the min,
        if not, I reduce the max.*/

        for(let i = 0; i < this.foodInfo.length; i++){
            //console.log("Entered for accelerating foodDispatchers");
            if(this.foodDispatchers[i].options.max - 500 > this.foodDispatchers[i].options.min){
                this.foodDispatchers[i].options.max -= 500;
                //console.log("Change Dispatchers Max. i:" + i + "  NewMax: " + this.foodDispatchers[i].options.max);
            }else if (this.foodDispatchers[i].options.min-500 >= 0){
                this.foodDispatchers[i].options.min -= 500;
                //console.log("Change Dispatchers Min. i:" + i + "  NewMin: " + this.foodDispatchers[i].options.min);
            }else if(this.foodDispatchers[i].options.max - 500 === this.foodDispatchers[i].options.min && this.multipliers[i] === false){ //I check i fthey would be the same and a multipleir in the dispatcher has not been created
                this.multipliers[i] = true;
                //console.log("Changed multiplier in i:" + i + "  New multiplier status: " + this.multipliers[i]);
            }
        }
    }

    
}

export default Level;