/********************************
 *   Ana Bonavides Aguilar      *
 *   Taco Tuesday               *
 *   Creative Code Lab Project  *
 *   cc211010 FH St. Poelten    *
 ********************************/

import GameObject from "./GameObject.js";
import CONFIG from "../Scripts/ConfigStorage.js";

/**
 * The class PointsDisplay creates an object that is part of level. Its purpose is to make the points be displayed, both as a numerical
 * value (so that the Player knows how many possitive points they have gathered and, with that, having a max score makes sense) and also
 * as a way of seeing how much life is left (for the only current available gameplay, which is endless-live-defined). In the future it 
 * might not appear in all of teh levels. For example, if the player chosoes the time-based one, maybe lives will not be considered, 
 * but grabbing the wrong ingredients will only reduce points.
 */
class PointsDisplay extends GameObject{
    
    constructor(name, xPos, yPos, width, height, maxNegative){
        super(name, xPos, yPos, width, height);
        this.maxNegative = maxNegative;
        this.points = 0;
        this.negativePoints = maxNegative;
        
        this.leftHealthBarPos = CONFIG.game.width - CONFIG.healthBarMargin_r - CONFIG.healthBarWidth
        this.displayPointsStatus = CONFIG.pointsDisplayCB;
    }

    init(){
        this.healthBarImg = new Image(this.width, this.height);
        this.currentHealthImg = new Image(this.width, this.height);
        this.assignImages();
    }

    /**
     * A pointsDisplay, right now, consists of two images: a healthBarImg, which is a rectangle that goes from red to green to show
     * how much life the player has, and the currentHealthImg, which is an arrow that points the current life. In addition, a text is
     * rendered, which shows the numeric value of the points.
     */
    assignImages(){
        this.healthBarImg.src = './Assets/Images/Other/HealthBar.png';
        this.currentHealthImg.src = './Assets/Images/Other/CurrentHealth.png'
    }

    update(){
        this.xPos = (this.negativePoints * CONFIG.healthBarWidth / this.maxNegative) + this.leftHealthBarPos;
    }

    render(){
        super.render();
        CONFIG.context.drawImage(this.healthBarImg, this.leftHealthBarPos, this.yPos, this.width, this.height);
        CONFIG.context.fillText("Score: " + this.points, CONFIG.game.width - 280, 92);
        
        CONFIG.context.translate(this.xPos, this.yPos + this.height/2);
        CONFIG.context.drawImage(this.currentHealthImg, -10,-45, 15, 30);
        CONFIG.context.resetTransform();
    }

    /**
     * It is important to have this function (and not only do "currentPoints += points") when there is a collission with an inngredient,
     * because either one of two things can happen: If the numeric value of the food's pointsModifier variable is possitive, then it 
     * means that the player has eaten goodFood and, hence, gained points; Nevertheless, if the pointsModifier is negative, then it 
     * means that the player has eaten badFood, and that should not affect the current points displayed for the player (because negative 
     * points would be weird, and that can happen if, for example, the first thing that the player eats is bad food) but, instead, it 
     * affects a variable that looks at how many negative points the player had. And if at some points the negative points are equal to 
     * the maximum negative points that the player can have, then the game ends.
     */
    setPoints(points){
        if(points < 0){
            this.negativePoints += points;
        }else if(this.points + points >= 0){
            this.points += points;
        }
    }

    /**
     * Whenever the player eats one of the powerups that gives life, it is important that we go through this method (and not only do
     * currentLife += lifeGained) because we don't want the player to be able to have more than the maximum life we have set at teh 
     * beginning. If we let that happen, then the arrow of currentHealth would go beyond the image of teh healthBar, and that would be wrong.
     */
    increaseLife(life){
        this.negativePoints += life;
        if(this.negativePoints > this.maxNegative){
            this.negativePoints = this.maxNegative;
        }
        //console.log("Negative: " + this.negativePoints + "  maxNegative: " + this.maxNegative);
    }
}

export default PointsDisplay;