/********************************
 *   Ana Bonavides Aguilar      *
 *   Taco Tuesday               *
 *   Creative Code Lab Project  *
 *   cc211010 FH St. Poelten    *
 ********************************/

import {randomNumberBetween} from "../Scripts/ToolBox.js";

/**
 * This class is pretty cool, it handles creating asynchronous functions that in a random time (in a defined margin) calls its callbacl
 * which, in this case, are functions that generate ingredients and powerUps.
 */
class RandomDispatcher{
    constructor(callback, options = {min: 1000, max: 4000}){
        if(typeof callback !== 'function'){
            throw Error('Calback must be a function.')
        }
        this.callback = callback;
        this.options = options;
        this.dispatcherStatus = "ongoing";
        this.loop();
    }

    /**
     * This is the function that lets me change an atttribute (dispatcherStatus) so that I can condition whether it enters back to the loop
     * or not.
     */
    changeDispatcherStatus(newState){
        this.dispatcherStatus = newState;
        if(this.dispatcherStatus === "ongoing"){
            this.loop();
        }
    }

    /**
     * I needed to add a condition in the loop because the asynchronous functions were not really destroyabe, so the only thing I could do
     * was stopping itself from entering back on the loop (which happens when the status is not ongoing).
     */
    loop(){
        if(this.dispatcherStatus === "ongoing"){
            let wait = randomNumberBetween(this.options.min, this.options.max);
            window.setTimeout(() => {
                this.callback();
                this.loop();
            }, wait);
        }
        
    }
}

export default RandomDispatcher;