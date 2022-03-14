/********************************
 *   Ana Bonavides Aguilar      *
 *   Taco Tuesday               *
 *   Creative Code Lab Project  *
 *   cc211010 FH St. Poelten    *
 ********************************/

import CONFIG from "../Scripts/ConfigStorage.js";
import GameObject from "./GameObject.js";
import DOM from "../Scripts/dom.js";

/**
 * Instead of the boundingBox of the Player colliding with the collectibles themselves, I created a class Plate that is the one that
 * picks-up the ingredients. One instance of it lives inside the player, is updated with its parent's movement, and is the one that 
 * collides with the falling collectibles.
 */
class Plate extends GameObject{
    constructor(name, xPos, yPos, width, height, speed){
        super(name, xPos, yPos, width, height);
        this.speed = speed;
        this.dx = 0;
        this.facing = 1; //Can be a boolean
    }

    init(){
        this.img = new Image(this.width, this.height);
        this.assignImages();
    }

    assignImages(){
        this.img.src = "./Assets/Images/Player/Plate.png"
    }

    /**
     * This update shows that the movement is not handled by this class itself, but comes from the Player. The purpose of this is having
     * as little repeated code as possible. It is not necessary to have both the player and Plate to check the event listeners of 
     * keyPressings, because they will both be affected in the same way. Hence, having the plate be an attribute of the player lets me 
     * move it with its own update logic.
     */
    update(timePassedSinceLastRender, currentKey, sprint){
        if(DOM.settings.lettersMovementCB.checked === true){
            if(currentKey['KeyD']){
            this.dx = 1;
            //this.facing = 1;
            } else if(currentKey['KeyA']){
                this.dx = -1;
                //this.facing = -1;
            } else{
                this.dx = 0;
            }
        }else if(DOM.settings.arrowsMovementCB.checked === true){
            if(currentKey['ArrowRight']){
                this.dx = 1;
            //this.facing = 1;
            } else if(currentKey['ArrowLeft']){
                this.dx = -1;
                //this.facing = -1;
            } else{
                this.dx = 0;
            }
        }

        this.xPos += timePassedSinceLastRender * this.dx * (this.speed + sprint);
    }

    render(){
        super.render();
        CONFIG.context.translate(this.xPos, this.yPos);        
        CONFIG.context.drawImage(this.img, -this.width/2, -this.height / 2, this.width, this.height);
        CONFIG.context.resetTransform();        
    }

}

export default Plate;