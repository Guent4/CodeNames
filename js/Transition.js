class Transition {
    constructor(canvas, type) {
        this._canvas = canvas;
        this._type = type;
        
        Events.on(DrawTimer.EVENTS.DRAW, this._draw, this, false);
    }
    
    remove() {
        Events.off(DrawTimer.EVENTS.DRAW, this);
    }
    
    _draw() {
        const passOffsetY = this._canvas.height / 2 - 50;
        const passCoord = new Coordinate(this._canvas.width / 2, passOffsetY);
        const passText = (function(type) {
            switch(type) {
                case Transition.TYPE.GOTO_RED_SPYMASTER:
                    return "Pass to the Red SpyMaster!";
                case Transition.TYPE.GOTO_BLUE_SPYMASTER:
                    return "Pass to the Blue SpyMaster!";
                case Transition.TYPE.GOTO_RED_GUESSER:
                    return "Pass to the Red Guessers!";
                case Transition.TYPE.GOTO_BLUE_GUESSER:
                    return "Pass to the Blue Guessers!";
                default:
                    return undefined;
            }
        })(this._type);
        this._canvas.drawText(passCoord, passText, "center", "40px Arial");
        
        const okButtonSize = new Size(100, 50);
        const okButtonTopLeft = new Coordinate(
            (this._canvas.width - okButtonSize.width) / 2,
            (passCoord.y + okButtonSize.height)
        );
        const okButton = new Button(this._canvas, okButtonTopLeft, okButtonSize, "OK", "white", 10, "black", 1);
        okButton.callback = this._endTurn;
        okButton.draw();
    }
    
    _endTurn() {
        Events.dispatch(Controller.TransitionState.EVENTS.LEAVE_TRANSITION);
    }
}

Transition.TYPE = {
    GOTO_RED_SPYMASTER: 0,
    GOTO_BLUE_SPYMASTER: 1,
    GOTO_RED_GUESSER: 2,
    GOTO_BLUE_GUESSER: 3
};