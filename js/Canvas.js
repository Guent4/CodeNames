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

    drawRectangle(topLeftCoord, size, color, radius, borderColor, lineWidth) {
        if (lineWidth === undefined) {
            lineWidth = 1;
        }
        this._context.beginPath();
        this._context.moveTo(topLeftCoord.x + radius, topLeftCoord.y);
        this._context.lineTo(topLeftCoord.x + size.width - radius, topLeftCoord.y);
        this._context.quadraticCurveTo(topLeftCoord.x + size.width, topLeftCoord.y, topLeftCoord.x + size.width, topLeftCoord.y + radius);
        this._context.lineTo(topLeftCoord.x + size.width, topLeftCoord.y + size.height - radius);
        this._context.quadraticCurveTo(topLeftCoord.x + size.width, topLeftCoord.y + size.height, topLeftCoord.x + size.width - radius, topLeftCoord.y + size.height);
        this._context.lineTo(topLeftCoord.x + radius, topLeftCoord.y + size.height);
        this._context.quadraticCurveTo(topLeftCoord.x, topLeftCoord.y + size.height, topLeftCoord.x, topLeftCoord.y + size.height - radius);
        this._context.lineTo(topLeftCoord.x, topLeftCoord.y + radius);
        this._context.quadraticCurveTo(topLeftCoord.x, topLeftCoord.y, topLeftCoord.x + radius, topLeftCoord.y);
        this._context.lineWidth = lineWidth; 
        this._context.strokeStyle = borderColor;
        this._context.stroke();
        this._context.fillStyle = color;
        this._context.fill();
    }
    
    drawText(coord, text, textAlign, font, color='black', opacity=1) {
        this._context.globalAlpha = opacity;
        this._context.font = font;
        this._context.fillStyle = color;
        this._context.textAlign = textAlign;
        this._context.textBaseline = 'middle';
        this._context.fillText(text, ...coord.toArray());
        this._context.globalAlpha = 1;
    }
}