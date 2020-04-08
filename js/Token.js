class Token {
    constructor(owner, x, y) {
        this.owner = owner;
        this._position = new Coordinate(x, y);
        

        /**Moves the token in the specified direction.
         * @param {Coordinate} direction - direction in which to move
         */
        this.move = (direction) => {
            this._position.x += coordinate.x;
            this._position.y += coordinate.y;
        };
    }

    get pos() {return this._position};
}