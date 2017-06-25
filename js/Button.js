class Button {
    constructor(canvas, topLeftCoord, size, callback) {
        this._canvas = canvas;
        this._topLeftCoord = topLeftCoord;
        this._size = size;
        this._callback = callback;

        Events.on(DrawTimer.EVENTS.DRAW, this._draw, this);
    }

    get topLeftCoord() {
        return this._topLeftCoord;
    }

    get size() {
        return this.size;
    }

    get width() {
        return this._size.width;
    }

    get height() {
        return this._size.height;
    }

    enable() {
        Events.on(InputHandler.EVENTS.CLICK, this._click, this);
    }

    disable() {
        Events.off(InputHandler.EVENTS.CLICK, this);
    }

    _draw() {
        this._canvas.drawRectangle(this._topLeftCoord, this._size)
    }

    _click(mousePosition) {
        const distance = Coordinate.subtract(mousePosition, this._topLeftCoord);
        if (distance.x > 0 && distance.x < this._size.width &&
            distance.y > 0 && distance.y < this._size.height) {
            this._callback();
        }
    }
}