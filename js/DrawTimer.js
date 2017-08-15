class DrawTimer {
    constructor(canvas, fps) {
        this._canvas = canvas;
        this._fps = fps;
        this._interval = 1000 / this._fps;

        Events.on(DrawTimer.EVENTS.START, this.start, this, false);
        Events.on(DrawTimer.EVENTS.STOP, this.stop, this, false);
    }

    start() {
        if (!this._timer) {
            this._timer = setInterval(this._draw.bind(this), this._interval);
        }
    }

    stop() {
        if (this._timer) {
            clearInterval(this._timer);
            this._timer = undefined;
        }
    }

    _draw() {
        this._canvas.clear();
        Events.clearReset();

        Events.dispatch(DrawTimer.EVENTS.DRAW);
    }
}

DrawTimer.EVENTS = {
    START: "drawtimer-start",
    STOP: "drawtimer-stop",
    DRAW: "drawtimer-draw"
};