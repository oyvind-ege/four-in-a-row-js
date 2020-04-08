class Game {
    constructor () {
        this.gameBoard = new Board();
        this.turnNumber = 0;
    }

    /** Check whether the given move by the given token leads to victory
     * @param {Coordinate} move - the move
     * @param {string} token - the token to check victory for
     * @returns {boolean}
     */
    checkVictory (move, token) {
        return (    this.gameBoard.checkVerticalVictory  (move, token, 0) 
                ||  this.gameBoard.checkHorizontalVictory(move, token) 
                ||  this.gameBoard.checkDiagonalVictory  (move, token));
    }
}