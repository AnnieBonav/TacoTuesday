/********************************
 *   Ana Bonavides Aguilar      *
 *   Taco Tuesday               *
 *   Creative Code Lab Project  *
 *   cc211010 FH St. Poelten    *
 ********************************/

import GameObject from "./GameObject.js";
import CONFIG from "../Scripts/ConfigStorage.js";

/**
 * The class Clock creates an object that is part of level. Its purpose is to make a clock appear, which is turning around at a speed
 * passed-in through its cunstructor. Even though the Clock does not impact any of the game's functionality right now, in the future it
 * will serve as another of the Game's mode, where the player will decide if the game is endless or time-based.
 */
class Clock extends GameObject{
    constructor(name, xPos, yPos, width, height, duration){
        super(name, xPos, yPos, width, height);
        this.duration = duration;
        this.currentTime = 0;
        this.degree = 0.1;
        this.increment;
    }

    init(){
        this.clockImg = new Image(this.width, this.height);
        this.clockHandImg = new Image(this.width,this.height);
        this.assignImages();
    }

    /**
     * A Clock consists of two images: a clockImg (that is the base for it) and a clockHandImg. This last is the one that will rotate
     * accordingly to how much time has passed of the Clock's revolution so that the player can see their remaining time represented
     * on it.
     */
    assignImages(){
        this.clockImg.src = './Assets/Images/Other/Clock.png';
        this.clockHandImg.src = './Assets/Images/Other/ClockHandle.png';
    }

    /**
     * During the update is where I define the current degree of the handle (based on the current increment). The way that the clock
     * currently revolved is defined by the speed of the rendering, and not "real" time. In the future, this will be switched to cosider
     * "real" time, so that the time the player has to play does not depend on their compiter power.
     */
    update(){
        this.increment = this.duration / 360;
        if(this.degree >= 360){
            this.degree = 0.1;
        }else{
            this.degree += this.increment;
        }
    }

    /**
     * Even though rotating the context is also seen in other places of this project, this is the only one that depends on a time 
     * calculation (as mentioned before).
     */
    render(){
        super.render();
        CONFIG.context.drawImage(this.clockImg, this.xPos - this.width/2, this.yPos - this.height/2, this.width, this.height);
        CONFIG.context.translate(this.xPos, this.yPos);
        CONFIG.context.drawImage(this.clockImg, - this.width/2, - this.height/2, this.width, this.height);
        CONFIG.context.rotate(this.degree * Math.PI / 180);
        CONFIG.context.drawImage(this.clockHandImg, - this.width/2, - this.height/2, this.width, this.height);
        CONFIG.context.resetTransform();
    }
}

export default Clock;