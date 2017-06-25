class Board {
    constructor(canvas) {
        this._canvas = canvas;

        // Create cards
        this._cards = [];

        // State: empty, spymaster, guesser
        this._state = Board.STATES.EMPTY;
    }

    get state() {
        return this._state;
    }

    set state(s) {
        this._state = s;
    }

    enableDraw() {
        Events.on(DrawTimer.EVENTS.DRAW, this._draw, this);
    }

    disableDraw() {
        Events.off(DrawTimer.EVENTS.DRAW, this);
    }

    _draw() {
        const topLeft = new Coordinate(100, 100);
        const size = new Size(100, 50);
        this._canvas.drawRectangle(topLeft, size)
    }
}

Board.STATES = {
    EMPTY: 0,
    SPYMASTER: 1,
    GUESSER: 2
};