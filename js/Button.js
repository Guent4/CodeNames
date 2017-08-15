class Button {
    constructor(canvas, topLeftCoord, size, text, color="white", radius=0, borderColor = "black") {
        this._canvas = canvas;
        this._topLeftCoord = topLeftCoord;
        this._size = size;
        this._text = text;
        this._color = color;
        this._radius = radius;
        this._enabled = true;
        this._callback = undefined;
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
    
    get text() {
        return this._text;
    }

    set callback(callback) {
        this._callback = callback;
    }

    set enable(enable) {
        this._enable = enable;
    }

    draw() {
        this._canvas.drawRectangle(this._topLeftCoord, this._size, this._color, this._radius, "black");
        
        const textCoord = new Coordinate(this._size.width/2, this._size.height/2)
        const textCenterCoord = Coordinate.add(this._topLeftCoord, textCoord);
        this._canvas.drawText(textCenterCoord, this._text, "center", "30px Arial");
        
        // If the button is enabled, then register this
        if (this._enabled) Events.on(InputHandler.EVENTS.CLICK, this._click, this);
    }

    _click(mousePosition) {
        const distance = Coordinate.sub(mousePosition, this._topLeftCoord);
        if (distance.x > 0 && distance.x < this._size.width &&
            distance.y > 0 && distance.y < this._size.height) {
            this._callback();
        }
    }
}