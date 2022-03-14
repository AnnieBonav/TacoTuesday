/********************************
 *   Ana Bonavides Aguilar      *
 *   Taco Tuesday               *
 *   Creative Code Lab Project  *
 *   cc211010 FH St. Poelten    *
 ********************************/

/**
 * The class Gravity lets me create gravities used within my collectibles. Even though it is not used now to its fullest potential, it
 * comes in handy to have clean code. In the future, the direction attribute will be used for changing the complete direction of where 
 * the gravity is going in the game. For example, instead of the collectibles falling from above, they will start falling from below.
 * This will be possible with the class Gravity, and will add interesting gameplay.
 */
class Gravity{
    constructor(magnitude, direction){
        this.magnitude = magnitude;
        this.direction = direction;
    }

    changeMagnitude(magnitude){
        this.magnitude = this.magnitude + magnitude;
    }
}

export default Gravity;