class Canvas {
	constructor(canvasId) {
		this._canvas = document.getElementById(canvasId);
		this._context = this._canvas.getContext("2d");
	}

	get width() {
	    return this._canvas.width;
    }

    get height() {
	    return this._canvas.height;
    }

    listen(event, callback) {
        this._canvas.addEventListener(event, callback);
    }

	clear() {
	    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    getMousePosition(e) {
        const canvasRect = this._canvas.getBoundingClientRect();
        const x =
            (e.clientX - canvasRect.left) / canvasRect.width *
            this._canvas.width;
        const y =
            (e.clientY - canvasRect.top) / canvasRect.height *
            this._canvas.height;
        return new Coordinate(x, y);
    }

    drawLine(startCoord, endCoord) {
        this._context.beginPath();
        this._context.moveTo(...startCoord.toArray());
        this._context.lineTo(...endCoord.toArray());
        this._context.stroke();
    }

    drawRectangle(topLeftCoord, size) {
        this._context.strokeRect(...topLeftCoord.toArray(), ...size.toArray());
    }
}