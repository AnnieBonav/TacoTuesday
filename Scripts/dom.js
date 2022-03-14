/********************************
 *   Ana Bonavides Aguilar      *
 *   Taco Tuesday               *
 *   Creative Code Lab Project  *
 *   cc211010 FH St. Poelten    *
 ********************************/

/**
 * This is my DOM object, which gets filled-up both in my domScript and my main script. It comes in handy to be able to access DOM
 * elements form everywhere in my code, and not only the main Script.
 */
const DOM = {
    screens:{
        mainMenu: undefined,
        ingame: undefined,
        gameOver: undefined,
        instructions: undefined,
        settings: undefined,
    },
    functions:{
        init: undefined,
        openMainMenu: undefined,
        openGameOver: undefined,
        openIngame: undefined,
        openInstructions: undefined,
        openSettings: undefined,
        game:{
            createLevel: undefined,
        },
    },
    settings:{
        lettersMovementCB: undefined,
        arrowsMovementCB: undefined,
        lettersMovement: undefined,
        arrowsMovement: undefined,
    },
}

export default DOM;