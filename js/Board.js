class Cell {
    constructor (occupied) {
        this.occupiedBy = occupied;
    }

    set occupy (who) {
        this.occupiedBy = who;
    }
}

class Coordinate {
    constructor (x, y) {
        this.x = x;
        this.y = y;
    }
}

/**Class representing the game Board.
 * Contains property .board of Cell formatted as [row][column]
 */
class Board {

    constructor () {
        
        this.board = [  
                        [new Cell("None"), new Cell("None"), new Cell("None"), new Cell("None"), new Cell("None"), new Cell("None"), new Cell("None")],
                        [new Cell("None"), new Cell("None"), new Cell("None"), new Cell("None"), new Cell("None"), new Cell("None"), new Cell("None")],
                        [new Cell("None"), new Cell("None"), new Cell("None"), new Cell("None"), new Cell("None"), new Cell("None"), new Cell("None")],
                        [new Cell("None"), new Cell("None"), new Cell("None"), new Cell("None"), new Cell("None"), new Cell("None"), new Cell("None")],
                        [new Cell("None"), new Cell("None"), new Cell("None"), new Cell("None"), new Cell("None"), new Cell("None"), new Cell("None")],
                        [new Cell("None"), new Cell("None"), new Cell("None"), new Cell("None"), new Cell("None"), new Cell("None"), new Cell("None")]
                     ];
    
    }

    /** Check whether given token has won the vertical column at origin
        * @param {Coordinate} origin a coordinate object representing the coordinates of the origin on the game board
        * @param {string} the token to look for, either "blue" or "red" (or "None")
        * @param {number} accumulatedMatchingTokens representing the accumulated number of matching tokens on this column, starts at 0
        * @returns {boolean} boolean
    */
    checkVerticalVictory (origin, token, accumulatedMatchingTokens) {
        let currentCell = this.board[origin.x][origin.y];

        //If we have found three matching tokens in a row, and this fourth position also matches, we have found four-in-a-row
        if (currentCell.occupiedBy === token && accumulatedMatchingTokens === 3) {
            return true;
        } else {
            //Abort if current board position contains mismatched token, or if we have reached the end of the column/array
            if (currentCell.occupiedBy != token || origin.x === 5) {
                return false;
            } else {
                //We have found a matching token at the current position, but haven't yet accumulated four matching tokens in a row, 
                // so lets repeat this process on this cell below us, adding one to our accumulatedMatchingTokens
                return this.checkVerticalVictory(new Coordinate(origin.x + 1, origin.y), token, accumulatedMatchingTokens + 1); //Recursive
            }
        }
    }

    /**Checks whether victory condition has been reached for the given token on the horizontal axis
    * @param {Coordinate} origin a coordinate object representing the coordinates of the position on the game board from which to check 
    * for victory in both directions
    * @param {string} token the token to look for, either "blue" or "red" (or "None")
    * @returns {boolean} a boolean
    */ 
    checkHorizontalVictory (origin, token) {
            
        const left = new Coordinate(0, -1);
        const right = new Coordinate(0, 1);

        const totalMatchingTokensLeft = this._checkHorizontal(origin, left, token, 0);
        
        //If the total number of matching tokens to the left of origin is 4; or if it is 4 or more when added to 
        // the total on the right, we have found four-in-a-row
        return (totalMatchingTokensLeft === 4 ? true : totalMatchingTokensLeft + this._checkHorizontal(origin, right, token, 0) >= 4);
    }

    /** Check whether given token has won the row from origin in a specified direction (either left or right)
    * @param {Coordinate} origin a coordinate object representing the coordinates of the origin on the game board
    * @param {Coordinate} direction a coordinate object representing the direction to check for victory
    * @param {string} token the token to look for, either "blue" or "red" (or "None")
    * @param {number} accumulatedMatchingTokens representing the accumulated number of matching tokens on this column, starts at 0
    * @returns {number} returns the total number of accumulated matching tokens in given direction
    */
    _checkHorizontal (origin, direction, token, accumulatedMatchingTokens) {

        const currentToken = this.board[origin.x][origin.y].occupiedBy;

        if (currentToken === token && accumulatedMatchingTokens === 3) {
            return accumulatedMatchingTokens + 1;
        } else {
            //The second expression checks to see if we have reached the end of the row in the specified direction
            if (currentToken != token || (direction.y > 0 ? origin.y === 6 : origin.y === 0) ) {
                return accumulatedMatchingTokens; //We haven't reached four-in-a-row
            } else {
                return this._checkHorizontal(new Coordinate(origin.x + direction.x, origin.y + direction.y), direction, token, accumulatedMatchingTokens + 1);
            }
        }

    }

    /**Checks whether victory condition has been reached for the given token on both diagonal axes
    * @param {Coordinate} origin a coordinate object representing the coordinates of the position on the game board from which to check 
    *                       for victory in both directions
    * @param {string} token the token to look for, either "blue" or "red" (or "None")
    * @returns {boolean} a boolean
    */ 
    checkDiagonalVictory (origin, token) {

        //DIRECTIONS
        const tpLeft = new Coordinate(-1, -1); //Towards top-left
        const btLeft = new Coordinate(1, -1); //Towards bottom-left
        const tpRight = new Coordinate(-1, 1); //Towards top-right
        const btRight = new Coordinate(1, 1); //Towards bottom-right

        const totalMatchingTokensTopLeft = this._checkDiagonal(origin, tpLeft, token, 0);
        const totalMatchingTokensBottomLeft = this._checkDiagonal(origin, btLeft, token, 0);
        
        return  (
                    totalMatchingTokensTopLeft === 4 ? true : totalMatchingTokensTopLeft + this._checkDiagonal(origin, btRight, token, 0) >= 4 
                    ||
                    totalMatchingTokensBottomLeft === 4 ? true : totalMatchingTokensBottomLeft + this._checkDiagonal(origin, tpRight, token, 0) >= 4
                );

    }

    _checkDiagonal (origin, direction, token, accumulatedMatchingTokens) {

        const currentToken = this.board[origin.x][origin.y].occupiedBy;

        if (currentToken === token && accumulatedMatchingTokens === 3) {
            console.log("chkDiagonal() - success, direction: " + direction.x + ", " + direction.y + ". accTokens: " + accumulatedMatchingTokens);
            return accumulatedMatchingTokens + 1;
        } else {
            //The second expression checks to see if we have reached the end of the row in the specified direction
            if (currentToken != token || (direction.x > 0 ? origin.x === 5 : origin.x === 0) ) {
                console.log("chkDiagonal() - failure, direction: " + direction.x + ", " + direction.y + ". accTokens: " + accumulatedMatchingTokens);
                console.log("We encountered " + currentToken + ", and our token is " + token);
                console.log("Are we out of bounds? " + (direction.x > 0 ? origin.x === 5 : origin.x === 0))
                return accumulatedMatchingTokens; //We haven't reached four-in-a-row
            } else {
                console.log("chkDiagonal() - continue, direction: " + direction.x + ", " + direction.y + ". accTokens: " + accumulatedMatchingTokens);
                return this._checkDiagonal(new Coordinate(origin.x + direction.x, origin.y + direction.y), direction, token, accumulatedMatchingTokens + 1);
            }
        }
    }
}