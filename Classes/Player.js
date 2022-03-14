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
 * My player is the tortilla that moves around the screen. One of the most important attributes is a plate (from the class Plate) that is
 * sent through the constructor.
 */
class Player extends GameObject{
    constructor(name, xPos, yPos, width, height, speed, plate){
        super(name, xPos, yPos, width, height);
        this.speed = speed;
        this.plate = plate;
        this.dx = 0;
        this.sprint = 0;
        //this.facing = 1;
        this.animationState = "idle";
        
        this.currentKeys = {};
    }

    init(){
        this.sprites;
        this.assignSprites();
        this.assignMovementKeys();
    }

    assignSprites(){
        this.sprites = {
            run: {
                src: "./Assets/Images/Player/Tortilla_Sprite.png",
                frames: 30,
                fps: 30,
                image: null,
                frameSize: {
                    width: 428,
                    height: 260
                }
            },
            
            idle: {
                src: "./Assets/Images/Player/Tortilla_Sprite.png",
                frames: 30,
                fps: 30,
                image: null,
                frameSize: {
                    width: 428,
                    height: 260
                }
            }
        }

        Object.values(this.sprites).forEach(sprite =>{
            sprite.image = new Image();
            sprite.image.src = sprite.src;
        });
    }

    /**
     * This method handles knowing which key(s) are beinng pressed.
     */
    assignMovementKeys(){
        let possibleKeys = ['Space','KeyA','KeyD', 'KeyF', 'ArrowLeft', 'ArrowRight'];
        document.addEventListener('keydown', (event) => {
            if(possibleKeys.includes(event.code)){
                event.preventDefault();
                this.currentKeys[event.code] = true;
            }
        });

        document.addEventListener('keyup', (event) => {
            this.currentKeys[event.code] = false;
        });
    }

    /**
     * This method doesn't only update the Player's x position, but it also handles the Plate's one. To avoid having cloded code, I make
     * sure that the separate actions that need to be made in order to update the xPos are carried-out in different methods.
     */
    update(timePassedSinceLastRender){
        this.checkMovement(); //I check whether the player is moving to the left or the right
        this.isSprinting(); //Check if it is Sprinting

        if(this.dx !== 0){
            this.state = 'idle'; //run
        }else{
            this.state = 'idle';
        }

        this.xPos += timePassedSinceLastRender * this.dx * (this.speed + this.sprint);

        this.plate.update(timePassedSinceLastRender, this.currentKeys, this.sprint); //I change the plate's position based on how the player is moving
    }

    checkMovement(){
        if(DOM.settings.lettersMovementCB.checked === true){
            if(this.currentKeys['KeyD']){
            this.dx = 1;
            //this.facing = 1;
            } else if(this.currentKeys['KeyA']){
                this.dx = -1;
                //this.facing = -1;
            } else{
                this.dx = 0;
            }
        }else if(DOM.settings.arrowsMovementCB.checked === true){
            if(this.currentKeys['ArrowRight']){
                this.dx = 1;
            //this.facing = 1;
            } else if(this.currentKeys['ArrowLeft']){
                this.dx = -1;
                //this.facing = -1;
            } else{
                this.dx = 0;
            }
        }
        
    }

    isSprinting(){
        if(this.currentKeys['Space'] === true){
            this.sprint = this.speed;
        }else if (this.currentKeys['Space'] === false){
            this.sprint = 0;
        }
    }

    render(){
        super.render();
        this.plate.render();

        CONFIG.context.translate(this.xPos, this.yPos);
        //CONFIG.context.scale(this.facing, 1);
        
        let coords = this.getImageSpriteCoordinates(this.sprites[this.state]);

        
        CONFIG.context.drawImage(
            this.sprites[this.state].image,
            coords.sourceX,
            coords.sourceY,
            coords.sourceWidth,
            coords.sourceHeight,
            -this.width/2, 
            -this.height/2, this.width, this.height);

        CONFIG.context.resetTransform();        
    }

    /**
     * This method let's us have the correct part of our Sprite sheet, looping through the frames and depending on which oen we are in 
     * right now. This is the main differece using sprites have from using images.
     */
    getImageSpriteCoordinates(sprite){
        let frameX = Math.floor(performance.now()/1000 * sprite.fps % sprite.frames);
        let coords = {
            sourceX: frameX * sprite.frameSize.width,
            sourceY: 0,
            sourceWidth: sprite.frameSize.width,
            sourceHeight: sprite.frameSize.height,
        }
        return coords;
    }

    /**
     * Calls the parent getBoundingBox method, but adds its own part of teh code (which adjusts the bounding Box for the tortilla's sprite
     * sheet).
     */
    getBoundingBox(){
        let boundingBox = super.getBoundingBox();
        let originalBoundingBox = {...boundingBox};

        boundingBox.w = boundingBox.w * 0.6;
        boundingBox.h = boundingBox.h * 0.8;
        boundingBox.x = boundingBox.x + originalBoundingBox.w * 0.20;
        boundingBox.y = boundingBox.y + originalBoundingBox.h * 0.1;
        
       return boundingBox;
    }

}

export default Player;