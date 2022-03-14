/********************************
 *   Ana Bonavides Aguilar      *
 *   Taco Tuesday               *
 *   Creative Code Lab Project  *
 *   cc211010 FH St. Poelten    *
 ********************************/

import Collectible from "./Collectible.js";

/**
 * The class Food is one of the two that inherits from Collectible. Its purpose is to assign the corresponding images of the food (in the
 * Method assignImages), and the pointsModifier.
 */
class Food extends Collectible{
    constructor(name, xPos, yPos, side, rotationSpeed, gravity){
        super(name, xPos, yPos, side, rotationSpeed, gravity);
    }

    init(){
        this.img = new Image(this.width, this.height);
        this.pointsModifier = 0;
        this.assignImages();
        this.assignModifier();
    }

    /**
     * Depending on the name that the ingredient has been given in the constructor the img.src is turned into the path that contains
     * its corresponding picture.
     */
    assignImages(){
        switch (this.name) {
            case "totopo":
                this.img.src = './Assets/Images/Food/Totopo.png';
                break;
            case "lemon":
                this.img.src = './Assets/Images/Food/Lemon.png';
                break;
            case "avocado":
                this.img.src = './Assets/Images/Food/Avocado.png';
                break;
            case "valentina":
                this.img.src = './Assets/Images/Food/Valentina.png';
                break;
            case "ketchup":
                this.img.src = './Assets/Images/Food/Ketchup.png';
                break;
            case "tortillaDura":
                this.img.src = './Assets/Images/Food/TortillaDura.png';
                break;
            case "fenchel":
                this.img.src = './Assets/Images/Food/Fenchel.png';
                break;
        }
    }

    /**
     * The pointsModifier to each is the ammount of points that the player will gain or loose after colliding with them. The code could 
     * be changed so that the modifier is sent in the constructor. And, that way, the different ingredients could have, for example, 
     * random modifiers, or change within different levels.
     */
    assignModifier(){
        switch (this.name) {
            case "totopo":
                this.pointsModifier = 1;
                break;
            case "lemon":
                this.pointsModifier = 2;
                break;
            case "avocado":
                this.pointsModifier = 3;
                break;
            case "valentina":
                this.pointsModifier = 5;
                break;
            case "ketchup":
                this.pointsModifier = -2;
                break;
            case "tortillaDura":
                this.pointsModifier = -3;
                break;
            case "fenchel":
                this.pointsModifier = -5;
                break;        
        }
    }

}

export default Food;