class Card {
    constructor(canvas, topLeftCoord, size, text) {
        this._canvas = canvas;
        this._topLeftCoord = topLeftCoord;
        this._size = size;
        this._text = text;
        this._radius = 10;
        
        this._type = Card.TYPE.CIVILIAN;
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

    set enable(enable) {
        this._enable = enable;
    }
    
    set type(type) {
        this._type = type;
    }
    
    set revealed(revealed) {
        this._revealed = revealed;
    }
    
    set spymaster(spymaster) {
        this._spymaster = spymaster;
        this._enabled = !spymaster;
    }
    
    _callback() {
        this._revealed = true;
        
        // TODO: Handle the results of guessing this card
    }
    
    draw() {
        if (this._revealed) {
            // Fill and border show true colors
            this._color = Card.COLOR[this._type]; 
            this._borderColor = Card.COLOR[this._type];
        } else if (this._spymaster && !this._revealed) {
            // Only in spymaster, show true colors as borders and default as fill
            this._color = Card.COLOR[Card.TYPE.DEFAULT];
            this._borderColor = Card.COLOR[this._type];
        } else {
            // Have default fill and border
            this._color = Card.COLOR[Card.TYPE.DEFAULT];
            this._borderColor = Card.COLOR[Card.TYPE.DEFAULT];
        }
        
        // if (this._spymaster && !this._revealed) {
        //     this._color = Card.COLOR[Card.TYPE.DEFAULT];
        //     this._borderColor = Card.COLOR[this._type];
        // } else if (this._revealed) {
        //     this._color = Card.COLOR[this._type]; 
        //     this._borderColor = Card.COLOR[this._type]; 
        // } else {
        //     this._color = Card.COLOR[Card.TYPE.DEFAULT];
        //     this._borderColor = Card.COLOR[Card.TYPE.DEFAULT];
        // }
        
        this._canvas.drawRectangle(this._topLeftCoord, this._size, this._color, this._radius, this._borderColor, 10);
        
        const textCoord = new Coordinate(this._size.width/2, this._size.height/2)
        const textCenterCoord = Coordinate.add(this._topLeftCoord, textCoord);
        this._canvas.drawText(textCenterCoord, this._text, "center", "30px Arial");
        
        // If the button is enabled, then register this
        if (this._enabled) Events.on(InputHandler.EVENTS.CLICK, this._click, this);
    }
}

Card.TYPE = {
    DEFAULT: 0,
    CIVILIAN: 1,
    BLUE: 2,
    RED: 3,
    ASSASSIN: 4
};

Card.COLOR = {
    0: "#FFFDBF",       // Default
    1: "#94EF86",       // Civilian
    2: "#0E4E8B",       // Blue
    3: "#D6190B",       // Red
    4: "#0A0B08"        // Assassin
};