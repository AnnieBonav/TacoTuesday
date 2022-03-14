/********************************
 *   Ana Bonavides Aguilar      *
 *   Taco Tuesday               *
 *   Creative Code Lab Project  *
 *   cc211010 FH St. Poelten    *
 ********************************/

import Collectible from "./Collectible.js";

/**
 * The class PowerUp is one of the two that inherits from Collectible. Its purpose is to assign the corresponding images of the powerUps 
 * (in the Method assignImages), the gravityEffect (for the powerUps that affect gravity) and the lifeEffect (for the ones that affect the
 * player's life). Even though right nnow I am only using the red Chile, this class has much more potential and is ready to be used. Some
 * ideas onclude affecting gravity completely (having ingredients fall from the bottom and not the top), have some pwoerUps that modify
 * the player's Speed, have some that give them immunity...With some more thought into how the powerUps methods are called, this has the
 * potential to make the game much more fun.
 */
class PowerUp extends Collectible{
    constructor(name, xPos, yPos, side, rotationSpeed, gravity){
        super(name, xPos, yPos, side, rotationSpeed, gravity);
    }

    init(){
        this.img = new Image(this.side, this.side);
        this.assignImages();
        this.assignGravityEffect();
        this.assignLifeEffect();
    }

    assignImages(){
        switch(this.name){
            case "chileRojoMalo":
                this.img.src = './Assets/Images/Chiles/ChileRojoMalo.png';
                break;
            case "chileVerdeBueno":
                this.img.src = './Assets/Images/Chiles/ChileVerdeBueno.png';
                break;
            case "chileVerdeMalo":
                this.img.src = './Assets/Images/Chiles/ChileVerdeMalo.png';
                break;
            case "chileRojoBueno":
                this.img.src = './Assets/Images/Chiles/ChileRojoBueno.png';
                break;
        }
    }

    assignGravityEffect(){
        switch(this.name){
            //Who is affected is which gravity will be affected, We need to consider the ondes that were defined on the main script, So, to affect badFood, who is affected is 1, and to affect goodFood whoIsAffected is 0
            case "chileRojoMalo":
                this.whoIsAffected = 1;
                this.effect = +0.0001;
                break;
            case "chileVerdeMalo":
                this.whoIsAffected = 0;
                this.effect = -0.0002;
                break;
            case "chileVerdeBueno":
                this.whoIsAffected = 0;
                this.effect = 0.0002;
                break;
        }
    }

    /**
     * These chiles will affect the player's life.
     */
    assignLifeEffect(){
        switch(this.name){
            case "chileRojoBueno":
                this.effect = 5;
                break;
        }
    }
}

export default PowerUp;