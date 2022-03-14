/********************************
 *   Ana Bonavides Aguilar      *
 *   Taco Tuesday               *
 *   Creative Code Lab Project  *
 *   cc211010 FH St. Poelten    *
 ********************************/

/**
 * This function lets me create a rounded-up random number between two limits that I pass in through its constructor.
 */
export function randomNumberBetween(minRandomNumber, maxRandomNumber) {
    return Math.floor(
      Math.random() * (maxRandomNumber - minRandomNumber + 1) + minRandomNumber
    );
};