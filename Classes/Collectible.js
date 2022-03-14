/********************************
 *   Ana Bonavides Aguilar      *
 *   Taco Tuesday               *
 *   Creative Code Lab Project  *
 *   cc211010 FH St. Poelten    *
 ********************************/

import GameObject from "./GameObject.js";
import CONFIG from "../Scripts/ConfigStorage.js";

/**
 * The class Collectible inherits from GameObject, and then serves also as an Abstract-like class. It will then be used to create the
 * Food and PowerUp classes, which compose the collectibles of the game. It further gives some attributes that both of the previously
 * mentioned classes contain: rotationSpeed and gravity (and changes the width and height just for one side, because all of the
 * collectibles are squares).
 */
class Collectible extends GameObject{
    constructor(name, xPos, yPos, side, rotationSpeed, gravity){
        super(name, xPos, yPos, side, side);
        this.rotationSpeed = rotationSpeed;
        this.gravity = gravity;
        this.dy = 0;
        this.degree = 0;
    }

    init(){
        
    }
    
    /**
     * The rotation of the collectibles is simply created with the timePassedSinceLastRender. This variable is added to the current dy, 
     * multipolied by my current gravitie's magnitude, so that I can consequently mod¡fy its position. And, once the degree reaches 360,
     * it will turn 0 again (because one complete turn has ended).
     */
    update(timePassedSinceLastRender){
        this.dy += this.gravity.magnitude * timePassedSinceLastRender;
        this.yPos += this.dy;
        if(this.degree >= 360){
            this.degree = 0;
        }else{
            this.degree += this.rotationSpeed;
        }
        
    }

    render(){
        super.render();
        CONFIG.context.translate(this.xPos, this.yPos);
        CONFIG.context.rotate(this.degree * Math.PI / 180);
        CONFIG.context.drawImage(this.img, -this.width/2, -this.height/2, this.width, this.height);
        CONFIG.context.resetTransform();
    }

    /**
     * This is called whenever there is a collision of the player with the collectible to destroy the object.
     */
    onRemove(removeCallback){
        this.removeCallback = removeCallback;
    }

}

export default Collectible;