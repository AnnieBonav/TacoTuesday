/********************************
 *   Ana Bonavides Aguilar      *
 *   Taco Tuesday               *
 *   Creative Code Lab Project  *
 *   cc211010 FH St. Poelten    *
 ********************************/

/**
 * This is my CONFIG object, which gets filled-up both in my domScript and my main script. It comes in handy to be able to access important
 * objects from everywhere in my code, especially my canvas and context (which almost all classes need to access).
 */
const CONFIG = {
    canvas: undefined,
    context: undefined,
    game: { //previously world
        width: 1280,
        height: 720,
        currentLevel : undefined,
        highestScore : 0,
    },
    consumableMargin_l : 100,
    consumableMargin_r: 100,
    healthBarMargin_r: 928,
    healthBarWidth: 268,
    playerYPos: 144,
    boundingBoxCB : undefined,
    pointsDisplayCB : undefined,
};

export default CONFIG;