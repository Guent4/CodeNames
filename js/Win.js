class Win {
    constructor(canvas, type) {
        this._canvas = canvas;
        this._type = type;
        
        Events.on(DrawTimer.EVENTS.DRAW, this._draw, this, false);
    }

    remove() {
        Events.off(DrawTimer.EVENTS.DRAW, this);
    }

    _draw() {
        // const startButtonSize = new Size(100, 50);
        // const startButtonTopLeft = new Coordinate(
        //     (this._canvas.width - startButtonSize.width) / 2,
        //     (this._canvas.height - startButtonSize.height) / 2
        // );
        // this._startButton = new Button(this._canvas, startButtonTopLeft, startButtonSize, "Start", "white", 10, "black", 1);
        // this._startButton.callback = this._start;
        // this._startButton.draw();

        const nameCenterCoord = new Coordinate(this._canvas.width/2, this._canvas.height/2 - 100);
        const nameText = this._type === Win.TYPE.RED_WIN ? "Red wins!" : "Blue wins!";
        this._canvas.drawText(nameCenterCoord, nameText, "center", "50px Arial");
    }
}

Win.TYPE = {
    RED_WIN: 0,
    BLUE_WIN: 1
};