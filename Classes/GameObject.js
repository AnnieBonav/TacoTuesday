/********************************
 *   Ana Bonavides Aguilar      *
 *   Taco Tuesday               *
 *   Creative Code Lab Project  *
 *   cc211010 FH St. Poelten    *
 ********************************/

import CONFIG from "../Scripts/ConfigStorage.js";

/**
 * Is my main class where all the other GameObjects extend from. It gives them their main characteristics: a name (which is a string,
 * and represents which specific object in the game it is); an x position and y position (which are numbers and are updated within each
 * individual class, so that they move accordingly); a width and a height (which are used to render the images of each object).
 */
class GameObject{
    constructor(name, xPos, yPos, width, height){
        this.name = name;
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width;
        this.height = height;
        //this.boundingBox = CONFIG.boundingBoxCB;
        this.boundingBox = false;
        this.init();
    }

    /**
     * Calling the init function from the constructor in the class that then extends alll of my other game objects works wonders, because
     * this way I make sure that each of their children will call its own init function.
     */
    init(){

    }

    update(){

    }

    /**
     * This rendering is not from the object's image itself, but its bounding box, Even though the option to make the boundig box appear
     * is not currently available in the game (because I am not in debugging mode anymore, and I don't want players to be able to do so)
     * by only changing a few lines of code I can have the change to make this appear again, which comes in handy to see if collisions are 
     * correctly working.
     */
    render(){
        if(this.boundingBox){ //if(this.boundingBox.checked)
            let myBoundingBox = this.getBoundingBox();
            CONFIG.context.translate(myBoundingBox.x, myBoundingBox.y);
            CONFIG.context.strokeRect(0,0,myBoundingBox.w, myBoundingBox.h);
            CONFIG.context.style = "#FF0000";
            CONFIG.context.resetTransform();
        }
    }

    /**
     * It returns a boundingBox as an object used to render each object's boundingBox.
     */
    getBoundingBox(){
        return{
            x: this.xPos - this.width/2,
            y: this.yPos - this.height/2,
            w: this.width,
            h: this.height
        }
    }
}

export default GameObject;
