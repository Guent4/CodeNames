class SpyMaster extends Playing {
    constructor(canvas, board, type) {
        super(canvas, board);
        this._type = type;
        
        this._blueText = "Blue SpyMaster";
        this._redText = "Red SpyMaster";
        this._redTextOpacity = (this._type === SpyMaster.TYPE.RED) ? 1 : 0.3;
        this._blueTextOpacity = (this._type === SpyMaster.TYPE.BLUE) ? 1 : 0.3;
        
        // Set the board to be of state SpyMaster
        this._board.state = (type === SpyMaster.TYPE.RED) ? Board.STATES.SPYMASTER_RED : Board.STATES.SPYMASTER_BLUE;
        
        Events.on(DrawTimer.EVENTS.DRAW, this._draw, this, false);
    }

    remove() {
        Events.off(DrawTimer.EVENTS.DRAW, this);
    }

    _draw() {
        super._draw();
    }
}

SpyMaster.TYPE = {
    RED: 0,
    BLUE: 1,
};