class Home {
    constructor(canvas) {
        this._canvas = canvas;

        Events.on(DrawTimer.EVENTS.DRAW, this._draw, this, false);
    }

    remove() {
        Events.off(DrawTimer.EVENTS.DRAW, this);
    }

    _draw() {
        const startButtonSize = new Size(100, 50);
        const startButtonTopLeft = new Coordinate(
            (this._canvas.width - startButtonSize.width) / 2,
            (this._canvas.height - startButtonSize.height) / 2
        );
        this._startButton = new Button(this._canvas, startButtonTopLeft, startButtonSize, this._start);
        this._startButton.enable();
    }

    _start() {
        Events.dispatch(Controller.HomeState.EVENTS.GOTO_STARTING)
    }


}