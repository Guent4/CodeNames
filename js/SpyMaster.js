class SpyMaster {
    constructor(canvas, board) {
        this._canvas = canvas;
        this._board = board;

        // Set the board to be of state SpyMaster
        this._board.state = Board.STATES.SPYMASTER;

        Events.on(DrawTimer.EVENTS.DRAW, this._draw, this, false);
    }

    _draw() {
        this._board.enableDraw();
    }
}