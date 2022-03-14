/********************************
 *   Ana Bonavides Aguilar      *
 *   Taco Tuesday               *
 *   Creative Code Lab Project  *
 *   cc211010 FH St. Poelten    *
 ********************************/

import GameObject from "./GameObject.js";
import CONFIG from "../Scripts/ConfigStorage.js";

/**
 * The class Settings creates an object that is part of level. Its purpose is to have a 2DPath that the player can click and, so, the 
 * game is paused. It looks like the player is clicking a button, but instead there is an event listener (defined in the main script)
 * that is in charge to check whether this Path2D is clicked on or not. The only thing that this Settings button would need to be really
 * cool is making a Settings/Paused screen appear, and not only pause the game rendering.
 */
class Settings extends GameObject{
    constructor(name, xPos, yPos, width, height){
        super(name, xPos, yPos, width, height);
        this.settingsPath = new Path2D();
        this.settingsPath.arc(this.xPos, this.yPos, this.width/2, 0, 2 * Math.PI);
    }

    init(){
        this.img = new Image(this.width, this.height);
        this.assignImages();
    }
    
    assignImages(){
        this.img.src = './Assets/Images/Other/Settings.png';
    }

    render(){
        super.render();
        CONFIG.context.translate(this.xPos, this.yPos);
        CONFIG.context.drawImage(this.img, - this.width/2, - this.height/2, this.width, this.height);
        CONFIG.context.resetTransform();
    }
}

export default Settings;