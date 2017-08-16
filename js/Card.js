class Card {
    constructor(canvas, topLeftCoord, size, text) {
        this._canvas = canvas;
        this._topLeftCoord = topLeftCoord;
        this._size = size;
        this._text = text;
        this._radius = 10;

        this._type = Card.TYPE.CIVILIAN;
        this._enabled = false;
        this._revealed = false;
        this._spymaster = true;
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

    set enabled(enable) {
        this._enabled = enable;
    }

    get type() {
        return this._type;
    }

    set type(type) {
        this._type = type;
    }

    get revealed() {
        return this._revealed;
    }

    set revealed(revealed) {
        this._revealed = revealed;
    }
    
    set spymaster(spymaster) {
        this._spymaster = spymaster;
        this._enabled = !spymaster;
    }
    
    draw() {
        if (this._revealed) {
            // Fill and border show true colors
            this._color = Colors[this._type];
            this._borderColor = Colors[this._type];
        } else if (this._spymaster && !this._revealed) {
            // Only in spymaster, show true colors as borders and default as fill
            this._color = Colors[Card.TYPE.DEFAULT];
            this._borderColor = Colors[this._type];
        } else {
            // Have default fill and border
            this._color = Colors[Card.TYPE.DEFAULT];
            this._borderColor = Colors[Card.TYPE.DEFAULT];
        }
        
        this._canvas.drawRectangle(this._topLeftCoord, this._size, this._color, this._radius, this._borderColor, 10);
        
        const textCoord = new Coordinate(this._size.width/2, this._size.height/2)
        const textCenterCoord = Coordinate.add(this._topLeftCoord, textCoord);
        this._canvas.drawText(textCenterCoord, this._text, "center", "20px Arial");
        
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

    _callback() {
        this._revealed = true;
        
        Events.dispatch(Guesser.EVENTS.CARD_REVEALED, this.type);
    }

}

Card.TYPE = {
    DEFAULT: "default",
    CIVILIAN: "civilian",
    BLUE: "blue",
    RED: "red",
    ASSASSIN: "assassin"
};